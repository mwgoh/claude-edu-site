import Link from "next/link";

export const metadata = { title: "오류 | Claude Code 완벽 마스터" };

export default function ErrorPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm text-accent">Error</p>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">
        인증 처리 중 문제가 발생했습니다
      </h1>
      <p className="mt-3 text-sm text-muted">
        이메일 인증 링크가 만료되었거나 이미 사용되었을 수 있습니다. 다시
        로그인을 시도해 주세요.
      </p>
      <Link
        href="/login"
        className="mt-6 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-strong"
      >
        로그인 페이지로 이동
      </Link>
    </div>
  );
}
