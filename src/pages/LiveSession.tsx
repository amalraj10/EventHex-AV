import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, AudioWaveform, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import SessionHeader from "@/components/SessionHeader";
import SessionVisualization from "@/components/SessionVisualization";
import { sessions } from "@/data/sessions";

type SessionState = "idle" | "recording" | "soundcheck";

const LiveSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [timer, setTimer] = useState(0);

  const session = sessions.find((s) => s.id === id);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (sessionState === "recording" || sessionState === "soundcheck") {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sessionState]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartRecording = () => {
    setTimer(0);
    setSessionState("recording");
  };

  const handleSoundCheck = () => {
    setTimer(0);
    setSessionState("soundcheck");
  };

  const handlePause = () => {
    setSessionState("idle");
  };

  const handleLeave = () => {
    navigate("/sessions");
  };

  if (!session) {
    return <div>Session not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <SessionHeader
          title={session.title}
          date={session.date}
          time={session.time}
        />

        {/* Visualization Area */}
        <SessionVisualization 
          showWaves={sessionState !== "idle"}
          animateWaves={sessionState !== "idle"}
        />

        {/* Timer */}
        {sessionState !== "idle" && (
          <div className="text-center mb-8">
            <p className="text-2xl font-mono text-foreground">{formatTime(timer)}</p>
          </div>
        )}

        {/* Description */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <p className="text-primary text-lg">
            EventHex Stands out by tackling two key ...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLeave}
            className="min-w-[160px]"
          >
            <X className="w-4 h-4 mr-2" />
            Leave Section
          </Button>

          {sessionState === "idle" && (
            <>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSoundCheck}
                className="min-w-[160px] border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <AudioWaveform className="w-4 h-4 mr-2" />
                Sound Check
              </Button>

              <Button
                size="lg"
                onClick={handleStartRecording}
                className="min-w-[160px] bg-destructive hover:bg-destructive/90"
              >
                <Play className="w-4 h-4 mr-2" />
                Go live
              </Button>
            </>
          )}

          {sessionState === "recording" && (
            <>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSoundCheck}
                className="min-w-[160px] border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <AudioWaveform className="w-4 h-4 mr-2" />
                Sound Check
              </Button>

              <Button
                size="lg"
                onClick={handleLeave}
                className="min-w-[160px] bg-destructive hover:bg-destructive/90"
              >
                <Play className="w-4 h-4 mr-2" />
                Go live
              </Button>
            </>
          )}

          {sessionState === "soundcheck" && (
            <>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSoundCheck}
                className="min-w-[160px] border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <AudioWaveform className="w-4 h-4 mr-2" />
                Sound Check
              </Button>

              <Button
                size="lg"
                onClick={handlePause}
                className="min-w-[160px] bg-destructive hover:bg-destructive/90"
              >
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default LiveSession;
