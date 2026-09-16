import Link from "next/link";
import { notFound } from "next/navigation";
import {
  curriculum,
  getLesson,
  getAdjacentLessons,
} from "@/data/curriculum";
import { createClient } from "@/lib/supabase/server";
import { Markdown } from "@/components/Markdown";
import { MarkCompleteButton } from "@/components/MarkCompleteButton";

export function generateStaticParams() {
  return curriculum.flatMap((module) =>
    module.lessons.map((lesson) => ({
      moduleSlug: module.slug,
      lessonSlug: lesson.slug,
    }))
  );
}

export async function generateMetadata({ params }) {
  const { moduleSlug, lessonSlug } = await params;
  const found = getLesson(moduleSlug, lessonSlug);
  return {
    title: found
      ? `${found.lesson.title} | Claude Code 완벽 마스터`
      : "레슨을 찾을 수 없음",
  };
}

export default async function LessonPage({ params }) {
  const { moduleSlug, lessonSlug } = await params;
  const found = getLesson(moduleSlug, lessonSlug);
  if (!found) notFound();
  const { module, lesson } = found;

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  let initialDone = false;
  if (claims) {
    const { data } = await supabase
      .from("lesson_progress")
      .select("lesson_slug")
      .eq("user_id", claims.sub)
      .eq("module_slug", moduleSlug)
      .eq("lesson_slug", lessonSlug)
      .maybeSingle();
    initialDone = Boolean(data);
  }

  const { previous, next } = getAdjacentLessons(moduleSlug, lessonSlug);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[240px_1fr]">
      <aside className="order-2 lg:order-1">
        <div className="lg:sticky lg:top-24">
          <Link
            href="/curriculum"
            className="text-sm text-muted hover:text-foreground"
          >
            ← 전체 커리큘럼
          </Link>
          <p className="mt-4 font-mono text-xs text-accent">
            MODULE {String(module.order).padStart(2, "0")}
          </p>
          <p className="text-sm font-semibold text-foreground">
            {module.title}
          </p>
          <ol className="mt-4 flex flex-col gap-1 border-l border-border pl-3">
            {module.lessons.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/curriculum/${module.slug}/${l.slug}`}
                  className={`block rounded px-2 py-1.5 text-sm transition ${
                    l.slug === lessonSlug
                      ? "bg-accent-soft text-accent-strong"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {l.order}. {l.title}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <div className="order-1 min-w-0 lg:order-2">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent-strong">
              {lesson.duration}
            </p>
            <h1 className="mt-1 text-3xl font-bold text-foreground">
              {lesson.title}
            </h1>
            <p className="mt-2 text-muted">{lesson.summary}</p>
          </div>
          {claims ? (
            <MarkCompleteButton
              moduleSlug={moduleSlug}
              lessonSlug={lessonSlug}
              initialDone={initialDone}
            />
          ) : (
            <Link
              href={`/login?next=/curriculum/${moduleSlug}/${lessonSlug}`}
              className="shrink-0 rounded-md border border-border px-4 py-2 text-sm text-muted hover:border-accent hover:text-accent-strong"
            >
              로그인하고 진도 저장하기
            </Link>
          )}
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <Markdown>{lesson.content}</Markdown>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6 text-sm">
          {previous ? (
            <Link
              href={`/curriculum/${previous.moduleSlug}/${previous.slug}`}
              className="text-muted hover:text-foreground"
            >
              ← {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/curriculum/${next.moduleSlug}/${next.slug}`}
              className="text-accent-strong hover:underline"
            >
              {next.title} →
            </Link>
          ) : (
            <Link href="/capstone" className="text-accent-strong hover:underline">
              캡스톤 제출하러 가기 →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
