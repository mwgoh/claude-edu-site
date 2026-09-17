import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/curriculum", label: "커리큘럼" },
  { href: "/simulator", label: "CLI 시뮬레이터" },
  { href: "/cheatsheet", label: "치트시트" },
  { href: "/starter-repo", label: "실습 저장소" },
];

export default async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-sm font-bold text-white">
            {`>_`}
          </span>
          <span className="font-semibold text-foreground">
            Claude Code 완벽 마스터
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {claims ? (
            <>
              <Link
                href="/dashboard"
                className="hidden text-sm text-muted transition hover:text-foreground sm:inline"
              >
                대시보드
              </Link>
              <Link
                href="/capstone"
                className="hidden text-sm text-muted transition hover:text-foreground sm:inline"
              >
                캡스톤 제출
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-md border border-border px-3.5 py-1.5 text-sm text-foreground transition hover:border-accent hover:text-accent-strong"
                >
                  로그아웃
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-muted transition hover:text-foreground"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-accent px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-accent-strong"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className="flex items-center gap-4 overflow-x-auto border-t border-border px-6 py-2 md:hidden">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 text-sm text-muted transition hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
