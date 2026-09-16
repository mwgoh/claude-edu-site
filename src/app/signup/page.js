import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata = { title: "회원가입 | Claude Code 완벽 마스터" };

export default async function SignupPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;
  const message = params?.message;

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-20">
      <h1 className="text-2xl font-semibold text-foreground">회원가입</h1>
      <p className="mt-1 text-sm text-muted">
        가입 후 진도 추적과 캡스톤 제출 기능을 이용할 수 있습니다.
      </p>

      {message === "confirm-email" ? (
        <p className="mt-8 rounded-md border border-success/40 bg-success/10 px-3.5 py-3 text-sm text-success">
          가입 확인 이메일을 보냈습니다. 메일함에서 인증 링크를 눌러 가입을
          완료해 주세요.
        </p>
      ) : (
        <form action={signUp} className="mt-8 flex flex-col gap-4">
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
              비밀번호 (8자 이상)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
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
            pendingText="가입 처리 중..."
            className="mt-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent-strong disabled:opacity-60"
          >
            회원가입
          </SubmitButton>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-accent-strong hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
