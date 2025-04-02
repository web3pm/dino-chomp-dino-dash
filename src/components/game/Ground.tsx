
import React from 'react';

const Ground: React.FC = () => {
  return (
    <div className="absolute bottom-0 w-full h-4 bg-game-ground">
      <div className="w-full h-full flex">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i} 
            className="w-4 h-1 bg-black/10 mx-2"
            style={{ marginTop: i % 2 === 0 ? '2px' : '8px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Ground;
