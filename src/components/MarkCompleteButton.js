"use client";

import { useState, useTransition } from "react";
import { toggleLessonComplete } from "@/app/actions/progress";

export function MarkCompleteButton({
  moduleSlug,
  lessonSlug,
  initialDone,
  size = "default",
}) {
  const [done, setDone] = useState(initialDone);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const next = !done;
    setDone(next);
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.set("moduleSlug", moduleSlug);
      formData.set("lessonSlug", lessonSlug);
      formData.set("nextState", next ? "complete" : "incomplete");

      const result = await toggleLessonComplete(formData);
      if (result?.error) {
        setDone(!next);
        setError(result.error);
      }
    });
  }

  const sizeClasses =
    size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className={`rounded-md font-medium transition disabled:opacity-60 ${sizeClasses} ${
          done
            ? "border border-success/40 bg-success/10 text-success"
            : "bg-accent text-white hover:bg-accent-strong"
        }`}
      >
        {done ? "완료됨 ✓" : "완료로 표시"}
      </button>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
