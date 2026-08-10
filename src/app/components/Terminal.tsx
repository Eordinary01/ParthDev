"use client";
import React from "react";

interface TerminalProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Terminal({ title = "parth@dev", children, className = "" }: TerminalProps) {
  return (
    <div className={`terminal ${className}`}>
      <div className="terminal-header">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="ml-3 text-xs text-gh-muted font-mono">{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
}
