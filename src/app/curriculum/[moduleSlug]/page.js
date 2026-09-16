import Link from "next/link";
import { notFound } from "next/navigation";
import { curriculum, getModuleBySlug } from "@/data/curriculum";
import { createClient } from "@/lib/supabase/server";

export function generateStaticParams() {
  return curriculum.map((courseModule) => ({ moduleSlug: courseModule.slug }));
}

export async function generateMetadata({ params }) {
  const { moduleSlug } = await params;
  const courseModule = getModuleBySlug(moduleSlug);
  return {
    title: courseModule
      ? `${courseModule.title} | Claude Code 완벽 마스터`
      : "모듈을 찾을 수 없음",
  };
}

export default async function ModulePage({ params }) {
  const { moduleSlug } = await params;
  const courseModule = getModuleBySlug(moduleSlug);
  if (!courseModule) notFound();

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  let completedSet = new Set();
  if (claims) {
    const { data } = await supabase
      .from("lesson_progress")
      .select("lesson_slug")
      .eq("user_id", claims.sub)
      .eq("module_slug", courseModule.slug);
    completedSet = new Set((data ?? []).map((row) => row.lesson_slug));
  }

  const moduleIndex = curriculum.findIndex((m) => m.slug === courseModule.slug);
  const prevModule = curriculum[moduleIndex - 1];
  const nextModule = curriculum[moduleIndex + 1];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/curriculum" className="text-sm text-muted hover:text-foreground">
        ← 전체 커리큘럼
      </Link>

      <span className="mt-4 block font-mono text-xs text-accent">
        MODULE {String(courseModule.order).padStart(2, "0")}
      </span>
      <h1 className="mt-1 text-3xl font-bold text-foreground">
        {courseModule.title}
      </h1>
      <p className="mt-3 text-muted">{courseModule.goal}</p>

      <ol className="mt-10 flex flex-col gap-3">
        {courseModule.lessons.map((lesson) => {
          const done = completedSet.has(lesson.slug);
          return (
            <li key={lesson.slug}>
              <Link
                href={`/curriculum/${courseModule.slug}/${lesson.slug}`}
                className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4 transition hover:border-accent"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${
                      done
                        ? "border-success bg-success/20 text-success"
                        : "border-border text-muted"
                    }`}
                  >
                    {done ? "✓" : lesson.order}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-muted">{lesson.summary}</p>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-muted">
                  {lesson.duration}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 flex items-center justify-between border-t border-border pt-6 text-sm">
        {prevModule ? (
          <Link
            href={`/curriculum/${prevModule.slug}`}
            className="text-muted hover:text-foreground"
          >
            ← {prevModule.title}
          </Link>
        ) : (
          <span />
        )}
        {nextModule && (
          <Link
            href={`/curriculum/${nextModule.slug}`}
            className="text-accent-strong hover:underline"
          >
            {nextModule.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
