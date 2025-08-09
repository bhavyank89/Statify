"use client";
import React, { useState } from "react";
import { cn } from "../lib/utils";
import { Boxes } from "./ui/background-boxes"; // animated boxes

interface BackgroundBoxesDemoProps {
  onSubmit: (username: string) => void;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BackgroundBoxesDemo({
  onSubmit,
  show,
  setShow
}: BackgroundBoxesDemoProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  // Only render input screen if `show` is false
  if (show) return null;

  return (
    <div className="h-screen w-full absolute top-0 left-0 overflow-hidden bg-transparent flex flex-col items-center justify-center">
      {/* Foreground content */}
      <div className="relative z-20 flex flex-col items-center gap-4 px-4">
        <h1 className={cn("md:text-5xl text-3xl font-bold text-white mb-4")}>
          GitHub Receipt
        </h1>
        <p className="text-center text-lg text-neutral-300 mb-8">
          Generate a receipt-style summary of your GitHub profile
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 w-72 text-lg"
          />
          <button
            type="submit"
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-900/70 px-8 py-1 text-lg font-medium text-white backdrop-blur-3xl hover:bg-slate-800/70 transition-colors">
              Get Receipt
            </span>
          </button>
        </form>
        <p className="text-sm text-neutral-400 mt-8">
          made by Parth |{" "}
          <a
            href="https://buymeacoffee.com/parthshukly"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            buy Parth a coffee
          </a>
        </p>
      </div>
    </div>
  );
}
