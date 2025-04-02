
import React from 'react';

interface BabyDinoProps {
  position: number;
  onEaten: () => void;
  id: string;
}

const BabyDino: React.FC<BabyDinoProps> = ({ position, onEaten, id }) => {
  return (
    <div
      id={id}
      className="absolute bottom-0 w-8 h-10 flex items-center justify-center"
      style={{ right: `${position}px` }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 0H10V5H5V10H0V15H5V20H15V15H20V5H15V0Z"
          fill="#76C35D"
        />
        <circle cx="15" cy="5" r="1.5" fill="white" />
      </svg>
    </div>
  );
};

export default BabyDino;
