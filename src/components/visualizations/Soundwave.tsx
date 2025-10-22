import { useEffect, useState } from "react";
import { WAVE_CONFIG, WAVE_PATHS } from "@/constants/wave";

interface SoundwaveProps {
  isAnimating?: boolean;
}

const Soundwave = ({ isAnimating = false }: SoundwaveProps) => {
  const [time, setTime] = useState(0);
  const [voiceAmplitudes, setVoiceAmplitudes] = useState<readonly number[]>(
    WAVE_CONFIG.INITIAL_AMPLITUDES
  );

  useEffect(() => {
    if (!isAnimating) {
      setTime(0);
      setVoiceAmplitudes(WAVE_CONFIG.INITIAL_AMPLITUDES);
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev + WAVE_CONFIG.TIME_INCREMENT);
    }, WAVE_CONFIG.TIME_INTERVAL);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Simulate voice input with varying amplitudes
  useEffect(() => {
    if (!isAnimating) return;

    const voiceInterval = setInterval(() => {
      setVoiceAmplitudes((prev) =>
        prev.map(
          () =>
            WAVE_CONFIG.AMPLITUDE_MIN +
            Math.random() * (WAVE_CONFIG.AMPLITUDE_MAX - WAVE_CONFIG.AMPLITUDE_MIN)
        )
      );
    }, WAVE_CONFIG.VOICE_INTERVAL);

    return () => clearInterval(voiceInterval);
  }, [isAnimating]);

  // Generate more curly wave paths with higher frequency and amplitude
  const generateWavePath = (
    baseAmplitude: number,
    frequency: number,
    phase: number,
    yOffset: number = 50,
    waveIndex: number = 0
  ) => {
    const points = [];
    const voiceMultiplier = isAnimating ? voiceAmplitudes[waveIndex] : 1;

    for (let i = 0; i <= WAVE_CONFIG.STEPS; i++) {
      const x = (i / WAVE_CONFIG.STEPS) * 100;
      const t = isAnimating ? time : 0;

      // More complex wave equation for curlier appearance
      const amplitude = baseAmplitude * voiceMultiplier;
      const wave1 = amplitude * Math.sin(frequency * x * 0.15 + phase + t);
      const wave2 =
        amplitude * 0.3 * Math.sin(frequency * x * 0.3 + phase * 1.5 + t * 1.3);
      const y = yOffset + wave1 + wave2;

      points.push(`${x},${y}`);
    }

    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="w-full h-full flex items-center">
      <svg
        width="100%"
        height="100"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full"
      >
        {WAVE_PATHS.map((wave, index) => (
          <path
            key={index}
            d={generateWavePath(
              wave.amplitude,
              wave.frequency,
              wave.phase,
              wave.yOffset,
              index
            )}
            fill="none"
            stroke={wave.color}
            strokeWidth={wave.strokeWidth}
            opacity={wave.opacity}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
};

export default Soundwave;