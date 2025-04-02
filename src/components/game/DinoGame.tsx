
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Dino from './Dino';
import BabyDino from './BabyDino';
import Ground from './Ground';
import ScoreBoard from './ScoreBoard';
import GameOverModal from './GameOverModal';
import { toast } from 'sonner';

interface BabyDinoType {
  id: string;
  position: number;
  speed: number;
}

const JUMP_DURATION = 500; // milliseconds
const GAME_SPEED_INCREASE = 0.1;
const INITIAL_SPAWN_INTERVAL = 2000;
const MIN_SPAWN_INTERVAL = 800;

const DinoGame: React.FC = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [babyDinos, setBabyDinos] = useState<BabyDinoType[]>([]);
  const [highScore, setHighScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [spawnInterval, setSpawnInterval] = useState(INITIAL_SPAWN_INTERVAL);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const jumpTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dinoHeight = 80;
  const dinoZoneLeft = 40;
  const dinoZoneRight = 100;

  // Load high score from local storage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('dinoGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Set up game loop
  const startGameLoop = useCallback(() => {
    if (gameLoopRef.current) return;
    
    const updateGame = () => {
      setBabyDinos(prevDinos => {
        return prevDinos.map(dino => ({
          ...dino,
          position: dino.position + dino.speed * gameSpeed
        }));
      });
      gameLoopRef.current = requestAnimationFrame(updateGame);
    };
    
    gameLoopRef.current = requestAnimationFrame(updateGame);
  }, [gameSpeed]);

  // Start the game
  useEffect(() => {
    startGameLoop();
    startSpawningBabyDinos();
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      if (spawnTimerRef.current) {
        clearTimeout(spawnTimerRef.current);
      }
      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
      }
    };
  }, [startGameLoop, gameSpeed]);

  // Check for collisions and remove off-screen dinos
  useEffect(() => {
    if (gameOver) return;
    
    const gameWidth = gameAreaRef.current?.clientWidth || 800;
    
    let newMissed = missed;
    
    const updatedDinos = babyDinos.filter(dino => {
      const dinoPos = gameWidth - dino.position;
      
      // Check if dino is in eating zone and player is jumping
      if (dinoPos > dinoZoneLeft && dinoPos < dinoZoneRight && isJumping) {
        setScore(prevScore => prevScore + 1);
        setGameSpeed(prevSpeed => Math.min(prevSpeed + GAME_SPEED_INCREASE, 3));
        setSpawnInterval(prev => Math.max(prev - 50, MIN_SPAWN_INTERVAL));
        toast("Chomp!", { position: "bottom-center" });
        return false;
      }
      
      // Check if dino passed the player
      if (dino.position > gameWidth + 50) {
        newMissed++;
        setMissed(newMissed);
        toast("Missed one!", { position: "bottom-center" });
        return false;
      }
      
      return true;
    });
    
    setBabyDinos(updatedDinos);
    
    // Check game over condition
    if (newMissed >= 5) {
      endGame();
    }
  }, [babyDinos, isJumping, gameOver, missed]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('dinoGameHighScore', score.toString());
    }
  }, [score, highScore]);

  // Spawn baby dinos at intervals
  const startSpawningBabyDinos = () => {
    const spawnBabyDino = () => {
      if (gameOver) return;
      
      const newDino: BabyDinoType = {
        id: `dino-${Date.now()}`,
        position: 0,
        speed: 2 + Math.random() * 2, // Random speed between 2-4
      };
      
      setBabyDinos(prev => [...prev, newDino]);
      
      spawnTimerRef.current = setTimeout(spawnBabyDino, spawnInterval);
    };
    
    spawnTimerRef.current = setTimeout(spawnBabyDino, spawnInterval);
  };

  // Jump function
  const jump = () => {
    if (isJumping || gameOver) return;
    
    setIsJumping(true);
    
    jumpTimeoutRef.current = setTimeout(() => {
      setIsJumping(false);
    }, JUMP_DURATION);
  };

  // End game function
  const endGame = () => {
    setGameOver(true);
    
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    
    if (spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current);
      spawnTimerRef.current = null;
    }
  };

  // Restart game
  const restartGame = () => {
    setScore(0);
    setMissed(0);
    setGameOver(false);
    setBabyDinos([]);
    setGameSpeed(1);
    setSpawnInterval(INITIAL_SPAWN_INTERVAL);
    
    startGameLoop();
    startSpawningBabyDinos();
  };

  // Handle input events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isJumping, gameOver]);

  return (
    <div 
      ref={gameAreaRef}
      className="relative w-full h-80 bg-game-sky overflow-hidden border-b-4 border-game-ground"
      onClick={jump}
      style={{ touchAction: 'manipulation' }}
    >
      <Dino isJumping={isJumping} />
      
      {babyDinos.map((dino) => (
        <BabyDino 
          key={dino.id} 
          id={dino.id}
          position={dino.position} 
          onEaten={() => {}} 
        />
      ))}
      
      <Ground />
      
      <ScoreBoard score={score} missed={missed} highScore={highScore} />
      
      {gameOver && (
        <GameOverModal 
          score={score} 
          highScore={highScore}
          onRestart={restartGame} 
        />
      )}
      
      <div className="absolute bottom-6 left-4 text-xs text-gray-500">
        {!gameOver && "Tap or press SPACE to jump"}
      </div>
    </div>
  );
};

export default DinoGame;
