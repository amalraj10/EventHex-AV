import checkIcon from "@/assets/check-icon.png";
import Soundwave from "./Soundwave";

interface SessionVisualizationProps {
  showWaves?: boolean;
  animateWaves?: boolean;
}

const SessionVisualization = ({ 
  showWaves = false,
  animateWaves = false 
}: SessionVisualizationProps) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 mb-8">
      {/* Soundwaves */}
      {showWaves && (
        <div className="absolute inset-0 flex items-center px-8">
          <Soundwave isAnimating={animateWaves} />
        </div>
      )}
      
      {/* Center icon */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-60" />
          
          {/* Icon container */}
          <div className="relative">
            <img src={checkIcon} alt="Status" className="w-32 h-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionVisualization;
