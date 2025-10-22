import { useEffect, useState, useRef } from "react";
import { audioManager } from "@/utils/audioUtils";

interface SoundwaveProps {
  isAnimating?: boolean;
  useRealAudio?: boolean; // New prop to enable real audio input
}

const Soundwave = ({ isAnimating = false, useRealAudio = false }: SoundwaveProps) => {
  const [time, setTime] = useState(0);
  const [audioData, setAudioData] = useState<number[]>([]);
  const [isSilent, setIsSilent] = useState(true);
  const animationFrameRef = useRef<number>();
  const dataBufferRef = useRef<number[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!isAnimating) {
      setTime(0);
      setAudioData([]);
      setIsSilent(true);
      dataBufferRef.current = [];
      timeRef.current = 0;
      return;
    }

    const interval = setInterval(() => {
      timeRef.current += 0.1;
      setTime(timeRef.current);
    }, 50);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Handle real audio input or simulated voice input
  useEffect(() => {
    if (!isAnimating) return;

    const updateAudioData = () => {
      if (useRealAudio && audioManager.isReady()) {
        // Get raw frequency data for real-time visualization
        const frequencyData = audioManager.getFrequencyData();
        const timeData = audioManager.getTimeDomainData();
        
        if (frequencyData && timeData) {
          // Calculate overall volume level
          let volume = 0;
          for (let i = 0; i < frequencyData.length; i++) {
            volume += frequencyData[i];
          }
          volume = volume / frequencyData.length;
          
          // Check if we have significant audio
          const hasAudio = volume > 2;
          setIsSilent(!hasAudio);
          
          if (hasAudio) {
            // Create wave data from time domain (more responsive to voice)
            const wavePoints: number[] = [];
            const step = Math.floor(timeData.length / 100); // 100 points for smooth wave
            
            for (let i = 0; i < 100; i++) {
              const index = i * step;
              const value = (timeData[index] - 128) / 128; // Normalize to -1 to 1
              wavePoints.push(value * 15 + 50); // Scale and center at 50
            }
            
            // Add to buffer for smooth animation
            dataBufferRef.current = wavePoints;
            setAudioData([...wavePoints]);
            
            console.log('Real audio detected, volume:', volume);
          } else {
            // No audio - flat line
            const flatLine = new Array(100).fill(50);
            dataBufferRef.current = flatLine;
            setAudioData(flatLine);
          }
        }
      } else {
        // Simulated animation for sound check
        const simulatedData: number[] = [];
        for (let i = 0; i < 100; i++) {
          const wave = Math.sin((i / 10) + timeRef.current) * 8 + Math.sin((i / 5) + timeRef.current * 1.5) * 4;
          simulatedData.push(wave + 50);
        }
        setAudioData(simulatedData);
        setIsSilent(false);
      }
      
      animationFrameRef.current = requestAnimationFrame(updateAudioData);
    };

    updateAudioData();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, useRealAudio]); // Removed 'time' from dependencies

  // Generate wave path from real audio data
  const generateRealWavePath = (color: string, yOffset: number = 50, opacity: number = 0.8) => {
    if (audioData.length === 0) {
      // Return flat line if no data
      return `M 0,${yOffset} L 100,${yOffset}`;
    }
    
    const points = [];
    for (let i = 0; i < audioData.length; i++) {
      const x = (i / (audioData.length - 1)) * 100;
      const y = audioData[i];
      points.push(`${x},${y}`);
    }
    
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="w-full h-full flex items-center relative">
      {/* Audio level indicator */}
      {useRealAudio && (
        <div className="absolute top-2 right-2 z-10">
          <div 
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              !isSilent ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`}
            title={!isSilent ? 'Audio detected' : 'No audio'}
          />
        </div>
      )}
      
      <svg
        width="100%"
        height="100"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full"
      >
        {/* Real-time audio responsive waves */}
        <path
          d={generateRealWavePath("rgb(59, 130, 246)", 42, 0.8)}
          fill="none"
          stroke="rgb(59, 130, 246)"
          strokeWidth="0.8"
          opacity="0.8"
          strokeLinecap="round"
        />
        
        <path
          d={generateRealWavePath("rgb(96, 165, 250)", 45, 0.85)}
          fill="none"
          stroke="rgb(96, 165, 250)"
          strokeWidth="0.7"
          opacity="0.85"
          strokeLinecap="round"
        />

        <path
          d={generateRealWavePath("rgb(236, 72, 153)", 44, 0.75)}
          fill="none"
          stroke="rgb(236, 72, 153)"
          strokeWidth="0.6"
          opacity="0.75"
          strokeLinecap="round"
        />

        <path
          d={generateRealWavePath("rgb(168, 85, 247)", 43, 0.8)}
          fill="none"
          stroke="rgb(168, 85, 247)"
          strokeWidth="0.6"
          opacity="0.8"
          strokeLinecap="round"
        />

        <path
          d={generateRealWavePath("rgb(125, 211, 252)", 45, 0.75)}
          fill="none"
          stroke="rgb(125, 211, 252)"
          strokeWidth="0.6"
          opacity="0.75"
          strokeLinecap="round"
        />

        <path
          d={generateRealWavePath("rgb(191, 219, 254)", 50, 0.65)}
          fill="none"
          stroke="rgb(191, 219, 254)"
          strokeWidth="0.45"
          opacity="0.65"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Soundwave;