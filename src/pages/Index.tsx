
import DinoGame from '@/components/game/DinoGame';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full p-4 bg-gray-100 border-b">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Dino Chomp
        </h1>
      </header>
      
      <main className="flex-1 container mx-auto p-4 max-w-3xl">
        <div className="mb-6 text-center">
          <p className="text-lg">
            Help the dinosaur jump to eat the little dinos!
            <br />
            <span className="text-sm text-gray-600">Press SPACE, UP arrow, or tap/click to jump</span>
          </p>
        </div>
        
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <DinoGame />
        </div>
        
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">How to Play</h2>
          <ul className="text-left max-w-md mx-auto space-y-2">
            <li>• Jump to eat the little green dinos</li>
            <li>• You miss a dino if it passes you without being eaten</li>
            <li>• Game ends after 5 missed dinos</li>
            <li>• The game gets faster as your score increases</li>
          </ul>
        </div>
      </main>
      
      <footer className="w-full p-4 bg-gray-100 border-t text-center text-gray-600 text-sm">
        Dino Chomp - A fun spin on the Chrome dinosaur game
      </footer>
    </div>
  );
};

export default Index;
