# Claude Code 완벽 마스터

터미널 기반 AI 에이전트 **Claude Code**를 기초 사용법부터 커스텀 스킬·MCP 연동까지
단계별로 익히는 실무 중심 교육 플랫폼입니다. 자세한 요구사항은 [PRD.md](./PRD.md),
커리큘럼 원안은 [EDU.md](./EDU.md)를 참고하세요.

## 기술 스택

- **Next.js 16** (App Router, `src/` 디렉터리) + React 19
- **Tailwind CSS v4**
- **Supabase** (이메일/비밀번호 인증, 진도 추적, 캡스톤 제출 저장)

## 시작하기

### 1. 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 2. Supabase 프로젝트 연결

1. [supabase.com](https://supabase.com)에서 새 프로젝트를 만듭니다.
2. `.env.example`을 복사해 `.env.local`을 만들고, 프로젝트의 URL과 키를 채워 넣습니다.

   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

   Project Settings → API 메뉴에서 URL과 키(Publishable key 또는 anon public key 중 하나)를
   확인할 수 있습니다.

3. Supabase SQL Editor에서 [`supabase/schema.sql`](./supabase/schema.sql) 파일의 내용을
   그대로 실행해 `lesson_progress`, `capstone_submissions` 테이블과 RLS 정책을 생성합니다.
4. Authentication → Email 설정에서 이메일 확인(Confirm email) 여부를 프로젝트 정책에 맞게
   설정합니다. 확인 메일의 리디렉션 경로는 `/auth/confirm`입니다.

### 3. 실습용 Git 저장소 연결 (선택)

`.env.local`의 `NEXT_PUBLIC_STARTER_REPO_URL`에 의도적인 버그와 미완성 테스트가 포함된
실습용 저장소 URL을 등록하면 `/starter-repo` 페이지에 복제 명령이 표시됩니다. 값을 비워두면
안내 문구만 표시됩니다.

### 4. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

http://localhost:3000 에서 확인할 수 있습니다.

## 주요 디렉터리

\`\`\`
src/app/                커리큘럼, 시뮬레이터, 치트시트, 대시보드, 캡스톤 등 페이지
src/app/actions/        서버 액션 (인증 · 진도 · 캡스톤 제출)
src/components/         Header, CLI 시뮬레이터, 진도 버튼 등 UI 컴포넌트
src/data/curriculum.js  5모듈 커리큘럼 콘텐츠 (한국어 마크다운)
src/lib/supabase/       Supabase 클라이언트 (browser / server / proxy)
supabase/schema.sql     데이터베이스 스키마 및 RLS 정책
public/downloads/       치트시트 · CLAUDE.md 템플릿 다운로드 파일
\`\`\`

## 참고 사항

- Next.js 16부터 `middleware.js`는 `proxy.js`로 이름이 바뀌었습니다. 이 저장소에서는
  `src/proxy.js`가 `/dashboard`, `/capstone` 접근을 보호합니다.
- CLI 시뮬레이터(`/simulator`)는 실제 Claude API를 호출하지 않는 학습용 모형입니다.
