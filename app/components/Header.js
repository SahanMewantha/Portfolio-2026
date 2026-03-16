'use client';

import React, { useState, useEffect } from 'react';
import { Home, Briefcase, User, Mail } from 'lucide-react';
import { useWindowScroll } from 'react-use';
import Dock from './Dock';

export default function Header() {
  const { y } = useWindowScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    if (y > lastY && y > 50) {
      // Scrolling down past 50px hides the dock
      setIsVisible(false);
    } else if (y < lastY) {
      // Scrolling up shows the dock
      setIsVisible(true);
    }
    setLastY(y);
  }, [y, lastY]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: id === 'home' ? 0 : element.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const items = [
    { icon: <Home size={20} />, label: 'Home', onClick: () => scrollTo('home') },
    { icon: <Briefcase size={20} />, label: 'Works', onClick: () => scrollTo('portfolio') },
    { icon: <User size={20} />, label: 'About', onClick: () => scrollTo('about') },
    { icon: <Mail size={20} />, label: 'Contact', onClick: () => scrollTo('contact') },
  ];

  return (
    <div className={`fixed bottom-0 left-0 w-full h-32 z-[100] pointer-events-none flex justify-center items-end transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-32'}`}>
      {/* We add pointer-events-auto to the dock wrapper so it can be clicked while the background passes events */}
      <div className="pointer-events-auto w-full relative h-full">
        <Dock 
          items={items}
          panelHeight={80}
          baseItemSize={60}
          magnification={80}
          className="bottom-6"
        />
      </div>
    </div>
  );
}
