import { useEffect, useState, useRef } from "react";

interface AudioVisualizerProps {
  isActive: boolean;
  useRealAudio: boolean;
}

const AudioVisualizer = ({ isActive, useRealAudio }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isSilent, setIsSilent] = useState(true);
  const smoothedLevelRef = useRef(0);
  const phaseRef = useRef(0); // vertical shimmer
  const flowRef = useRef(0);  // horizontal travel

  // Initialize audio context and analyser
  useEffect(() => {
    if (!useRealAudio) return;

    const initAudio = async () => {
      try {
        // Create audio context
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        
        // Create analyser
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        // Heavier smoothing for calmer, more natural motion
        analyserRef.current.smoothingTimeConstant = 0.8;
        
        // Get microphone access
        streamRef.current = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
          } 
        });
        
        // Connect microphone to analyser
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(streamRef.current);
        microphoneRef.current.connect(analyserRef.current);
        
        console.log('Audio system initialized successfully');
      } catch (error) {
        console.error('Failed to initialize audio:', error);
      }
    };

    initAudio();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (microphoneRef.current) {
        microphoneRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [useRealAudio]);

  // Animation loop
  useEffect(() => {
    if (!isActive) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (useRealAudio && analyserRef.current) {
        // Get real audio data
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Also get time domain data for more responsiveness
        const timeData = new Uint8Array(bufferLength);
        analyserRef.current.getByteTimeDomainData(timeData);
        
        // Calculate average volume from frequency data
        let freqSum = 0;
        for (let i = 0; i < bufferLength; i++) {
          freqSum += dataArray[i];
        }
        const freqAverage = freqSum / bufferLength;
        
        // Calculate average volume from time domain data
        let timeSum = 0;
        for (let i = 0; i < bufferLength; i++) {
          timeSum += Math.abs(timeData[i] - 128);
        }
        const timeAverage = timeSum / bufferLength;
        
        // Use the higher of the two averages
        const average = Math.max(freqAverage, timeAverage);
        // Smooth the detected level to avoid jitter and overly fast reaction
        smoothedLevelRef.current = smoothedLevelRef.current * 0.9 + average * 0.1;
        
        // Much more sensitive audio detection
        const hasAudio = smoothedLevelRef.current > 1;
        setIsSilent(!hasAudio);
        
        // Advance phases: very slow shimmer + horizontal flow for curly travel
        phaseRef.current += 0.004;
        flowRef.current += 0.02;
        
        if (hasAudio) {
          // Draw responsive waves based on real audio
          drawRealAudioWaves(ctx, canvas, dataArray, timeData, smoothedLevelRef.current);
        } else {
          // When silent, keep the same smooth curly model as sound check
          drawSimulatedWaves(ctx, canvas);
        }
      } else {
        // Draw simulated waves for sound check
        drawSimulatedWaves(ctx, canvas);
        setIsSilent(false);
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, useRealAudio]);

  const drawRealAudioWaves = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, dataArray: Uint8Array, timeData: Uint8Array, volume: number) => {
    const centerY = canvas.height / 2;
    const waveCount = 6;
    const colors = [
      'rgb(59, 130, 246)',   // Blue
      'rgb(96, 165, 250)',   // Light Blue
      'rgb(236, 72, 153)',   // Pink
      'rgb(168, 85, 247)',   // Purple
      'rgb(125, 211, 252)',  // Sky Blue
      'rgb(191, 219, 254)'   // Light Sky Blue
    ];

    // Build a smoothed envelope (0..1) from time-domain data to reflect current energy per segment
    const segments = 160;
    const envelope: number[] = [];
    const step = Math.max(1, Math.floor(timeData.length / segments));
    for (let i = 0; i <= segments; i++) {
      const idx = Math.min(timeData.length - 1, i * step);
      const e = Math.abs(timeData[idx] - 128) / 128; // 0..1
      envelope.push(e);
    }
    // Simple moving-average smooth
    for (let i = 1; i < envelope.length - 1; i++) {
      envelope[i] = (envelope[i - 1] + envelope[i] + envelope[i + 1]) / 3;
    }

    for (let wave = 0; wave < waveCount; wave++) {
      ctx.beginPath();
      ctx.strokeStyle = colors[wave];
      ctx.lineWidth = 2 - (wave * 0.2);
      ctx.globalAlpha = 0.8 - (wave * 0.1);

      const points: { x: number; y: number }[] = [];
      // Spatial angular frequency for curly model
      const k = 0.035 + wave * 0.003; // smaller k = wider curls
      
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * canvas.width;

        // Envelope-driven amplitude (curly gets taller with voice)
        const env = envelope[i] || 0;
        // Stronger boost when sound is present
        const volScale = Math.min(1.6, 0.7 + volume / 40);
        const baseAmp = (12 + wave * 3.2) * volScale;
        const amp = baseAmp * (0.6 + 1.4 * env);

        // Curly traveling wave: multi-harmonic with horizontal flow
        const phi = flowRef.current * (0.8 + wave * 0.1) + wave * 0.9; // per-layer phase offset
        const s1 = Math.sin(k * x + phi) * amp;
        const s2 = Math.sin(2.2 * k * x + 1.1 * phi + phaseRef.current * 0.6) * (amp * 0.55);
        const s3 = Math.sin(3.3 * k * x + 1.7 * phi) * (amp * 0.30);

        const y = centerY + s1 + s2 + s3 + (wave * 8);
        
        points.push({ x, y });
      }

      // Draw the wave
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      
      ctx.stroke();
    }
  };

  const drawSimulatedWaves = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.0006; // slower background motion
    const waveCount = 6;
    const colors = [
      'rgb(59, 130, 246)',
      'rgb(96, 165, 250)',
      'rgb(236, 72, 153)',
      'rgb(168, 85, 247)',
      'rgb(125, 211, 252)',
      'rgb(191, 219, 254)'
    ];

    for (let wave = 0; wave < waveCount; wave++) {
      ctx.beginPath();
      ctx.strokeStyle = colors[wave];
      ctx.lineWidth = 2 - (wave * 0.2);
      ctx.globalAlpha = 0.8 - (wave * 0.1);

      const points: { x: number; y: number }[] = [];
      const segments = 120;
      
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * canvas.width;
        
        // More dynamic simulated waves
        const amplitude = 16 + (wave * 3);
        const frequency = 0.003 + (wave * 0.0015);
        const phase = wave * Math.PI / 3;
        
        // Multiple wave components for more complex patterns
        const wave1 = Math.sin(i * frequency + time + phase) * amplitude;
        const wave2 = Math.sin(i * frequency * 2 + time * 1.5 + phase) * (amplitude * 0.3);
        const wave3 = Math.sin(i * frequency * 0.5 + time * 0.7 + phase) * (amplitude * 0.5);
        
        const variation = wave1 + wave2 + wave3;
        const y = centerY + variation + (wave * 8);
        
        points.push({ x, y });
      }

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      
      ctx.stroke();
    }
  };

  const drawFlatLine = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const centerY = canvas.height / 2;
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(156, 163, 175)';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px]">
        <canvas
          ref={canvasRef}
          width={800}
          height={180}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default AudioVisualizer;
