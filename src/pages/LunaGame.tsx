import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StarIcon, Heart, Music, Sparkles, TreeDeciduous, Compass, Book } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StarField } from "@/components/StarField";
import { MessageReveal } from "@/components/MessageReveal";
import { useToast } from "@/components/ui/use-toast";

const LunaGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [stars, setStars] = useState<{id: number, x: number, y: number, collected: boolean, type: string}[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Star types based on Luna's interests
  const starTypes = ['love', 'nature', 'adventure', 'story', 'art', 'music', 'animal', 'magic'];
  
  // Generate random stars
  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const generateStars = () => {
        if (!gameAreaRef.current) return;
        
        const { width, height } = gameAreaRef.current.getBoundingClientRect();
        const newStars = [];
        
        // Generate 15 stars
        for (let i = 0; i < 15; i++) {
          // Keep stars away from edges
          const x = 40 + Math.random() * (width - 80);
          const y = 40 + Math.random() * (height - 80);
          const type = starTypes[Math.floor(Math.random() * starTypes.length)];
          
          newStars.push({
            id: i,
            x,
            y,
            collected: false,
            type
          });
        }
        
        setStars(newStars);
      };
      
      generateStars();
      
      // Game timer
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            if (score >= 10) {
              setGameCompleted(true);
            } else {
              toast({
                title: "Time's up!",
                description: `You collected ${score} stars. Try again to collect at least 10!`,
              });
              setGameStarted(false);
              return 45;
            }
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameCompleted, score, toast]);
  
  // Handle star collection
  const collectStar = (id: number, type: string) => {
    setStars(prevStars =>
      prevStars.map(star =>
        star.id === id ? { ...star, collected: true } : star
      )
    );
    
    setScore(prevScore => prevScore + 1);
    
    // Show message based on star type
    const messages: Record<string, string> = {
      love: "Love letters warm the heart ❤️",
      nature: "Nature brings peace and connection 🌱",
      adventure: "Adventure awaits around every corner 🧭",
      story: "Stories carry us to magical worlds 📚",
      art: "Art brings beauty to everyday life 🎨",
      music: "Music touches the soul 🎵",
      animal: "Animals fill our lives with joy 🐾",
      magic: "Magic makes the world more wonderful ✨"
    };
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} star!`,
      description: messages[type],
      duration: 2000,
    });
    
    // Check if all stars are collected
    const allCollected = stars.every(star => star.id === id || star.collected);
    if (allCollected) {
      setGameCompleted(true);
    }
  };
  
  // Reset game
  const resetGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(45);
    setGameCompleted(false);
    setStars([]);
  };
  
  // Star icon component based on type
  const getStarIcon = (type: string) => {
    switch(type) {
      case 'love': return <Heart className="h-6 w-6 text-rose-400" />;
      case 'nature': return <TreeDeciduous className="h-6 w-6 text-green-400" />;
      case 'adventure': return <Compass className="h-6 w-6 text-blue-400" />;
      case 'story': return <Book className="h-6 w-6 text-amber-400" />;
      case 'art': return <StarIcon className="h-6 w-6 text-purple-400" />;
      case 'music': return <Music className="h-6 w-6 text-indigo-400" />;
      case 'animal': return <StarIcon className="h-6 w-6 text-orange-400" />;
      case 'magic': return <Sparkles className="h-6 w-6 text-cyan-400" />;
      default: return <StarIcon className="h-6 w-6 text-yellow-400" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-cosmic-900 text-white">
      <header className="p-4 flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost">← Back</Button>
        </Link>
        <h1 className="text-xl font-bold bg-gradient-to-r from-cosmic-300 via-cosmic-500 to-cosmic-700 bg-clip-text text-transparent">
          Luna's Starlight Collection
        </h1>
        <div className="w-20"></div> {/* Spacer for balance */}
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {!gameStarted && !gameCompleted ? (
          <Card className="w-full max-w-md bg-cosmic-900/80 border border-cosmic-700">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <StarIcon className="h-12 w-12 text-yellow-400 animate-pulse" />
                <Sparkles className="h-8 w-8 text-purple-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cosmic-300 to-cosmic-500 bg-clip-text text-transparent mb-4">
                Luna's Starlight Collection
              </h2>
              <p className="mb-6 text-cosmic-300">
                Collect the magical stars that represent everything you love. Each star holds a special meaning!
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
                className="w-full bg-cosmic-500 hover:bg-cosmic-600"
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
                <StarIcon className="h-5 w-5 text-yellow-400" />
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
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 p-2 cursor-pointer transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-cosmic-500 rounded-full"
                  style={{ left: star.x, top: star.y }}
                  onClick={() => collectStar(star.id, star.type)}
                  aria-label={`Collect ${star.type} star`}
                >
                  {getStarIcon(star.type)}
                </button>
              ))}
            </div>
            
            <div className="mt-4 text-center text-sm text-cosmic-300">
              Collect at least 10 stars in 45 seconds to reveal a special message!
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LunaGame;
