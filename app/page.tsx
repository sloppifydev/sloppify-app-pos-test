"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-8">
      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-12 py-6 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 active:scale-95 rounded-xl text-2xl font-bold text-foreground transition-all select-none cursor-pointer shadow-md"
      >
        Click
      </button>
      <p className="text-4xl font-mono font-bold tabular-nums">{count}</p>
    </div>
  );
}
