"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Status: 404 — The page you’re looking for does not exist.",
    "Type 'help' for available commands.",
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const print = (line: string) => setHistory((prev) => [...prev, line]);

  const commands: Record<string, (args: string[]) => void> = {
    help: () => {
      print("Available: home, projects, contact, back, help, clear");
    },
    clear: () => setHistory([]),
    home: () => router.push("/"),
    back: () => router.back(),
    projects: () => {
      print("Opening home. From there, open Projects.");
      router.push("/");
    },
    contact: () => {
      print("Launching mail client: srirambharath7@gmail.com");
      window.location.href = "mailto:srirambharath7@gmail.com";
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputValue.trim();
    if (!raw) return;

    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);
    setInputValue("");
    print(`$ ${raw}`);

    const [cmd, ...args] = raw.toLowerCase().split(" ");
    const fn = commands[cmd];
    if (fn) {
      fn(args);
    } else {
      print(`Command not found: ${cmd}. Type 'help'.`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue("");
      }
    }
  };

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-2xl rounded-lg border border-slate-700/50 bg-black/60 text-slate-200 shadow-xl">
        <div className="border-b border-slate-700/40 px-4 py-2 text-sm text-slate-300">
          <span className="mr-2 text-cyan-300">kali@kali</span> — 404 terminal
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap break-words">{line}</div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-700/40 px-4 py-3">
          <span className="text-cyan-300">└─$</span>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command... (try 'help')"
            className="flex-1 bg-transparent outline-none text-slate-200 placeholder-slate-500"
            autoFocus
          />
        </form>
      </div>
    </main>
  );
}


