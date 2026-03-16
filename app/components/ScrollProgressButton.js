'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ScrollProgressButton() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (docHeight <= 0) {
      setProgress(0);
      setVisible(false);
      return;
    }

    const scrollPercent = Math.min(scrollTop / docHeight, 1);
    setProgress(scrollPercent);
    setVisible(scrollTop > 100);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const isAtBottom = progress >= 0.95;

  const handleClick = () => {
    if (isAtBottom) {
      // Scroll to top (hero section)
      const hero = document.getElementById('home');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Scroll down by one viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  // SVG progress ring calculations
  const size = 52;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <button
      onClick={handleClick}
      aria-label={isAtBottom ? 'Scroll to top' : 'Scroll down'}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 5, 5, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isAtBottom
          ? '0 0 20px rgba(0, 214, 255, 0.4), 0 0 40px rgba(0, 214, 255, 0.15)'
          : '0 4px 24px rgba(0, 0, 0, 0.4)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'scale(1)' : 'scale(0.8)',
        transition: 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.5s ease',
        padding: 0,
        outline: 'none',
      }}
    >
      {/* SVG Progress Ring */}
      <svg
        width={size}
        height={size}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'rotate(-90deg)',
        }}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isAtBottom ? 'var(--primary)' : 'var(--primary)'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition: 'stroke-dashoffset 0.15s ease-out, stroke 0.5s ease',
          }}
        />
      </svg>

      {/* Arrow Icon */}
      <ChevronDown
        size={20}
        color="rgba(255, 255, 255, 0.85)"
        style={{
          position: 'relative',
          zIndex: 1,
          transform: isAtBottom ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </button>
  );
}
