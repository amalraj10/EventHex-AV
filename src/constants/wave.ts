export const WAVE_CONFIG = {
  TIME_INCREMENT: 0.08,
  TIME_INTERVAL: 50,
  VOICE_INTERVAL: 150,
  AMPLITUDE_MIN: 0.5,
  AMPLITUDE_MAX: 2,
  STEPS: 200,
  INITIAL_AMPLITUDES: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
} as const;

export const WAVE_PATHS = [
  { amplitude: 8, frequency: 1.2, phase: 0, yOffset: 42, color: "rgb(59, 130, 246)", strokeWidth: 0.6, opacity: 0.8 },
  { amplitude: 10, frequency: 1.4, phase: 0.8, yOffset: 45, color: "rgb(96, 165, 250)", strokeWidth: 0.7, opacity: 0.85 },
  { amplitude: 9, frequency: 1.3, phase: 2.0, yOffset: 44, color: "rgb(236, 72, 153)", strokeWidth: 0.6, opacity: 0.75 },
  { amplitude: 9, frequency: 1.25, phase: 3.5, yOffset: 43, color: "rgb(168, 85, 247)", strokeWidth: 0.6, opacity: 0.8 },
  { amplitude: 8, frequency: 1.35, phase: 5.0, yOffset: 45, color: "rgb(125, 211, 252)", strokeWidth: 0.6, opacity: 0.75 },
  { amplitude: 6, frequency: 1.8, phase: 6.0, yOffset: 50, color: "rgb(191, 219, 254)", strokeWidth: 0.45, opacity: 0.65 },
] as const;