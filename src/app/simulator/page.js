import { CliSimulator } from "@/components/CliSimulator";

export const metadata = { title: "CLI 시뮬레이터 | Claude Code 완벽 마스터" };

export default function SimulatorPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono text-xs text-accent-strong">Interactive Simulator</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">
        CLI 시뮬레이터
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        설치 없이 브라우저에서 Claude Code의 기본 흐름을 미리 체험해보세요.
        <code className="mx-1 rounded bg-surface px-1.5 py-0.5 font-mono text-xs text-accent-strong">
          claude
        </code>
        를 입력해 세션에 진입한 뒤, <code className="mx-1 rounded bg-surface px-1.5 py-0.5 font-mono text-xs text-accent-strong">/help</code>
        로 사용 가능한 명령어를 확인할 수 있습니다.
      </p>

      <div className="mt-8">
        <CliSimulator />
      </div>

      <p className="mt-6 text-xs text-muted">
        * 이 시뮬레이터는 실제 Claude API를 호출하지 않는 교육용 모형입니다.
        실제 동작은 로컬 환경에{" "}
        <code className="rounded bg-surface px-1 py-0.5">
          npm install -g @anthropic-ai/claude-code
        </code>
        를 설치한 뒤 확인할 수 있습니다.
      </p>
    </div>
  );
}
