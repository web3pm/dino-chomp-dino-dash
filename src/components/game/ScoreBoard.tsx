
import React from 'react';

interface ScoreBoardProps {
  score: number;
  missed: number;
  highScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, missed, highScore }) => {
  return (
    <div className="absolute top-4 right-4 text-right">
      <div className="text-2xl font-bold font-mono">Score: {score}</div>
      <div className="text-lg font-mono">Missed: {missed}/5</div>
      <div className="text-sm font-mono mt-2">High Score: {highScore}</div>
    </div>
  );
};

export default ScoreBoard;
