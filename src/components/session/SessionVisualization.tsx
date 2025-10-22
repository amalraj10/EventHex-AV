import checkIcon from "@/assets/logos/tick-icon.svg";
import AudioVisualizer from "@/components/AudioVisualizer";
import { SessionVisualizationProps } from "@/types/session.types";
import { formatTime } from "@/utils/formatTime";

const SessionVisualization = ({
  showWaves = false,
  animateWaves = false,
  timer,
  useRealAudio = false,
}: SessionVisualizationProps) => {
  return (
    <div
      className="relative w-full max-w-4xl mx-auto rounded-3xl mb-6 sm:mb-8 overflow-hidden h-56 sm:h-72 md:h-80 lg:h-[400px]"
      style={{
        background: "linear-gradient(135deg, #dbeafe 0%, #FFFFFF 100%)",
        border: "1px solid #e0e7ff",
      }}
    >
      {/* White circular layer - exact white color */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          className="rounded-full"
          style={{
            width: "170px",
            height: "170px",
            backgroundColor: "#FFFFFF",
          }}
        />
      </div>

      {/* Soundwaves Container - positioned above white layer but below center icon */}
      {showWaves && (
        <div className="absolute inset-0 flex items-center w-100 h-full z-20">
          <div className="w-full">
            <AudioVisualizer isActive={animateWaves} useRealAudio={useRealAudio} />
          </div>
        </div>
      )}

      {/* Center icon - highest z-index to stay on top */}
      <div className="relative z-30 flex items-center justify-center h-full">
        <div className="relative">
          {/* Outer glow rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full blur-3xl"
              style={{
                width: "220px",
                height: "220px",
                background:
                  "radial-gradient(circle, rgba(191, 219, 254, 0.5) 0%, rgba(221, 214, 254, 0.5) 100%)",
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full blur-2xl"
              style={{
                width: "180px",
                height: "180px",
                background:
                  "radial-gradient(circle, rgba(147, 197, 253, 0.6) 0%, rgba(196, 181, 253, 0.6) 100%)",
              }}
            />
          </div>

          {/* Icon container with gradient background */}
          <div
            className="relative rounded-full flex items-center justify-center"
            style={{
              width: "140px",
              height: "140px",
              background: "linear-gradient(135deg, #EFECFF 0%, #EFECFF 1%)",
            }}
          >
            <img src={checkIcon} alt="Status" className="w-20 h-20" />
          </div>
        </div>
      </div>

      {/* Timer shown immediately (from 00:00) once recording starts */}
      {typeof timer === "number" && timer >= 0 && (
        <div className="absolute bottom-12 left-0 right-0 text-center px-4 z-40">
          <p className="text-xl sm:text-2xl font-mono text-gray-700">
            {formatTime(timer)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SessionVisualization;