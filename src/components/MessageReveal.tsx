
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Music, Mountain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface MessageRevealProps {
  onReset: () => void;
  score: number;
}

export const MessageReveal: React.FC<MessageRevealProps> = ({ onReset, score }) => {
  const [revealedMessage, setRevealedMessage] = useState('');
  const [showEnvelope, setShowEnvelope] = useState(true);
  const { toast } = useToast();
  
  const fullMessage = `Dear Luna,

This game was made just for you, to celebrate everything that makes you special.

Your love for the Mamelodi Sundowns and how passionate you are about soccer,
The peace you find in nature, surrounded by trees and flowers,
Your adventurous spirit that drives you to try skydiving, snowboarding, and rock climbing,
The way RnB and Hip Hop music moves your soul,
And how you find comfort in the simple joys of staying indoors in your cozy baggy clothes.

You make every moment more special just by being you.

With all my love,
Kabelo Samkelo Kgosana Mahlangu Thulari Mgwezana ❤️`;

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
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [showEnvelope]);
  
  const saveMessage = () => {
    const element = document.createElement('a');
    const file = new Blob([fullMessage], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "message-from-kabelo.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Message saved!",
      description: "The message has been saved to your device.",
    });
  };
  
  return (
    <div className="w-full max-w-md">
      {showEnvelope ? (
        <Card className="bg-cosmic-900/80 border border-cosmic-700 relative overflow-hidden">
          <CardContent className="pt-6 pb-6 flex flex-col items-center">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="stars-background absolute inset-0 opacity-30"></div>
            </div>
            
            <div className="relative mb-4">
              <div className="w-24 h-32 bg-gradient-to-br from-luna-orange to-cosmic-500 rounded-md flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <Heart className="h-8 w-8 text-white mb-2" />
                <div className="text-xs text-white text-center px-2">
                  A special message for Luna
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cosmic-300 to-cosmic-500 bg-clip-text text-transparent mb-4 relative z-10">
              Congratulations!
            </h2>
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <Music className="h-5 w-5 text-luna-orange" />
              <span className="font-bold">{score} Stars Collected</span>
            </div>
            
            <p className="mb-6 text-cosmic-300 text-center relative z-10">
              You've discovered all the magical stars! Would you like to read your special message?
            </p>
            
            <Button 
              onClick={() => setShowEnvelope(false)}
              className="w-full bg-luna-orange hover:bg-luna-orange/90 relative z-10"
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
            
            <div className="flex flex-col gap-2">
              <Button 
                onClick={saveMessage}
                className="w-full bg-luna-orange hover:bg-luna-orange/90"
                leftIcon={<Mountain className="h-4 w-4" />}
              >
                Save Message
              </Button>
              
              <Button 
                onClick={onReset}
                className="w-full"
                variant="outline"
              >
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
