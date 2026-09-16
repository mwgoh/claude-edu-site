"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function submitCapstone(prevState, formData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    return { error: "로그인이 필요합니다.", success: false };
  }

  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const repoUrl = formData.get("repoUrl")?.toString().trim();
  const skillSummary = formData.get("skillSummary")?.toString().trim() || null;

  if (!title || !description || !repoUrl) {
    return { error: "제목, 설명, 저장소 URL은 필수 입력 항목입니다.", success: false };
  }

  const { error } = await supabase.from("capstone_submissions").upsert(
    {
      user_id: claims.sub,
      title,
      description,
      repo_url: repoUrl,
      skill_summary: skillSummary,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    return { error: error.message, success: false };
  }

  revalidatePath("/capstone");
  revalidatePath("/dashboard");

  return { error: null, success: true };
}
