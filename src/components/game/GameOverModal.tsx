
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameOverModalProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, highScore, onRestart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
        <p className="text-2xl mb-2">Your Score: {score}</p>
        <p className="text-xl mb-6">High Score: {highScore}</p>
        <Button onClick={onRestart} className="w-full py-6 text-xl">
          Play Again
        </Button>
      </div>
    </div>
  );
};

export default GameOverModal;
