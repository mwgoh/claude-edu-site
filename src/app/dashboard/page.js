import Link from "next/link";
import { redirect } from "next/navigation";
import { curriculum, totalLessonCount } from "@/data/curriculum";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "대시보드 | Claude Code 완벽 마스터" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect("/login?next=/dashboard");
  }

  const [{ data: progressRows }, { data: capstone }] = await Promise.all([
    supabase
      .from("lesson_progress")
      .select("module_slug, lesson_slug")
      .eq("user_id", claims.sub),
    supabase
      .from("capstone_submissions")
      .select("title, repo_url, updated_at")
      .eq("user_id", claims.sub)
      .maybeSingle(),
  ]);

  const completedSet = new Set(
    (progressRows ?? []).map((row) => `${row.module_slug}/${row.lesson_slug}`)
  );
  const completedCount = completedSet.size;
  const overallPercent = Math.round((completedCount / totalLessonCount) * 100);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs text-accent-strong">Dashboard</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">
        {claims.email}님의 진도
      </h1>

      <div className="mt-8 rounded-lg border border-border bg-surface p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground">전체 진행률</span>
          <span className="font-mono text-accent-strong">
            {completedCount}/{totalLessonCount} ({overallPercent}%)
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-raised">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {curriculum.map((module) => {
          const doneInModule = module.lessons.filter((lesson) =>
            completedSet.has(`${module.slug}/${lesson.slug}`)
          ).length;
          const percent = Math.round(
            (doneInModule / module.lessons.length) * 100
          );

          return (
            <Link
              key={module.slug}
              href={`/curriculum/${module.slug}`}
              className="rounded-lg border border-border bg-surface p-5 transition hover:border-accent"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">
                  {module.title}
                </span>
                <span className="font-mono text-xs text-muted">
                  {doneInModule}/{module.lessons.length}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-raised">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 rounded-lg border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-foreground">
          캡스톤 프로젝트
        </h2>
        {capstone ? (
          <div className="mt-3 text-sm">
            <p className="text-foreground">
              제출됨: <span className="font-medium">{capstone.title}</span>
            </p>
            <a
              href={capstone.repo_url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 inline-block text-accent-strong hover:underline"
            >
              저장소 보기 →
            </a>
            <p className="mt-2 text-xs text-muted">
              최종 수정: {new Date(capstone.updated_at).toLocaleString("ko-KR")}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted">
            아직 캡스톤 프로젝트를 제출하지 않았습니다.
          </p>
        )}
        <Link
          href="/capstone"
          className="mt-4 inline-block rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong"
        >
          {capstone ? "제출 내용 수정하기" : "캡스톤 제출하기"}
        </Link>
      </div>
    </div>
  );
}
