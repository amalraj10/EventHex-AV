import { useEffect, useState } from "react";

interface SoundwaveProps {
  isAnimating?: boolean;
}

const Soundwave = ({ isAnimating = false }: SoundwaveProps) => {
  const [heights, setHeights] = useState<number[]>([0.3, 0.5, 0.7, 0.5, 0.3]);

  useEffect(() => {
    if (!isAnimating) {
      setHeights([0.3, 0.5, 0.7, 0.5, 0.3]);
      return;
    }

    const interval = setInterval(() => {
      setHeights([
        Math.random() * 0.5 + 0.3,
        Math.random() * 0.5 + 0.4,
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.4,
        Math.random() * 0.5 + 0.3,
      ]);
    }, 100);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <svg
      width="100%"
      height="80"
      viewBox="0 0 500 80"
      preserveAspectRatio="none"
      className="w-full"
    >
      {/* Left wave - blue */}
      <path
        d={`M 0 40 Q 50 ${40 - heights[0] * 30} 100 40 T 200 40 T 250 40`}
        fill="none"
        stroke="hsl(235 100% 63%)"
        strokeWidth="2"
        opacity="0.8"
      >
        {isAnimating && (
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            values={`M 0 40 Q 50 ${40 - heights[0] * 30} 100 40 T 200 40 T 250 40;
                    M 0 40 Q 50 ${40 + heights[1] * 20} 100 40 T 200 40 T 250 40;
                    M 0 40 Q 50 ${40 - heights[2] * 25} 100 40 T 200 40 T 250 40;
                    M 0 40 Q 50 ${40 - heights[0] * 30} 100 40 T 200 40 T 250 40`}
          />
        )}
      </path>

      {/* Right wave - purple/pink */}
      <path
        d={`M 250 40 Q 300 ${40 + heights[3] * 20} 350 40 T 450 40 T 500 40`}
        fill="none"
        stroke="hsl(280 80% 70%)"
        strokeWidth="2"
        opacity="0.7"
      >
        {isAnimating && (
          <animate
            attributeName="d"
            dur="2.5s"
            repeatCount="indefinite"
            values={`M 250 40 Q 300 ${40 + heights[3] * 20} 350 40 T 450 40 T 500 40;
                    M 250 40 Q 300 ${40 - heights[4] * 25} 350 40 T 450 40 T 500 40;
                    M 250 40 Q 300 ${40 + heights[0] * 15} 350 40 T 450 40 T 500 40;
                    M 250 40 Q 300 ${40 + heights[3] * 20} 350 40 T 450 40 T 500 40`}
          />
        )}
      </path>
    </svg>
  );
};

export default Soundwave;
