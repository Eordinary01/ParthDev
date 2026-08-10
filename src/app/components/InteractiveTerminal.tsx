"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Terminal from "./Terminal";

interface TerminalOption {
  id: string;
  label: string;
  command: string;
  response: string[];
}

const options: TerminalOption[] = [
  {
    id: "whoami",
    label: "Who are you?",
    command: "whoami",
    response: [
      "Parth Manocha — Full Stack Developer",
      "Based in Jaipur, India",
      "Passionate about building scalable web applications",
      "Open to opportunities & collaborations",
    ],
  },
  {
    id: "skills",
    label: "What technologies do you use?",
    command: "cat stack.json",
    response: [
      "{",
      '  "frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],',
      '  "backend":  ["Node.js", "Express.js", "MongoDB"],',
      '  "tools":    ["Git", "Docker", "Vercel", "PostgreSQL"],',
      '  "mobile":   ["React Native"]',
      "}",
    ],
  },
  {
    id: "experience",
    label: "Tell me about your experience",
    command: "cat experience.md",
    response: [
      "# Experience",
      "",
      "I specialize in full-stack development with the MERN stack.",
      "Built 7+ projects including AI platforms, rental systems,",
      "and real-time collaboration tools.",
      "",
      "Currently focused on Next.js and modern web architectures.",
    ],
  },
  {
    id: "projects",
    label: "What are your top projects?",
    command: "ls ~/projects --popular",
    response: [
      "AttendEase/            Multi-level SaaS ERP | React + Node.js",
      "Telegram_Bot/          Full-stack Bot | TypeScript + Web Dashboard",
      "axon-gateway/          API Gateway | JavaScript + Lua + Docker",
      "vehicle-rental-system/ Full Stack | Next.js + MongoDB",
      "",
      "-> Scroll down to see all projects with live demos",
    ],
  },
  {
    id: "contact",
    label: "How can I reach you?",
    command: "cat contact.env",
    response: [
      "EMAIL=parthmanocha66@gmail.com",
      "GITHUB=github.com/Eordinary01",
      "LINKEDIN=linkedin.com/in/parthmanocha01",
      "",
      "-> Or scroll down to use the contact form",
    ],
  },
  {
    id: "availability",
    label: "Are you available for work?",
    command: "./check-availability.sh",
    response: [
      "Status: Available",
      "",
      "Currently accepting:",
      "  * Freelance projects",
      "  * Full-time opportunities",
      "  * Open source collaborations",
      "",
      "Let's build something great together!",
    ],
  },
];

interface DisplayLine {
  id: number;
  kind: "prompt" | "output" | "typing";
  text: string;
  done?: boolean;
}

const LINE_HEIGHT = 22;

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<DisplayLine[]>([]);
  const [cursorText, setCursorText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showOptions, setShowOptions] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const scrollDown = useCallback(() => {
    requestAnimationFrame(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
    });
  }, []);

  useEffect(() => {
    scrollDown();
  }, [lines, cursorText, scrollDown]);

  const typeCommand = useCallback(
    (command: string, onDone: () => void) => {
      setIsProcessing(true);
      setShowOptions(false);
      setCursorText("");
      setShowCursor(true);

      let i = 0;
      const baseDelay = 45;

      const tick = () => {
        if (i < command.length) {
          i++;
          setCursorText(command.slice(0, i));
          // Vary timing slightly for realism, but keep it smooth
          const nextDelay = baseDelay + Math.floor(Math.random() * 25);
          timers.current.push(setTimeout(tick, nextDelay));
        } else {
          // Pause briefly after finishing, then commit
          timers.current.push(
            setTimeout(() => {
              setShowCursor(false);
              setCursorText("");
              onDone();
            }, 300)
          );
        }
      };

      tick();
    },
    []
  );

  const handleOptionClick = useCallback(
    (option: TerminalOption) => {
      if (isProcessing) return;

      const nextId = idCounter.current;

      typeCommand(option.command, () => {
        // Commit the typed command as a permanent line
        const cmdLine: DisplayLine = {
          id: nextId,
          kind: "prompt",
          text: option.command,
        };
        setLines((prev) => [...prev, cmdLine]);
        idCounter.current++;

        // Stagger in each response line
        option.response.forEach((text, i) => {
          const lineId = idCounter.current + i;
          timers.current.push(
            setTimeout(() => {
              setLines((prev) => [
                ...prev,
                { id: lineId, kind: "output", text },
              ]);
            }, (i + 1) * 60)
          );
        });

        // Update counter and re-show options
        const totalNew = option.response.length;
        timers.current.push(
          setTimeout(() => {
            idCounter.current += totalNew;
            setIsProcessing(false);
            setShowOptions(true);
          }, totalNew * 60 + 150)
        );
      });
    },
    [isProcessing, typeCommand]
  );

  const handleReset = useCallback(() => {
    clearTimers();
    setLines([]);
    setCursorText("");
    setShowCursor(true);
    setIsProcessing(false);
    setShowOptions(true);
    idCounter.current = 0;
  }, [clearTimers]);

  return (
    <Terminal title="parth@dev:~">
      <div
        ref={bodyRef}
        className="terminal-scroll"
        style={{ height: 420 }}
      >
        {/* Output area - fixed height container, stable layout */}
        <div className="terminal-lines">
          {/* Welcome */}
          {lines.length === 0 && !isProcessing && (
            <div className="terminal-line-group">
              <p className="t-green">parth@dev terminal v1.0</p>
              <p className="t-muted">Click an option below to explore.</p>
            </div>
          )}

          {/* Committed lines */}
          {lines.map((line) => (
            <div key={line.id} className="terminal-line">
              {line.kind === "prompt" ? (
                <div className="t-prompt">
                  <span className="t-green">~</span>
                  <span className="t-blue">$</span>
                  <span className="t-text">{line.text}</span>
                </div>
              ) : (
                <div className="t-output">{line.text || "\u00A0"}</div>
              )}
            </div>
          ))}

          {/* Active typing line */}
          {showCursor && cursorText && (
            <div className="terminal-line">
              <div className="t-prompt">
                <span className="t-green">~</span>
                <span className="t-blue">$</span>
                <span className="t-text">{cursorText}</span>
                <span className="t-cursor" />
              </div>
            </div>
          )}

          {/* Idle cursor when not typing anything */}
          {showCursor && !cursorText && !isProcessing && (
            <div className="terminal-line">
              <div className="t-prompt">
                <span className="t-green">~</span>
                <span className="t-blue">$</span>
                <span className="t-cursor" />
              </div>
            </div>
          )}
        </div>

        {/* Options panel - pinned at bottom */}
        {showOptions && (
          <div className="terminal-options">
            <p className="t-muted text-xs mb-2">{">"} select a topic:</p>
            <div className="terminal-option-grid">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt)}
                  className="terminal-option"
                >
                  <span className="t-green">{">"}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
            {lines.length > 0 && (
              <button onClick={handleReset} className="terminal-reset">
                clear
              </button>
            )}
          </div>
        )}
      </div>
    </Terminal>
  );
}
