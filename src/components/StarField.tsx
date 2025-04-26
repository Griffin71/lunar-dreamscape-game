
import React, { useEffect, useRef } from 'react';

export const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create stars
    const stars: {x: number, y: number, radius: number, opacity: number, speed: number}[] = [];
    const starCount = Math.floor((canvas.width * canvas.height) / 2000); // Adjust density
    
    for (let i = 0; i < starCount; i++) {
      const radius = Math.random() * 1.5;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        opacity: Math.random() * 0.8 + 0.2, // Between 0.2 and 1
        speed: Math.random() * 0.05 + 0.01 // Twinkle speed
      });
    }
    
    // Animation
    let animationFrame: number;
    let time = 0;
    
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        // Make stars twinkle
        const twinkle = Math.sin(time * star.speed * 10) * 0.5 + 0.5;
        const currentOpacity = star.opacity * twinkle;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }} // Allow clicks to pass through
    />
  );
};
