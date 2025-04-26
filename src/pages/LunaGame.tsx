
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Music, Mountain, TreeDeciduous, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StarField } from "@/components/StarField";
import { MessageReveal } from "@/components/MessageReveal";
import { useToast } from "@/hooks/use-toast";

const LunaGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [stars, setStars] = useState<{id: number, x: number, y: number, collected: boolean, type: string}[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Star types based on Luna's actual interests
  const starTypes = ['soccer', 'nature', 'adventure', 'music', 'comfort'];
  
  // Generate random stars with initial positions and velocities
  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const generateStars = () => {
        if (!gameAreaRef.current) return;
        
        const { width, height } = gameAreaRef.current.getBoundingClientRect();
        const newStars = [];
        
        // Generate 15 stars
        for (let i = 0; i < 15; i++) {
          const x = 40 + Math.random() * (width - 80);
          const y = 40 + Math.random() * (height - 80);
          const type = starTypes[Math.floor(Math.random() * starTypes.length)];
          
          newStars.push({
            id: i,
            x,
            y,
            collected: false,
            type,
            velocityX: (Math.random() - 0.5) * 2,
            velocityY: (Math.random() - 0.5) * 2
          });
        }
        
        setStars(newStars);
      };
      
      generateStars();
      
      // Update star positions
      const moveInterval = setInterval(() => {
        setStars(prevStars => 
          prevStars.map(star => {
            if (star.collected) return star;
            
            const newX = star.x + star.velocityX;
            const newY = star.y + star.velocityY;
            
            // Bounce off walls
            const bounce = (pos: number, vel: number, min: number, max: number) => {
              if (pos <= min || pos >= max) {
                return -vel;
              }
              return vel;
            };
            
            const { width, height } = gameAreaRef.current!.getBoundingClientRect();
            
            return {
              ...star,
              x: Math.max(40, Math.min(width - 40, newX)),
              y: Math.max(40, Math.min(height - 40, newY)),
              velocityX: bounce(newX, star.velocityX, 40, width - 40),
              velocityY: bounce(newY, star.velocityY, 40, height - 40)
            };
          })
        );
      }, 50);
      
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            clearInterval(moveInterval);
            if (score >= 10) {
              setGameCompleted(true);
            } else {
              toast({
                title: "Time's up!",
                description: `You collected ${score} stars. Try again to collect at least 10!`,
              });
              setGameStarted(false);
              return 30;
            }
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(timer);
        clearInterval(moveInterval);
      };
    }
  }, [gameStarted, gameCompleted, score, toast]);
  
  const collectStar = (id: number, type: string) => {
    setStars(prevStars =>
      prevStars.map(star =>
        star.id === id ? { ...star, collected: true } : star
      )
    );
    
    setScore(prevScore => prevScore + 1);
    
    const messages: Record<string, string> = {
      soccer: "Mamelodi Sundowns forever! ⚽",
      nature: "Finding peace among the trees 🌳",
      adventure: "Life is an adventure waiting to happen 🏔️",
      music: "RnB and Hip Hop move the soul 🎵",
      comfort: "Cozy vibes in baggy clothes 🏠"
    };
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} star!`,
      description: messages[type],
      duration: 2000,
    });
    
    const allCollected = stars.every(star => star.id === id || star.collected);
    if (allCollected) {
      setGameCompleted(true);
    }
  };
  
  const resetGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setGameCompleted(false);
    setStars([]);
  };
  
  const getStarIcon = (type: string) => {
    switch(type) {
      case 'soccer': return <Heart className="h-6 w-6 text-luna-orange" />;
      case 'nature': return <TreeDeciduous className="h-6 w-6 text-green-400" />;
      case 'adventure': return <Mountain className="h-6 w-6 text-blue-400" />;
      case 'music': return <Music className="h-6 w-6 text-purple-400" />;
      case 'comfort': return <Heart className="h-6 w-6 text-rose-400" />;
      default: return <Heart className="h-6 w-6 text-yellow-400" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-cosmic-900 text-white">
      <header className="p-4 flex items-center justify-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-cosmic-300 via-luna-orange to-cosmic-700 bg-clip-text text-transparent">
          Luna's Star Collection
        </h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {!gameStarted && !gameCompleted ? (
          <Card className="w-full max-w-md bg-cosmic-900/80 border border-cosmic-700">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <Heart className="h-12 w-12 text-luna-orange animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cosmic-300 to-cosmic-500 bg-clip-text text-transparent mb-4">
                Luna's Star Collection
              </h2>
              <p className="mb-6 text-cosmic-300">
                Collect the stars that represent everything that makes you special!
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {starTypes.map(type => (
                  <div key={type} className="flex items-center gap-2">
                    {getStarIcon(type)}
                    <span className="text-sm capitalize">{type}</span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setGameStarted(true)}
                className="w-full bg-luna-orange hover:bg-luna-orange/90"
              >
                Begin Your Adventure
              </Button>
            </CardContent>
          </Card>
        ) : gameCompleted ? (
          <MessageReveal 
            onReset={resetGame}
            score={score}
          />
        ) : (
          <div className="w-full max-w-3xl flex flex-col h-[70vh]">
            <div className="flex justify-between items-center mb-4 px-4">
              <div className="flex gap-2 items-center">
                <Heart className="h-5 w-5 text-luna-orange" />
                <span className="font-bold text-lg">{score}</span>
              </div>
              <div className="px-4 py-1 rounded-full bg-cosmic-800 border border-cosmic-700">
                Time: {timeLeft}s
              </div>
            </div>
            
            <div 
              ref={gameAreaRef}
              className="flex-1 relative border-2 border-cosmic-700 rounded-lg overflow-hidden bg-cosmic-900"
            >
              <StarField />
              
              {stars.map(star => !star.collected && (
                <button
                  key={star.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 p-2 cursor-pointer transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-cosmic-500 rounded-full animate-float"
                  style={{ 
                    left: star.x, 
                    top: star.y,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                  onClick={() => collectStar(star.id, star.type)}
                  aria-label={`Collect ${star.type} star`}
                >
                  {getStarIcon(star.type)}
                </button>
              ))}
            </div>
            
            <div className="mt-4 text-center text-sm text-cosmic-300">
              Collect at least 10 stars in 30 seconds to reveal a special collection of love letters!
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LunaGame;
