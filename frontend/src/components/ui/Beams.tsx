import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/providers/ThemeProvider';

interface BeamsProps {
  className?: string;
  count?: number; // beamNumber
  width?: number; // beamWidth
  minSpeed?: number;
  maxSpeed?: number;
  color?: string; // lightColor
  intensity?: number;
  rotation?: number;
}

const Beams = ({
  className,
  count = 20,
  width = 3,
  minSpeed = 0.5,
  maxSpeed = 2,
  color,
  intensity = 0.6,
  rotation = 30 // degrees
}: BeamsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const beams: { x: number; speed: number; opacity: number; targetOpacity: number; width: number }[] = [];
    let canvasWidth = 0;
    let canvasHeight = 0;

    // Determine color based on theme or prop
    const beamColor = color 
      ? color 
      : theme === 'dark' 
        ? '#ffffff' // White in dark mode
        : '#3b82f6'; // Blue in light mode for visibility

    // Convert hex to rgb for rgba usage
    const hexToRgb = (hex: string) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 255, g: 255, b: 255 };
    };
    
    const rgb = hexToRgb(beamColor);

    const initBeams = () => {
      beams.length = 0;
      // Calculate necessary width to cover rotated area
      const diagonal = Math.sqrt(canvasWidth * canvasWidth + canvasHeight * canvasHeight);
      
      for (let i = 0; i < count; i++) {
        beams.push({
          x: Math.random() * diagonal * 1.5 - (diagonal * 0.25), // Spread wider than view
          speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
          opacity: Math.random() * intensity,
          targetOpacity: Math.random() * intensity,
          width: width + Math.random() * width // varied width
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvasWidth = parent.offsetWidth;
        canvasHeight = parent.offsetHeight;
        canvas.width = canvasWidth * window.devicePixelRatio;
        canvas.height = canvasHeight * window.devicePixelRatio;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        initBeams();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      // Save context for rotation
      ctx.save();
      
      // Rotate around center
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvasWidth / 2, -canvasHeight / 2);

      // Draw Beams
      // We need to draw over a large area because of rotation
      // Center the drawing area relative to the canvas center
      const diagonal = Math.sqrt(canvasWidth * canvasWidth + canvasHeight * canvasHeight);
      const offsetX = (canvasWidth - diagonal) / 2;
      const offsetY = (canvasHeight - diagonal) / 2;

      ctx.translate(offsetX - (diagonal * 0.25), offsetY); // Offset to cover rotation gaps

      beams.forEach(beam => {
        // Update opacity - Faster pulse for more "interesting" look
        if (Math.abs(beam.opacity - beam.targetOpacity) < 0.01) {
          beam.targetOpacity = Math.random() * intensity;
        } else {
          beam.opacity += (beam.targetOpacity - beam.opacity) * 0.05; // Increased visual activity
        }

        // Update Position
        beam.x -= beam.speed;
        if (beam.x < -1000) { // Reset further out for wide beams
           beam.x = diagonal * 1.5;
        }

        // Draw Gradient Line
        const gradient = ctx.createLinearGradient(beam.x, 0, beam.x + beam.width, 0);
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        gradient.addColorStop(0.2, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${beam.opacity * 0.4})`); // Wider falloff
        gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${beam.opacity})`); // Strong core
        gradient.addColorStop(0.8, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${beam.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(beam.x, -diagonal, beam.width * 10, diagonal * 3); // Draw super tall beam
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, width, minSpeed, maxSpeed, color, intensity, rotation, theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className={cn("absolute inset-0 block w-full h-full pointer-events-none", className)}
    />
  );
};

export default Beams;
