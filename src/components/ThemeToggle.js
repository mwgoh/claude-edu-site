"use client";

import { useEffect, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, resolveTheme } from "@/lib/theme";

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function MonitorIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

const OPTIONS = [
  { mode: "light", label: "라이트", Icon: SunIcon },
  { mode: "dark", label: "다크", Icon: MoonIcon },
  { mode: "system", label: "시스템", Icon: MonitorIcon },
];

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme-mode"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme-mode") || "system";
}

function getServerSnapshot() {
  return "system";
}

export function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // 모드가 "system"일 때 OS 테마가 바뀌면 실제 적용 테마도 함께 갱신한다.
  useEffect(() => {
    if (mode !== "system") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    function handleSystemChange() {
      document.documentElement.setAttribute(
        "data-theme",
        mediaQuery.matches ? "dark" : "light"
      );
    }
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [mode]);

  function applyMode(nextMode) {
    localStorage.setItem(THEME_STORAGE_KEY, nextMode);
    document.documentElement.setAttribute("data-theme-mode", nextMode);
    document.documentElement.setAttribute("data-theme", resolveTheme(nextMode));
  }

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-border bg-surface p-0.5">
      {OPTIONS.map(({ mode: optionMode, label, Icon }) => (
        <button
          key={optionMode}
          type="button"
          onClick={() => applyMode(optionMode)}
          aria-label={`${label} 테마`}
          aria-pressed={mode === optionMode}
          title={label}
          className={`flex h-7 w-7 items-center justify-center rounded transition ${
            mode === optionMode
              ? "bg-accent text-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
