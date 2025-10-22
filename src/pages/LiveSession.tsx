import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import SessionHeader from "@/components/session/SessionHeader";
import SessionVisualization from "@/components/session/SessionVisualization";
import SessionControls from "@/components/session/SessionControls";
import { sessions } from "@/data/sessions";
import { useTimer } from "@/hooks/useTimer";
import { useSessionState } from "@/hooks/useSessionState";
import { ROUTES } from "@/constants/routes";
import { audioManager } from "@/utils/audioUtils";

const LiveSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { timer, startTimer, pauseTimer, resetTimer, isRunning } = useTimer();
  const {
    sessionState,
    setIdle,
    setRecording,
    toggleSoundCheck,
    isMicrophoneActive,
    isDummyAudioPlaying,
  } = useSessionState();

  const session = sessions.find((s) => s.id === id);

  // Start/stop timer based on session state and microphone activity
  useEffect(() => {
    if (sessionState === "recording" && isMicrophoneActive) {
      if (!isRunning) {
        resetTimer();
        startTimer();
      }
    } else if (sessionState === "idle" || sessionState === "soundcheck") {
      // Stop and reset when not actively recording
      if (isRunning) {
        pauseTimer();
      }
      resetTimer();
    }
  }, [sessionState, isMicrophoneActive, isRunning, startTimer, pauseTimer, resetTimer]);

  const handleStartRecording = () => {
    setRecording();
  };

  const handleSoundCheck = () => {
    toggleSoundCheck();
  };

  const handlePause = () => {
    setIdle();
  };

  const handleLeave = () => {
    navigate(ROUTES.SESSIONS);
  };

  if (!session) {
    return <div>Session not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageContainer maxWidth="6xl" className="py-6 sm:py-8">
        <SessionHeader
          title={session.title}
          date={session.date}
          time={session.time}
        />

        {/* Visualization Area */}
        <SessionVisualization
          showWaves={sessionState !== "idle"}
          animateWaves={sessionState !== "idle"}
          timer={sessionState === "recording" ? timer : -1}
          useRealAudio={isMicrophoneActive}
        />

        {/* Action Buttons */}
        <SessionControls
          sessionState={sessionState}
          onLeave={handleLeave}
          onSoundCheck={handleSoundCheck}
          onStartRecording={handleStartRecording}
          onPause={handlePause}
          isMicrophoneActive={isMicrophoneActive}
          isDummyAudioPlaying={isDummyAudioPlaying}
        />
      </PageContainer>
    </div>
  );
};

export default LiveSession;