import Link from "next/link";
import { curriculum, totalLessonCount } from "@/data/curriculum";

const FEATURES = [
  {
    title: "인터랙티브 CLI 시뮬레이터",
    description:
      "설치 없이 브라우저에서 Claude Code의 슬래시 명령어와 대화 흐름을 미리 체험합니다.",
    href: "/simulator",
    icon: `>_`,
  },
  {
    title: "CLAUDE.md 템플릿 & 치트시트",
    description:
      "프로젝트 규칙 정의용 표준 템플릿과 필수 명령어 요약집을 바로 다운로드합니다.",
    href: "/cheatsheet",
    icon: "☰",
  },
  {
    title: "실습용 Git 저장소",
    description:
      "의도적 버그와 미완성 테스트가 포함된 스타터 코드로 실전처럼 연습합니다.",
    href: "/starter-repo",
    icon: "⌥",
  },
];

const WORKFLOW = [
  {
    step: "01",
    title: "대시보드 접속 및 진단",
    description: "코스 진도표를 확인하고 실습용 저장소를 내 로컬에 복제합니다.",
  },
  {
    step: "02",
    title: "이론 학습 & 웹 시뮬레이션",
    description: "모듈별 개념을 학습한 뒤 웹 CLI 시뮬레이터로 명령어를 연습합니다.",
  },
  {
    step: "03",
    title: "로컬 환경 실습",
    description: "본인 터미널에서 디버깅, PR 작성, MCP 연동 등 실전 과제를 수행합니다.",
  },
  {
    step: "04",
    title: "캡스톤 프로젝트 제출",
    description: "5개 모듈을 마친 뒤 커스텀 스킬과 워크플로우 결과물을 제출합니다.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24">
          <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-accent-strong">
            claude-code-mastery / v1.0
          </span>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            터미널에서 시작하는 AI 페어 프로그래밍,{" "}
            <span className="text-accent-strong">Claude Code 완벽 마스터</span>
          </h1>
          <p className="max-w-xl text-lg text-muted">
            설치부터 커스텀 스킬·MCP 연동까지, 실무 개발 워크플로우를
            자동화하는 방법을 5개 모듈 {totalLessonCount}개 레슨으로
            단계별로 익힙니다.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/curriculum"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-strong"
            >
              커리큘럼 살펴보기
            </Link>
            <Link
              href="/simulator"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-accent"
            >
              CLI 시뮬레이터 체험하기
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl font-semibold text-foreground">
            5개 모듈, {totalLessonCount}개 레슨
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            입문 환경 구축부터 플러그인·MCP 확장까지, 실무 워크플로우 순서
            그대로 학습합니다.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curriculum.map((module) => (
              <Link
                key={module.slug}
                href={`/curriculum/${module.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
              >
                <span className="font-mono text-xs text-accent">
                  MODULE {String(module.order).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-foreground group-hover:text-accent-strong">
                  {module.title}
                </h3>
                <p className="text-sm text-muted">{module.goal}</p>
                <span className="mt-auto text-xs text-muted">
                  {module.lessons.length}개 레슨
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl font-semibold text-foreground">
            학습을 돕는 인터랙티브 기능
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft font-mono text-accent-strong">
                  {feature.icon}
                </span>
                <h3 className="text-base font-semibold text-foreground group-hover:text-accent-strong">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl font-semibold text-foreground">
            학습 워크플로우
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW.map((item) => (
              <div key={item.step} className="flex flex-col gap-2">
                <span className="font-mono text-2xl font-bold text-accent-soft">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-start gap-4 rounded-lg border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                지금 바로 첫 모듈을 시작해보세요
              </h3>
              <p className="mt-1 text-sm text-muted">
                회원가입 없이도 커리큘럼과 시뮬레이터를 자유롭게 둘러볼 수
                있습니다.
              </p>
            </div>
            <Link
              href={`/curriculum/${curriculum[0].slug}`}
              className="shrink-0 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-strong"
            >
              모듈 1 시작하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
