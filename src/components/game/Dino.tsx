
import React from 'react';

interface DinoProps {
  isJumping: boolean;
}

const Dino: React.FC<DinoProps> = ({ isJumping }) => {
  return (
    <div
      className={`absolute bottom-0 left-10 w-16 h-20 flex items-center justify-center transition-transform ${
        isJumping ? 'animate-jump' : ''
      }`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 40 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform scale-110"
      >
        <path
          d="M35 5H30V10H25V15H20V10H15V15H10V20H5V35H10V40H15V45H30V40H35V35H40V15H35V5Z"
          fill="#535353"
        />
        <circle cx="30" cy="15" r="2" fill="white" />
        <path
          d="M15 30H10V35H15V30Z"
          fill="#535353"
          className={isJumping ? 'animate-pulse-scale' : ''}
        />
        <path
          d="M25 30H20V35H25V30Z"
          fill="#535353"
          className={isJumping ? 'animate-pulse-scale' : ''}
        />
      </svg>
    </div>
  );
};

export default Dino;
