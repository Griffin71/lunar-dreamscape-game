
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MessageRevealProps {
  onReset: () => void;
  score: number;
}

export const MessageReveal: React.FC<MessageRevealProps> = ({ onReset, score }) => {
  const [revealedMessage, setRevealedMessage] = useState('');
  const [showEnvelope, setShowEnvelope] = useState(true);
  
  const fullMessage = `Dear Luna,

This game was made just for you, to celebrate all the things that make you special. 

Your love of nature, adventure, and stories...
Your appreciation for art, music, and the stars above...
Your kindness toward animals and everyone you meet...
And the magic you bring to everyday moments.

You make the world more beautiful just by being in it.

With all my love ❤️`;

  useEffect(() => {
    if (showEnvelope) return;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        setRevealedMessage(fullMessage.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust typing speed here
    
    return () => clearInterval(typingInterval);
  }, [showEnvelope]);
  
  return (
    <div className="w-full max-w-md">
      {showEnvelope ? (
        <Card className="bg-cosmic-900/80 border border-cosmic-700 relative overflow-hidden">
          <CardContent className="pt-6 pb-6 flex flex-col items-center">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="stars-background absolute inset-0 opacity-30"></div>
            </div>
            
            <div className="relative mb-4">
              <div className="w-24 h-32 bg-gradient-to-br from-cosmic-300 to-cosmic-500 rounded-md flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <Heart className="h-8 w-8 text-white mb-2" />
                <div className="text-xs text-white text-center px-2">
                  A special message for Luna
                </div>
              </div>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
            
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cosmic-300 to-cosmic-500 bg-clip-text text-transparent mb-4 relative z-10">
              Congratulations!
            </h2>
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-bold">{score} Stars Collected</span>
            </div>
            
            <p className="mb-6 text-cosmic-300 text-center relative z-10">
              You've discovered all the magical stars! Would you like to read your special message?
            </p>
            
            <Button 
              onClick={() => setShowEnvelope(false)}
              className="w-full bg-cosmic-500 hover:bg-cosmic-600 relative z-10"
            >
              Open Love Letter
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-cosmic-900/80 border border-cosmic-700 shadow-lg">
          <CardContent className="pt-6 pb-6">
            <div className="bg-cosmic-800/50 rounded-lg p-6 mb-4 min-h-[300px] whitespace-pre-line relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="stars-background absolute inset-0 opacity-10"></div>
              </div>
              <p className="relative z-10 font-handwriting text-cosmic-100">
                {revealedMessage}
                <span className="animate-pulse">_</span>
              </p>
            </div>
            
            <Button 
              onClick={onReset}
              className="w-full"
              variant="outline"
            >
              Play Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
