import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Claude Code 완벽 마스터 · 실무 중심 AI 페어 프로그래밍 교육</p>
        <div className="flex gap-5">
          <Link href="/curriculum" className="hover:text-foreground">
            커리큘럼
          </Link>
          <Link href="/cheatsheet" className="hover:text-foreground">
            치트시트
          </Link>
          <Link href="/starter-repo" className="hover:text-foreground">
            실습 저장소
          </Link>
        </div>
      </div>
    </footer>
  );
}
