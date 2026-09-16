"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children, pendingText, className, ...props }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className} {...props}>
      {pending ? pendingText ?? "처리 중..." : children}
    </button>
  );
}
