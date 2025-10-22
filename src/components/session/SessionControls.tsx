import { X, AudioWaveform, Play, Pause } from "lucide-react";
import Button from "@/components/common/Button";
import { SessionState } from "@/types/session.types";

interface SessionControlsProps {
  sessionState: SessionState;
  onLeave: () => void;
  onSoundCheck: () => void;
  onStartRecording: () => void;
  onPause: () => void;
  isMicrophoneActive?: boolean;
  isDummyAudioPlaying?: boolean;
}

const SessionControls = ({
  sessionState,
  onLeave,
  onSoundCheck,
  onStartRecording,
  onPause,
  isMicrophoneActive = false,
  isDummyAudioPlaying = false,
}: SessionControlsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <Button variant="secondary" icon={X} onClick={onLeave}>
        Leave Section
      </Button>

      {sessionState === "idle" && (
        <>
          <Button 
            variant="primary" 
            icon={AudioWaveform} 
            onClick={onSoundCheck}
            className={isDummyAudioPlaying ? "animate-pulse" : ""}
          >
            {isDummyAudioPlaying ? "Playing Audio..." : "Sound Check"}
          </Button>
          <Button variant="danger" icon={Play} onClick={onStartRecording}>
            Go live
          </Button>
        </>
      )}

      {sessionState === "soundcheck" && (
        <>
          <Button 
            variant="primary" 
            icon={AudioWaveform} 
            onClick={onSoundCheck}
            className={isDummyAudioPlaying ? "animate-pulse" : ""}
          >
            {isDummyAudioPlaying ? "Playing Audio..." : "Stop Sound Check"}
          </Button>
          <Button variant="danger" icon={Play} onClick={onStartRecording}>
            Go live
          </Button>
        </>
      )}

      {sessionState === "recording" && (
        <>
          <Button 
            variant="primary" 
            icon={AudioWaveform} 
            onClick={onSoundCheck}
            className={isDummyAudioPlaying ? "animate-pulse" : ""}
          >
            {isDummyAudioPlaying ? "Playing Audio..." : "Sound Check"}
          </Button>
          <Button 
            variant="danger" 
            icon={Pause} 
            onClick={onPause}
            className={isMicrophoneActive ? "animate-pulse" : ""}
          >
            {isMicrophoneActive ? "Recording..." : "Pause"}
          </Button>
        </>
      )}
    </div>
  );
};

export default SessionControls;