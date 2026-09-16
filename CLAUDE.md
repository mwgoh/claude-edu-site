# 프로젝트 개요

Claude Code 완벽 마스터 — 터미널 기반 AI 에이전트 Claude Code를 기초부터 MCP 연동까지
단계별로 가르치는 실무 중심 교육 플랫폼. PRD.md, EDU.md 참고.

- 스택: Next.js 16 (App Router, src 디렉터리) + React 19 + Tailwind CSS v4 + Supabase (Auth/DB)
- 언어: JavaScript (jsconfig.json, TypeScript 아님)
- Next.js 16에서 middleware.js는 proxy.js로 이름이 바뀌었다. `src/proxy.js`가 그 역할을 한다.

# 개발 명령어

- 개발 서버: `npm run dev`
- 빌드: `npm run build`
- 린트: `npm run lint`

# 아키텍처

- `src/data/curriculum.js` — 5모듈 커리큘럼 콘텐츠(한국어 마크다운)의 단일 소스
- `src/lib/supabase/{client,server,proxy}.js` — Supabase SSR 클라이언트 (공식 `@supabase/ssr` getAll/setAll 쿠키 패턴, `getClaims()` 기반 인증 확인)
- `src/proxy.js` — 인증이 필요한 `/dashboard`, `/capstone` 경로를 보호하는 프록시(구 미들웨어)
- `src/app/actions/*.js` — 서버 액션 (auth, progress, capstone)
- `supabase/schema.sql` — `lesson_progress`, `capstone_submissions` 테이블 + RLS 정책. Supabase SQL Editor에서 직접 실행

# 코딩 규칙

- UI 텍스트는 한국어, 코드 식별자·명령어는 영문 유지
- Supabase 키는 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`(신규) 또는 `NEXT_PUBLIC_SUPABASE_ANON_KEY`(기존 프로젝트) 중 하나만 있으면 됨 — `src/lib/supabase/env.js`에서 폴백 처리
- 외부에 흔적을 남기는 작업(커밋, 푸시, 삭제)은 반드시 사용자 승인 후 진행 — 이 사이트의 교육 내용과 동일한 원칙 적용
