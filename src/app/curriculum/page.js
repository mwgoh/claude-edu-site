import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "커리큘럼 | Claude Code 완벽 마스터" };

export default async function CurriculumPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  let completedSet = new Set();
  if (claims) {
    const { data } = await supabase
      .from("lesson_progress")
      .select("module_slug, lesson_slug")
      .eq("user_id", claims.sub);
    completedSet = new Set(
      (data ?? []).map((row) => `${row.module_slug}/${row.lesson_slug}`)
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs text-accent-strong">Curriculum</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">
        전체 커리큘럼
      </h1>
      <p className="mt-3 text-muted">
        입문 환경 구축부터 플러그인·MCP 확장까지, 5개 모듈을 순서대로
        진행하는 것을 권장합니다.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {curriculum.map((module) => {
          const completedInModule = module.lessons.filter((lesson) =>
            completedSet.has(`${module.slug}/${lesson.slug}`)
          ).length;

          return (
            <div
              key={module.slug}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-xs text-accent">
                    MODULE {String(module.order).padStart(2, "0")}
                  </span>
                  <h2 className="mt-1 text-xl font-semibold text-foreground">
                    {module.title}
                  </h2>
                </div>
                {claims && (
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {completedInModule}/{module.lessons.length} 완료
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted">{module.goal}</p>

              <ul className="mt-5 flex flex-col gap-2">
                {module.lessons.map((lesson) => {
                  const done = completedSet.has(
                    `${module.slug}/${lesson.slug}`
                  );
                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={`/curriculum/${module.slug}/${lesson.slug}`}
                        className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition hover:bg-surface-raised"
                      >
                        <span className="flex items-center gap-2 text-foreground">
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                              done
                                ? "border-success bg-success/20 text-success"
                                : "border-border text-transparent"
                            }`}
                          >
                            ✓
                          </span>
                          {lesson.order}. {lesson.title}
                        </span>
                        <span className="shrink-0 text-xs text-muted">
                          {lesson.duration}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Link
                href={`/curriculum/${module.slug}`}
                className="mt-4 inline-block text-sm text-accent-strong hover:underline"
              >
                모듈 개요 보기 →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
