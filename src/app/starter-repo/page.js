import Link from "next/link";

export const metadata = { title: "실습용 Git 저장소 | Claude Code 완벽 마스터" };

export default function StarterRepoPage() {
  const repoUrl = process.env.NEXT_PUBLIC_STARTER_REPO_URL;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs text-accent-strong">Starter Repository</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">
        실습용 Git 저장소
      </h1>
      <p className="mt-3 text-muted">
        모듈 3(디버깅·리팩토링·테스트)과 모듈 4(Git 워크플로우)는 의도적인
        버그와 미완성 테스트가 포함된 스타터 코드에서 진행하는 것을
        권장합니다.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-foreground">저장소 복제</h2>
        {repoUrl ? (
          <>
            <p className="mt-2 text-sm text-muted">
              아래 명령으로 실습용 저장소를 로컬에 복제하세요.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-[#0a0c0f] p-4 font-mono text-sm text-[#c9d1d9]">
              <code>{`git clone ${repoUrl}\ncd $(basename ${repoUrl} .git)\nclaude`}</code>
            </pre>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-block text-sm text-accent-strong hover:underline"
            >
              저장소 바로가기 →
            </a>
          </>
        ) : (
          <p className="mt-2 text-sm text-muted">
            아직 실습용 저장소 URL이 설정되지 않았습니다. 운영자가{" "}
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">
              NEXT_PUBLIC_STARTER_REPO_URL
            </code>{" "}
            환경 변수에 실제 GitHub 저장소 주소를 등록하면 이 페이지에
            복제 명령이 표시됩니다.
          </p>
        )}
      </div>

      <div className="mt-6 rounded-lg border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-foreground">
          저장소에 포함되어야 할 것
        </h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-muted marker:text-accent">
          <li>의도적으로 삽입된 버그 1~2개 (모듈 3 디버깅 실습용)</li>
          <li>리팩토링 대상이 되는 중복 코드 또는 어색한 함수 시그니처</li>
          <li>일부만 작성되어 있거나 실패하는 테스트 케이스</li>
          <li>표준 <code className="rounded bg-background px-1 py-0.5">CLAUDE.md</code> 예시 (모듈 2 학습 내용 참고)</li>
        </ul>
      </div>

      <p className="mt-8 text-sm text-muted">
        <Link href="/cheatsheet" className="text-accent-strong hover:underline">
          치트시트 페이지
        </Link>
        에서 다운로드한 CLAUDE.md 템플릿을 저장소 루트에 두고 실습을
        시작하세요.
      </p>
    </div>
  );
}
