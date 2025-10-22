import { useState, useEffect, useCallback } from "react";
import { SessionState } from "@/types/session.types";
import { audioManager } from "@/utils/audioUtils";

interface UseSessionStateReturn {
  sessionState: SessionState;
  setIdle: () => void;
  setRecording: () => void;
  setSoundCheck: () => void;
  toggleSoundCheck: () => void;
  isMicrophoneActive: boolean;
  isDummyAudioPlaying: boolean;
  onMicrophoneReady: (callback: () => void) => void;
}

export const useSessionState = (
  initialState: SessionState = "idle"
): UseSessionStateReturn => {
  const [sessionState, setSessionState] = useState<SessionState>(initialState);
  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false);
  const [isDummyAudioPlaying, setIsDummyAudioPlaying] = useState(false);
  const [microphoneReadyCallback, setMicrophoneReadyCallback] = useState<(() => void) | null>(null);

  // Initialize audio context on first user interaction
  useEffect(() => {
    const initializeAudio = async () => {
      await audioManager.resumeAudioContext();
    };
    
    // Initialize on first click/touch
    const handleFirstInteraction = () => {
      initializeAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const setIdle = useCallback(async () => {
    setSessionState("idle");
    audioManager.stopMicrophone();
    audioManager.stopDummyAudio();
    setIsMicrophoneActive(false);
    setIsDummyAudioPlaying(false);
  }, []);

  const setRecording = useCallback(async () => {
    setSessionState("recording");
    audioManager.stopDummyAudio();
    setIsDummyAudioPlaying(false);
    
    // Start microphone for Go Live
    const micSuccess = await audioManager.startMicrophone();
    setIsMicrophoneActive(micSuccess);
    
    // Call the callback when microphone is ready (for timer start)
    if (micSuccess && microphoneReadyCallback) {
      microphoneReadyCallback();
    }
  }, [microphoneReadyCallback]);

  const setSoundCheck = useCallback(() => setSessionState("soundcheck"), []);

  const toggleSoundCheck = useCallback(async () => {
    if (sessionState === "soundcheck") {
      // Stop sound check
      setSessionState("idle");
      audioManager.stopDummyAudio();
      setIsDummyAudioPlaying(false);
    } else {
      // Start sound check
      setSessionState("soundcheck");
      audioManager.stopMicrophone();
      setIsMicrophoneActive(false);
      
      // Play dummy AI audio with auto-stop callback
      setIsDummyAudioPlaying(true);
      const audioSuccess = await audioManager.playDummyAudio(() => {
        // Auto-stop when audio finishes
        setSessionState("idle");
        setIsDummyAudioPlaying(false);
      });
      if (!audioSuccess) {
        setIsDummyAudioPlaying(false);
      }
    }
  }, [sessionState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioManager.destroy();
    };
  }, []);

  const onMicrophoneReady = useCallback((callback: () => void) => {
    setMicrophoneReadyCallback(() => callback);
  }, []);

  return {
    sessionState,
    setIdle,
    setRecording,
    setSoundCheck,
    toggleSoundCheck,
    isMicrophoneActive,
    isDummyAudioPlaying,
    onMicrophoneReady,
  };
};