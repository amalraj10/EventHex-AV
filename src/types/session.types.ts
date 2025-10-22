export type SessionStatus = "pending" | "processed" | "recording" | "checking";
export type SessionState = "idle" | "recording" | "soundcheck";

export interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  eventName: string;
  status: SessionStatus;
}

export interface SessionHeaderProps {
  title: string;
  date: string;
  time: string;
}

export interface SessionVisualizationProps {
  showWaves?: boolean;
  animateWaves?: boolean;
  timer?: number;
  useRealAudio?: boolean;
}

export interface SessionVisualizationState {
  showWaves: boolean;
  animateWaves: boolean;
  timer: number;
}