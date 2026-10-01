"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useWindowDrag, useWindowManager } from "@/lib/wm";
import { HOME, displayPath } from "@/lib/vfs";
import { runCommand } from "@/lib/terminal/execute";
import { complete } from "@/lib/terminal/completion";
import { usePortfolioContent } from "@/lib/content/provider";
import type { TerminalLine } from "@/lib/terminal/types";
import TerminalOutput, { PromptLabel } from "./terminal/TerminalOutput";
import WindowControls from "./desktop/WindowControls";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

interface TerminalProps {
  /** Window manager instance this terminal is rendered into. */
  windowId: string;
}

export default function Terminal({ windowId }: TerminalProps) {
  const { windows, closeWindow, focusWindow, minimizeWindow, maximizeWindow, openWindow } =
    useWindowManager();
  const win = windows.find((w) => w.id === windowId);
  const onTitlebarMouseDown = useWindowDrag(win);
  const content = usePortfolioContent();

  const [lines, setLines] = useState<TerminalLine[]>(() =>
    content.settings.terminal.motd.map((text) => ({ kind: "text", tone: "muted", text }))
  );
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState(HOME);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const cwdRef = useRef(cwd);
  cwdRef.current = cwd;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = useCallback(() => {
    if (!outputRef.current) return;
    gsap.to(outputRef.current, {
      scrollTo: { y: "max", autoKill: true },
      duration: 0.3,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const submit = (raw: string) => {
    const trimmed = raw.trim();
    const promptLine: TerminalLine = {
      kind: "prompt",
      cwd: displayPath(cwdRef.current),
      command: raw,
    };

    if (trimmed.length === 0) {
      setLines((prev) => [...prev, promptLine]);
      setInput("");
      return;
    }

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    let cleared = false;
    const output = runCommand(trimmed, {
      cwd: cwdRef.current,
      history: commandHistory,
      setCwd,
      clearScreen: () => {
        cleared = true;
      },
      openApp: (appId, launchProps) => openWindow(appId, launchProps),
      openExternal: (url) => window.open(url, "_blank", "noopener,noreferrer"),
      exit: () => closeWindow(windowId),
      content,
    });

    setLines((prev) => (cleared ? [] : [...prev, promptLine, ...output]));
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && input.length === 0) {
      event.preventDefault();
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      setLines((prev) => [
        ...prev,
        { kind: "prompt", cwd: displayPath(cwdRef.current), command: input },
        { kind: "text", tone: "muted", text: "^C" },
      ]);
      setInput("");
      setHistoryIndex(-1);
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setLines([]);
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const result = complete(input, cwdRef.current, content);
      if (result.line !== null) {
        setInput(result.line);
      }
      if (result.candidates.length > 1) {
        setLines((prev) => [
          ...prev,
          { kind: "prompt", cwd: displayPath(cwdRef.current), command: input },
          { kind: "columns", items: result.candidates },
        ]);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
    }
  };

  if (!win) return null;

  return (
    <div
      className={`terminal-window fixed bg-black/70 backdrop-blur-lg rounded-lg overflow-hidden border shadow-xl flex flex-col ${
        win.focused ? "border-slate-500/45" : "border-slate-700/40 window-unfocused"
      }`}
      style={{
        height: `${win.rect.height}px`,
        width: `${win.rect.width}px`,
        maxWidth: "100%",
        transition: win.maximized ? "none" : "all 0.3s ease-in-out",
        top: `${win.rect.y}px`,
        left: `${win.rect.x}px`,
        zIndex: win.zIndex,
        display: win.minimized ? "none" : "flex",
        boxShadow: win.focused
          ? "0 18px 50px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(90, 169, 255, 0.12)"
          : "0 10px 30px rgba(0, 0, 0, 0.45)",
        borderRadius: win.maximized ? "0" : "0.5rem",
      }}
      onMouseDown={() => focusWindow(windowId)}
      onClick={() => {
        if (window.getSelection()?.toString() === "") inputRef.current?.focus();
      }}
    >
      <div
        className="terminal-titlebar cursor-move bg-slate-900/95 border-b border-slate-700/60 flex-shrink-0 select-none flex items-center"
        onMouseDown={onTitlebarMouseDown}
      >
        <div className="flex items-center w-full gap-2">
          <div className="flex-1 min-w-0" />
          <div className="kali-title flex-shrink-0 text-slate-200/95 t-md font-medium truncate">
            kali@kali: {displayPath(cwd)}
          </div>
          <WindowControls
            onMinimize={() => minimizeWindow(windowId)}
            onMaximize={() => maximizeWindow(windowId)}
            onClose={() => closeWindow(windowId)}
          />
        </div>
      </div>

      <div
        ref={outputRef}
        className="terminal-output terminal-screen flex-1 custom-scrollbar"
        style={{ overflowY: "auto", overscrollBehavior: "contain" }}
      >
        {lines.map((line, index) => (
          <div key={index} className="term-line">
            <TerminalOutput line={line} />
          </div>
        ))}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(input);
          }}
          className="command-line"
        >
          <PromptLabel cwd={displayPath(cwd)} />
          <div className="kali-bottom">
            <span className="kali-arrow">└─$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 min-w-0 bg-transparent outline-none terminal-input"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
