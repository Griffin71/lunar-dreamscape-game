
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Music, Mountain, TreeDeciduous, Heart, Star as StarIcon, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StarField } from "@/components/StarField";
import { MessageReveal } from "@/components/MessageReveal";
import { useToast } from "@/hooks/use-toast";

interface Star {
  id: number;
  x: number;
  y: number;
  collected: boolean;
  type: string;
  velocityX: number;
  velocityY: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

const LunaGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const starTypes = ['soccer', 'nature', 'adventure', 'music', 'comfort'];
  
  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const generateStars = () => {
        if (!gameAreaRef.current) return;
        
        const { width, height } = gameAreaRef.current.getBoundingClientRect();
        const newStars: Star[] = [];
        
        for (let i = 0; i < 15; i++) {
          const x = 40 + Math.random() * (width - 80);
          const y = 40 + Math.random() * (height - 80);
          const type = starTypes[Math.floor(Math.random() * starTypes.length)];
          const size = Math.random() * 0.5 + 0.8; // Size variation between 0.8-1.3
          
          newStars.push({
            id: i,
            x,
            y,
            collected: false,
            type,
            velocityX: (Math.random() - 0.5) * 0.7, // Reduced velocity for smoother movement
            velocityY: (Math.random() - 0.5) * 0.7,
            size,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 1.5
          });
        }
        
        setStars(newStars);
      };
      
      generateStars();
      
      const moveInterval = setInterval(() => {
        setStars(prevStars => 
          prevStars.map(star => {
            if (star.collected) return star;
            
            const newX = star.x + star.velocityX;
            const newY = star.y + star.velocityY;
            const newRotation = star.rotation + star.rotationSpeed;
            
            // Gentler bounce with easing
            const bounce = (pos: number, vel: number, min: number, max: number) => {
              if (pos <= min) {
                return Math.abs(vel) * 0.9; // Reduce velocity slightly on bounce
              }
              if (pos >= max) {
                return -Math.abs(vel) * 0.9;
              }
              return vel;
            };
            
            const { width, height } = gameAreaRef.current!.getBoundingClientRect();
            
            return {
              ...star,
              x: Math.max(40, Math.min(width - 40, newX)),
              y: Math.max(40, Math.min(height - 40, newY)),
              velocityX: bounce(newX, star.velocityX, 40, width - 40),
              velocityY: bounce(newY, star.velocityY, 40, height - 40),
              rotation: newRotation % 360
            };
          })
        );
      }, 16); // 60fps for smoother animation
      
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
      
      // Handle window resize
      const handleResize = () => {
        setStars(prevStars => {
          if (!gameAreaRef.current) return prevStars;
          
          const { width, height } = gameAreaRef.current.getBoundingClientRect();
          
          return prevStars.map(star => ({
            ...star,
            x: Math.min(star.x, width - 40),
            y: Math.min(star.y, height - 40)
          }));
        });
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        clearInterval(timer);
        clearInterval(moveInterval);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [gameStarted, gameCompleted, score, toast]);
  
  const collectStar = (id: number, type: string) => {
    // Play a collection sound (can be implemented later)
    
    setStars(prevStars =>
      prevStars.map(star =>
        star.id === id ? { ...star, collected: true } : star
      )
    );
    
    setScore(prevScore => prevScore + 1);
    
    const messages: Record<string, string[]> = {
      soccer: [
        "Mamelodi Sundowns forever! ⚽",
        "The beautiful game brings us together!",
        "Your passion for soccer lights up the field!",
        "Sundowns shining bright like you!",
        "Every match is magic with you!",
        "Soccer magic in your smile!",
        "Your team spirit inspires everyone!",
        "Champions at heart, just like you!",
        "Your soccer love is beautiful to watch",
        "Sundowns victory in your eyes!"
      ],
      nature: [
        "Finding peace among the trees 🌳",
        "Nature's embrace calms the soul",
        "Every flower blooms for you",
        "Peaceful moments in nature's arms",
        "Connected to earth's gentle heart",
        "The trees whisper your name",
        "Nature's beauty, like yours, is breathtaking",
        "Forest walks with you are magical",
        "Flowers bloom brighter when you're near",
        "Your soul is as pure as nature itself"
      ],
      adventure: [
        "Life is an adventure waiting to happen 🏔️",
        "Skydiving into love with you",
        "Climbing mountains of dreams together",
        "Every day's an adventure by your side",
        "Snowboarding through life's thrills",
        "Your adventurous spirit takes my breath away",
        "Hot air balloons and endless skies with you",
        "The greatest adventure is loving you",
        "Rock climbing to new heights together",
        "Brave hearts explore the world as one"
      ],
      music: [
        "RnB and Hip Hop move the soul 🎵",
        "Your heart beats to the perfect rhythm",
        "Dancing through life with you",
        "Our love song plays forever",
        "Music speaks what words can't say",
        "Your favorite songs are the soundtrack to our love",
        "Every beat reminds me of you",
        "Melodies that connect our hearts",
        "The rhythm of your laugh is my favorite song",
        "Our love story deserves its own album"
      ],
      comfort: [
        "Cozy vibes in baggy clothes 🏠",
        "Home is wherever you are",
        "Comfort in your gentle presence",
        "Safe in our little world",
        "Perfect peace with you",
        "Your warmth is my favorite feeling",
        "Sharing quiet moments is everything",
        "Comfort and joy in your smile",
        "Nothing beats cozy days with you",
        "Finding home in your embrace"
      ]
    };
    
    const randomIndex = Math.floor(Math.random() * messages[type].length);
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} star!`,
      description: messages[type][randomIndex],
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
      default: return <StarIcon className="h-6 w-6 text-yellow-400" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-cosmic-900 text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cosmic-800 via-cosmic-900 to-cosmic-900">
      <header className="p-4 flex items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cosmic-300 via-luna-orange to-cosmic-700 bg-clip-text text-transparent">
          Luna's Star Collection
        </h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {!gameStarted && !gameCompleted ? (
          <Card className="w-full max-w-md bg-cosmic-900/80 border border-cosmic-700 backdrop-blur-sm shadow-lg shadow-cosmic-500/20 hover:shadow-cosmic-500/30 transition-all">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-luna-orange via-cosmic-500 to-luna-pink rounded-full opacity-75 blur-sm animate-pulse"></div>
                <Heart className="h-12 w-12 text-luna-orange relative animate-pulse" />
                <Sparkles className="h-5 w-5 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cosmic-300 to-cosmic-500 bg-clip-text text-transparent mb-4">
                Luna's Star Collection
              </h2>
              <p className="mb-6 text-cosmic-300">
                Collect the stars that represent everything that makes you special!
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {starTypes.map(type => (
                  <div key={type} className="flex items-center gap-2 p-2 rounded-lg bg-cosmic-800/50 hover:bg-cosmic-800/80 transition-colors">
                    {getStarIcon(type)}
                    <span className="text-sm capitalize">{type}</span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setGameStarted(true)}
                className="w-full bg-gradient-to-r from-luna-orange to-cosmic-700 hover:from-luna-orange hover:to-cosmic-600 border-0 relative group overflow-hidden"
              >
                <span className="relative z-10">Begin Your Adventure</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cosmic-500 to-luna-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
              <div className="flex gap-2 items-center bg-cosmic-800/70 px-3 py-1 rounded-full backdrop-blur-sm">
                <Heart className="h-5 w-5 text-luna-orange" />
                <span className="font-bold text-lg">{score}</span>
              </div>
              <div className="px-4 py-1 rounded-full bg-cosmic-800/70 border border-cosmic-700/50 backdrop-blur-sm flex items-center gap-2">
                <span className="text-cosmic-300">Time:</span>
                <span className={`font-mono ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-cosmic-100'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
            
            <div 
              ref={gameAreaRef}
              className="flex-1 relative border-2 border-cosmic-700/50 rounded-lg overflow-hidden bg-cosmic-900/70 backdrop-blur-sm shadow-xl"
            >
              <StarField />
              
              {stars.map(star => !star.collected && (
                <button
                  key={star.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 p-3 cursor-pointer transition-all hover:scale-125 focus:outline-none focus:ring-2 focus:ring-cosmic-500 rounded-full"
                  style={{ 
                    left: star.x, 
                    top: star.y,
                    transform: `translate(-50%, -50%) scale(${star.size}) rotate(${star.rotation}deg)`,
                    transition: "transform 0.3s ease-out, filter 0.3s ease-out",
                    animation: `float-custom 6s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                  onClick={() => collectStar(star.id, star.type)}
                  aria-label={`Collect ${star.type} star`}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full opacity-70 blur-sm animate-pulse" 
                      style={{
                        backgroundColor: 
                          star.type === 'soccer' ? 'rgba(249, 115, 22, 0.4)' :
                          star.type === 'nature' ? 'rgba(74, 222, 128, 0.4)' :
                          star.type === 'adventure' ? 'rgba(96, 165, 250, 0.4)' :
                          star.type === 'music' ? 'rgba(192, 132, 252, 0.4)' :
                          'rgba(251, 113, 133, 0.4)'
                      }}
                    ></div>
                    {getStarIcon(star.type)}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-4 text-center text-sm text-cosmic-300 bg-cosmic-800/30 p-3 rounded-full backdrop-blur-sm border border-cosmic-700/20">
              Collect at least 10 stars in 30 seconds to reveal a special collection of love letters!
            </div>
          </div>
        )}
      </main>
      
      <style>
        {`
        @keyframes float-custom {
          0% { transform: translate(-50%, -50%) scale(var(--star-size)) rotate(var(--star-rotation)) translateY(0px); }
          50% { transform: translate(-50%, -50%) scale(var(--star-size)) rotate(calc(var(--star-rotation) + 5deg)) translateY(-10px); }
          100% { transform: translate(-50%, -50%) scale(var(--star-size)) rotate(var(--star-rotation)) translateY(0px); }
        }
        `}
      </style>
    </div>
  );
};

export default LunaGame;
