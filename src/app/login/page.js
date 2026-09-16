import Link from "next/link";
import { signIn } from "@/app/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata = { title: "로그인 | Claude Code 완벽 마스터" };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;
  const next = params?.next || "/dashboard";

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-20">
      <h1 className="text-2xl font-semibold text-foreground">로그인</h1>
      <p className="mt-1 text-sm text-muted">
        진도 대시보드와 캡스톤 제출을 이용하려면 로그인하세요.
      </p>

      <form action={signIn} className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="next" value={next} />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-muted">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm text-muted">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>

        {error && (
          <p className="rounded-md border border-danger/40 bg-danger/10 px-3.5 py-2.5 text-sm text-danger">
            {error}
          </p>
        )}

        <SubmitButton
          pendingText="로그인 중..."
          className="mt-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent-strong disabled:opacity-60"
        >
          로그인
        </SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        아직 계정이 없으신가요?{" "}
        <Link href="/signup" className="text-accent-strong hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
