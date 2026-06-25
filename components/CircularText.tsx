'use client';
import { motion } from 'motion/react';

export default function CircularText({ text }: { text: string }) {
  const characters = text.split("");
  
  return (
    <motion.div 
      className="absolute inset-0 z-20 pointer-events-none"
      animate={{ rotate: 360 }}
      transition={{ ease: "linear", duration: 20, repeat: Infinity }}
    >
      {characters.map((char, i) => (
        <span
          key={i}
          className="absolute left-1/2 -ml-2 origin-bottom text-white text-xs tracking-widest font-sans uppercase"
          style={{
            height: "50%",
            transform: `rotate(${(i * 360) / characters.length}deg)`
          }}
        >
          {char}
        </span>
      ))}
    </motion.div>
  );
}
