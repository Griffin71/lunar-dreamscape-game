
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Music, Mountain, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface MessageRevealProps {
  onReset: () => void;
  score: number;
}

export const MessageReveal: React.FC<MessageRevealProps> = ({ onReset, score }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [revealedMessage, setRevealedMessage] = useState('');
  const [showEnvelope, setShowEnvelope] = useState(true);
  const { toast } = useToast();
  
  const loveLetters = [
    {
      title: "Our Special Connection",
      author: "Kabelo Samkelo Kgosana Mahlangu Thulari Mgwezana",
      content: `Dear Luna,

This game was made just for you, to celebrate everything that makes you special.

Your love for the Mamelodi Sundowns and how passionate you are about soccer,
The peace you find in nature, surrounded by trees and flowers,
Your adventurous spirit that drives you to try skydiving, snowboarding, and rock climbing,
The way RnB and Hip Hop music moves your soul,
And how you find comfort in the simple joys of staying indoors in your cozy baggy clothes.

You make every moment more special just by being you.

With all my love,
Kabelo Samkelo Kgosana Mahlangu Thulari Mgwezana ❤️`
    },
    {
      title: "The Gentle Love Letter",
      author: "Samkelo",
      content: `My Dearest Luna,

There's a quiet kind of magic that happens when I think of you.
Like the first light of dawn brushing over the world, you fill even the simplest moments with beauty.
You are the calm in my storms, the whisper of hope when days are heavy.
I love the way you see the world — with wonder, with kindness, with a heart bigger than the sky itself.

If I could spend a lifetime learning every star in your soul, it still wouldn't be enough.
You are my light, my dream, my forever.

Always yours,
Samkelo ❤️`
    },
    {
      title: "The Playful Love Letter",
      author: "Kgosana",
      content: `Hey Luna 🌙,

You are absolutely my favorite adventure.
You steal my thoughts like a mischievous spark stealing a candle's flame.
Every little thing you do — every laugh, every look — spins the world a little faster under my feet.

You're the best kind of trouble, and I'm lucky to call you mine.
Let's keep chasing dreams, making memories, and daring the universe to keep up with us.

Forever plotting adventures with you,
Kgosana ❤️`
    },
    {
      title: "The Poetic Love Letter",
      author: "Mahlangu",
      content: `My Sweet Luna,

You are the melody the stars hum when the night is too beautiful for words.
You are the ink in my veins, writing stories only our hearts can understand.
With every glance, you paint galaxies behind my eyes.

Loving you feels like flying without wings — limitless, weightless, endless.
Thank you for letting me walk beside you in this lifetime.
I am honored, amazed, and forever changed by your love.

With all the poetry in my heart,
Mahlangu ❤️`
    },
    {
      title: "The Deep, Emotional Letter",
      author: "Thulari",
      content: `To my only Luna,

When the world feels heavy and uncertain, you are the voice that steadies me.
Your presence is not just comforting — it's necessary, like breath, like heartbeat.

You have given me a kind of love I never thought was real — a love built on trust, understanding, and fierce loyalty.
I promise to be the one who stands with you in all seasons — through every quiet winter and every bursting spring.

You are not just part of my life, Luna.
You are my life.

With a love deeper than oceans,
Thulari ❤️`
    },
    {
      title: "The Dreamer's Love Letter",
      author: "Mgwezana",
      content: `My Beautiful Luna,

If the universe crafted dreams into human form, you would be the result.
You are stardust and soft laughter, firelight and fearless wonder.

There is no corner of existence where my heart would not find you.
You are written into my destiny as surely as the moon belongs to the night sky.

I dream of building a life with you where every day feels like a new page of an endless, beautiful story.
With you, I believe in magic. With you, I believe in forever.

Always reaching for you,
Mgwezana ❤️`
    }
  ];

  useEffect(() => {
    if (showEnvelope) return;
    
    const currentLetter = loveLetters[currentLetterIndex].content;
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < currentLetter.length) {
        setRevealedMessage(currentLetter.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [showEnvelope, currentLetterIndex]);
  
  const saveMessage = () => {
    const element = document.createElement('a');
    const file = new Blob([loveLetters[currentLetterIndex].content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `love-letter-from-${loveLetters[currentLetterIndex].author}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Love letter saved!",
      description: "The message has been saved to your device.",
    });
  };

  const nextLetter = () => {
    if (currentLetterIndex < loveLetters.length - 1) {
      setCurrentLetterIndex(prev => prev + 1);
      setRevealedMessage('');
    }
  };
  
  return (
    <div className="w-full max-w-md">
      {showEnvelope ? (
        <Card className="bg-cosmic-900/80 border border-cosmic-700 relative overflow-hidden">
          <CardContent className="pt-6 pb-6 flex flex-col items-center">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="stars-background absolute inset-0 opacity-30"></div>
            </div>
            
            <div className="relative mb-4 animate-float">
              <div className="w-24 h-32 bg-gradient-to-br from-luna-orange to-cosmic-500 rounded-md flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <Heart className="h-8 w-8 text-white mb-2" />
                <div className="text-xs text-white text-center px-2">
                  Love Letters for Luna
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cosmic-300 to-cosmic-500 bg-clip-text text-transparent mb-4 relative z-10">
              Congratulations!
            </h2>
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <Star className="h-5 w-5 text-luna-orange animate-pulse" />
              <span className="font-bold">{score} Stars Collected</span>
            </div>
            
            <p className="mb-6 text-cosmic-300 text-center relative z-10">
              You've discovered all the magical stars! A collection of love letters awaits you...
            </p>
            
            <Button 
              onClick={() => setShowEnvelope(false)}
              className="w-full bg-luna-orange hover:bg-luna-orange/90 relative z-10"
            >
              <Heart className="mr-2 h-4 w-4" />
              Open Love Letters
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
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-luna-orange to-cosmic-300 bg-clip-text text-transparent">
                {loveLetters[currentLetterIndex].title}
              </h3>
              <p className="relative z-10 font-handwriting text-cosmic-100">
                {revealedMessage}
                <span className="animate-pulse">_</span>
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                onClick={saveMessage}
                className="w-full bg-luna-orange hover:bg-luna-orange/90"
              >
                <Heart className="mr-2 h-4 w-4" />
                Save This Letter
              </Button>
              
              {currentLetterIndex < loveLetters.length - 1 ? (
                <Button 
                  onClick={nextLetter}
                  className="w-full bg-cosmic-500 hover:bg-cosmic-600"
                >
                  <Star className="mr-2 h-4 w-4" />
                  Read Next Letter
                </Button>
              ) : (
                <Button 
                  onClick={onReset}
                  variant="outline"
                  className="w-full"
                >
                  Play Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
