"use client";

import { useActionState } from "react";
import { submitCapstone } from "@/app/actions/capstone";
import { SubmitButton } from "@/components/SubmitButton";

const initialState = { error: null, success: false };

export function CapstoneForm({ initialData }) {
  const [state, formAction] = useActionState(submitCapstone, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm text-muted">
          프로젝트 제목
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={initialData?.title ?? ""}
          placeholder="예: Claude Code로 만든 배포 자동화 봇"
          className="rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm text-muted">
          프로젝트 설명 및 적용한 워크플로우
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          defaultValue={initialData?.description ?? ""}
          placeholder="어떤 프로젝트에 Claude Code를 도입했는지, 디버깅/리팩토링/Git 자동화/MCP 연동 중 어떤 것을 적용했는지 설명해주세요."
          className="resize-y rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="repoUrl" className="text-sm text-muted">
          저장소 URL
        </label>
        <input
          id="repoUrl"
          name="repoUrl"
          type="url"
          required
          defaultValue={initialData?.repo_url ?? ""}
          placeholder="https://github.com/username/project"
          className="rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="skillSummary" className="text-sm text-muted">
          커스텀 스킬 / MCP 연동 요약 (선택)
        </label>
        <textarea
          id="skillSummary"
          name="skillSummary"
          rows={3}
          defaultValue={initialData?.skill_summary ?? ""}
          placeholder="직접 작성한 스킬이나 연동한 MCP 서버가 있다면 간단히 적어주세요."
          className="resize-y rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      {state.error && (
        <p className="rounded-md border border-danger/40 bg-danger/10 px-3.5 py-2.5 text-sm text-danger">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-md border border-success/40 bg-success/10 px-3.5 py-2.5 text-sm text-success">
          제출이 완료되었습니다. 대시보드에서 확인할 수 있습니다.
        </p>
      )}

      <SubmitButton
        pendingText="제출 중..."
        className="self-start rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-strong disabled:opacity-60"
      >
        제출하기
      </SubmitButton>
    </form>
  );
}
