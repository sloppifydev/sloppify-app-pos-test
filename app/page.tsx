"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);
  const clickTimestamps = useRef<number[]>([]);
  
  // Groups of stinky people who don't know what soap is
  const stinkyGroups = [
    "The Cave Dwellers Who Fear Water",
    "The Ancient Mud Bath Enthusiasts", 
    "The Forgotten Wilderness Hermits",
    "The Mysterious Swamp Folk",
    "The Underground Tunnel Rats",
    "The Dusty Desert Wanderers",
    "The Moldy Basement Dwellers"
  ];
  
  const [currentGroup, setCurrentGroup] = useState(stinkyGroups[0]);
  const audioRef1 = useRef<HTMLAudioElement | null>(null);
  const audioRef2 = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    audioRef1.current = new Audio('/daxgasm1.mp3');
    audioRef2.current = new Audio('/daxgasm2.mp3');
    
    // Preload audio
    audioRef1.current.load();
    audioRef2.current.load();
  }, []);

  // Calculate clicks per second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      // Remove clicks older than 1 second
      clickTimestamps.current = clickTimestamps.current.filter(
        timestamp => now - timestamp <= 1000
      );
      setClicksPerSecond(clickTimestamps.current.length);
    }, 100); // Update every 100ms for responsiveness

    return () => clearInterval(interval);
  }, []);

  const playSound = () => {
    // Calculate volume based on clicks per second (0.1 to 1.0)
    const baseVolume = 0.1;
    const maxVolume = 1.0;
    const volume = Math.min(maxVolume, baseVolume + (clicksPerSecond * 0.15));

    // Alternate between the two audio files for variety
    const audio = count % 2 === 0 ? audioRef1.current : audioRef2.current;
    
    if (audio) {
      audio.volume = volume;
      // Reset to start and play
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore play errors (e.g., if user hasn't interacted yet)
      });
    }
  };

  const getRandomGroup = () => {
    const randomIndex = Math.floor(Math.random() * stinkyGroups.length);
    setCurrentGroup(stinkyGroups[randomIndex]);
  };

  const handleClick = () => {
    const now = Date.now();
    clickTimestamps.current.push(now);
    setCount((c) => c + 1);
    playSound();
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-8">
      <h1 className="text-3xl font-bold text-center max-w-2xl leading-tight">
        {currentGroup}
      </h1>
      <button
        onClick={getRandomGroup}
        className="px-8 py-4 bg-blue-500 hover:bg-blue-600 active:scale-95 rounded-xl text-lg font-bold text-white transition-all select-none cursor-pointer shadow-md"
      >
        Show Random Group
      </button>
      <button
        onClick={handleClick}
        className="px-12 py-6 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 active:scale-95 rounded-xl text-2xl font-bold text-foreground transition-all select-none cursor-pointer shadow-md"
      >
        Click
      </button>
      <p className="text-4xl font-mono font-bold tabular-nums">{count}</p>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        {clicksPerSecond} clicks/sec
      </div>
    </div>
  );
}
