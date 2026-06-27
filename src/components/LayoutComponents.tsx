import React from 'react';
import { motion } from 'motion/react';

export const FadeIn = ({ children, delay = 0, direction = 'up', className = "" }: { children: React.ReactNode, delay?: number, direction?: 'up' | 'down' | 'left' | 'right', className?: string, key?: any }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0
    },
    visible: {
      opacity: 1, y: 0, x: 0,
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
    }
  };
  return (
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }} 
      variants={variants} 
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

export const TitleReveal = ({ text, className = "", as: Element = "h2" }: { text: string, className?: string, as?: 'h1' | 'h2' | 'h3' | 'span' }) => {
  const words = text.split(/\s+/).filter(Boolean);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-150px" }}
      variants={containerVariants}
      className={`${className} inline-flex flex-wrap gap-x-[0.23em] gap-y-[0.08em]`}
      style={{ willChange: "transform, opacity" }}
    >
      {words.map((word, idx) => (
        <motion.span 
          key={idx} 
          variants={itemVariants} 
          className="inline-block whitespace-nowrap"
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const GlassCard = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <motion.div whileHover={{ y: -5, scale: 1.015 }} className={`organic-card p-8 rounded-[2.5rem] ${className}`} {...props}>
    {children}
  </motion.div>
);

export const LightPoint = ({ color, size, top, left, delay }: { color: string, size: string, top: string, left: string, delay: number }) => (
  <div className="light-point" style={{ backgroundColor: color, width: size, height: size, top, left, animationDelay: `${delay}s` }} />
);
