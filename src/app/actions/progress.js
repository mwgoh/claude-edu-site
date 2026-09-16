"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleLessonComplete(formData) {
  const moduleSlug = formData.get("moduleSlug");
  const lessonSlug = formData.get("lessonSlug");
  const nextState = formData.get("nextState");

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    return { error: "로그인이 필요합니다." };
  }

  if (nextState === "complete") {
    const { error } = await supabase.from("lesson_progress").upsert(
      {
        user_id: claims.sub,
        module_slug: moduleSlug,
        lesson_slug: lessonSlug,
      },
      { onConflict: "user_id,module_slug,lesson_slug" }
    );
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from("lesson_progress")
      .delete()
      .eq("user_id", claims.sub)
      .eq("module_slug", moduleSlug)
      .eq("lesson_slug", lessonSlug);
    if (error) return { error: error.message };
  }

  revalidatePath(`/curriculum/${moduleSlug}/${lessonSlug}`);
  revalidatePath(`/curriculum/${moduleSlug}`);
  revalidatePath("/curriculum");
  revalidatePath("/dashboard");

  return { error: null };
}
