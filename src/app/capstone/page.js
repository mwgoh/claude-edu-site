import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CapstoneForm } from "@/components/CapstoneForm";

export const metadata = { title: "캡스톤 프로젝트 제출 | Claude Code 완벽 마스터" };

export default async function CapstonePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect("/login?next=/capstone");
  }

  const { data: existing } = await supabase
    .from("capstone_submissions")
    .select("title, description, repo_url, skill_summary")
    .eq("user_id", claims.sub)
    .maybeSingle();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs text-accent-strong">Capstone Project</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">
        캡스톤 프로젝트 제출
      </h1>
      <p className="mt-3 text-muted">
        모듈 5.4에서 안내한 요건에 따라 프로젝트 개요, 적용한 워크플로우,
        저장소 링크를 제출해주세요. 재제출 시 기존 내용이 갱신됩니다.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-surface p-6">
        <CapstoneForm initialData={existing} />
      </div>
    </div>
  );
}
