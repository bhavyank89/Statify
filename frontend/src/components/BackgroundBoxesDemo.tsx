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
    <div className="h-screen w-full absolute top-0 left-0 overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      
      {/* Position the Boxes component to fill the entire viewport */}
      <div className="absolute inset-0 w-full h-full">
        <Boxes className="!absolute !top-0 !left-0 !w-full !h-full" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center gap-4 px-4">
        <h1 className={cn("md:text-5xl text-3xl font-bold text-white mb-4")}>
          GitHub Receipt
        </h1>
        <p className="text-center text-lg text-neutral-300 mb-8">
          Generate a receipt-style summary of your GitHub profile
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 w-72 text-lg"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-lg font-medium"
          >
            Get Receipt
          </button>
        </form>
        <p className="text-sm text-neutral-400 mt-8">
          made by Parth | <a href="https://buymeacoffee.com/parthshukly" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">buy Parth a coffee</a>
        </p>
      </div>
    </div>
  );
}