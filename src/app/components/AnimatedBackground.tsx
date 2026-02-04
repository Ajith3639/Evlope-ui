import { motion } from 'motion/react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-pink-300 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 left-1/3 w-[450px] h-[450px] bg-blue-300 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-cyan-300 rounded-full blur-3xl"
      />
    </div>
  );
}
