import fs from "node:fs";
import path from "node:path";
import { Markdown } from "@/components/Markdown";

export const metadata = { title: "치트시트 | Claude Code 완벽 마스터" };

function readDownload(filename) {
  return fs.readFileSync(
    path.join(process.cwd(), "public", "downloads", filename),
    "utf-8"
  );
}

export default function CheatsheetPage() {
  const claudeMdTemplate = readDownload("CLAUDE.md.template.md");
  const commandCheatsheet = readDownload("claude-code-cheatsheet.md");

  const resources = [
    {
      title: "CLAUDE.md 표준 템플릿",
      description:
        "프로젝트 규칙, 아키텍처, 코딩 컨벤션을 Claude Code에게 전달하기 위한 표준 템플릿입니다.",
      file: "CLAUDE.md.template.md",
      content: claudeMdTemplate,
    },
    {
      title: "명령어 치트시트",
      description:
        "설치, 슬래시 명령어, Git 연동, 플러그인까지 자주 쓰는 명령어를 한 장으로 정리했습니다.",
      file: "claude-code-cheatsheet.md",
      content: commandCheatsheet,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs text-accent-strong">Cheat Sheet</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">
        치트시트 & 템플릿
      </h1>
      <p className="mt-3 text-muted">
        아래 두 문서는 그대로 다운로드해 여러분의 프로젝트에 바로 적용할 수
        있습니다.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {resources.map((resource) => (
          <div
            key={resource.file}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {resource.title}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {resource.description}
                </p>
              </div>
              <a
                href={`/downloads/${resource.file}`}
                download
                className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-strong"
              >
                다운로드 (.md)
              </a>
            </div>
            <div className="mt-5 max-h-96 overflow-y-auto rounded-md border border-border bg-background p-4">
              <Markdown>{resource.content}</Markdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
