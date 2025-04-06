"use client";
import React, { useState } from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "../lib/utils";

interface BackgroundBoxesDemoProps {
  onSubmit: (username: string) => void;
}

export default function BackgroundBoxesDemo({ onSubmit }: BackgroundBoxesDemoProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20 mb-8")}>
        GitHub Receipt
      </h1>
      <div className="relative z-20 flex flex-col items-center gap-4">
        <p className="text-center text-neutral-300">
          Generate a receipt-style summary of your GitHub profile
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 w-64"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Get Receipt
          </button>
        </form>
        <p className="text-sm text-neutral-400 mt-4">
          made by ankit | <a href="https://www.buymeacoffee.com/ankit" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">buy ankit a coffee</a>
        </p>
      </div>
    </div>
  );
}