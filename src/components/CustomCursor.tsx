import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'motion/react';

const THREAD_LENGTH = 40;

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const pointsRef = useRef<{ x: number, y: number }[]>(Array(THREAD_LENGTH).fill({ x: 0, y: 0 }));
  const [path, setPath] = useState('');

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    let animationFrameId: number;
    const updateThread = () => {
      const points = [...pointsRef.current];
      
      // First point follows the cursor directly
      points[0] = { x: mousePosition.x, y: mousePosition.y };

      // Other points follow the one before them
      for (let i = 1; i < THREAD_LENGTH; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];
        
        points[i] = {
          x: p2.x + (p1.x - p2.x) * 0.25,
          y: p2.y + (p1.y - p2.y) * 0.25
        };
      }

      pointsRef.current = points;

      // Generate SVG path (Catmull-Rom or simple quadratic)
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < THREAD_LENGTH - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        d += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
      }
      setPath(d);

      animationFrameId = requestAnimationFrame(updateThread);
    };

    animationFrameId = requestAnimationFrame(updateThread);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* The Thread */}
      <svg className="absolute top-0 left-0 w-full h-full">
        <path
          d={path}
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* The Pointer */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {/* Hover Glow */}
        <motion.div
          className="absolute rounded-full bg-brand-gold/20"
          initial={{ width: 0, height: 0, top: 0, left: 0, x: '-50%', y: '-50%' }}
          animate={{
            width: isHovering ? 48 : 0,
            height: isHovering ? 48 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}
