"use client";

import { useEffect, useRef, useState } from "react";

const QUICK_COMMANDS_SHELL = [
  "npm install -g @anthropic-ai/claude-code",
  "claude --version",
  "claude",
];

const QUICK_COMMANDS_SESSION = ["/help", "/status", "/compact", "/clear", "exit"];

function Line({ line }) {
  if (line.type === "input") {
    return (
      <div className="flex gap-2">
        <span className="shrink-0 text-accent-strong">{line.prompt}</span>
        <span className="text-foreground">{line.text}</span>
      </div>
    );
  }
  if (line.type === "system") {
    return <div className="text-muted">{line.text}</div>;
  }
  return <div className="whitespace-pre-wrap text-[#c9d1d9]">{line.text}</div>;
}

const INTRO = [
  {
    type: "output",
    text: "이것은 실제 API를 호출하지 않는 학습용 시뮬레이터입니다. 아래 명령어를 입력해 Claude Code의 동작 흐름을 미리 체험해 보세요.",
  },
];

export function CliSimulator() {
  const [lines, setLines] = useState(INTRO);
  const [input, setInput] = useState("");
  const [inSession, setInSession] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function print(text, type = "output") {
    setLines((prev) => [...prev, { type, text }]);
  }

  function runShellCommand(raw) {
    const cmd = raw.trim();

    if (cmd === "claude") {
      print(
        "인증 확인 중... 완료\n프로젝트를 분석했습니다. 세션을 시작합니다."
      );
      setInSession(true);
      return;
    }

    if (cmd === "claude --version") {
      print("claude-code/2.x.x (simulator)");
      return;
    }

    if (cmd === "npm install -g @anthropic-ai/claude-code") {
      print(
        "added 1 package in 2s\n\n1 package is looking for funding\n  run `npm fund` for details\n\n설치가 완료되었습니다. 'claude' 명령으로 세션을 시작하세요."
      );
      return;
    }

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "") return;

    print(
      `command not found: ${cmd}\n힌트: npm install -g @anthropic-ai/claude-code 또는 claude 를 입력해보세요.`
    );
  }

  function runSessionCommand(raw) {
    const cmd = raw.trim();

    if (cmd === "/help") {
      print(
        [
          "사용 가능한 명령어:",
          "  /help     사용 가능한 명령어 목록 표시",
          "  /clear    대화 컨텍스트 초기화",
          "  /compact  대화 내용을 요약해 컨텍스트 절약",
          "  /status   모델 및 권한 모드 확인",
          "  exit      세션 종료",
        ].join("\n")
      );
      return;
    }

    if (cmd === "/status") {
      print(
        [
          "모델: claude-sonnet-5",
          "권한 모드: 기본 (파일 수정 전 승인 요청)",
          "컨텍스트 사용량: 12%",
        ].join("\n")
      );
      return;
    }

    if (cmd === "/compact") {
      print("이전 대화를 요약했습니다. 컨텍스트 사용량이 줄어들었습니다.");
      return;
    }

    if (cmd === "/clear") {
      setLines([]);
      print("컨텍스트를 초기화했습니다.", "system");
      return;
    }

    if (cmd === "exit" || cmd === "/exit") {
      print("세션을 종료합니다.");
      setInSession(false);
      return;
    }

    if (cmd === "") return;

    print(
      `(시뮬레이션) "${cmd}" 요청을 이해했습니다.\n실제 Claude Code라면 지금 이 저장소의 파일을 탐색하고, 필요한 경우 수정 전 승인을 요청했을 것입니다.\n실제 동작은 로컬 터미널에서 'claude'를 실행해 확인해 보세요.`
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const value = input;
    const prompt = inSession ? "❯" : "$";

    setLines((prev) => [...prev, { type: "input", prompt, text: value }]);
    if (value.trim() !== "") {
      setHistory((prev) => [...prev, value]);
    }
    setHistoryIndex(null);
    setInput("");

    if (inSession) {
      runSessionCommand(value);
    } else {
      runShellCommand(value);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  }

  const quickCommands = inSession ? QUICK_COMMANDS_SESSION : QUICK_COMMANDS_SHELL;

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div
        className="flex h-[28rem] flex-1 flex-col overflow-hidden rounded-lg border border-border bg-[#0a0c0f] font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-3 text-xs text-muted">
            {inSession ? "claude session" : "terminal"}
          </span>
        </div>
        <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-4">
          {lines.map((line, i) => (
            <Line key={i} line={line} />
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border px-4 py-3"
        >
          <span className="text-accent-strong">{inSession ? "❯" : "$"}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            placeholder={
              inSession ? "메시지 또는 /help 입력..." : "claude 입력..."
            }
            className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted/60"
          />
        </form>
      </div>

      <div className="flex w-full flex-col gap-2 lg:w-56">
        <p className="text-xs font-medium text-muted">
          {inSession ? "세션 내 명령어" : "쉘 명령어"}
        </p>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => {
              setInput(cmd);
              inputRef.current?.focus();
            }}
            className="rounded-md border border-border bg-surface px-3 py-2 text-left font-mono text-xs text-muted transition hover:border-accent hover:text-foreground"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
