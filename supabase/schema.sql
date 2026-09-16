-- Claude Code 완벽 마스터 교육 플랫폼 - 데이터베이스 스키마
-- Supabase SQL Editor에서 이 파일 전체를 실행하세요.

-- 1) 레슨 진도 테이블
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  module_slug text not null,
  lesson_slug text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, module_slug, lesson_slug)
);

alter table public.lesson_progress enable row level security;

create policy "사용자는 자신의 진도만 조회 가능"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "사용자는 자신의 진도만 추가 가능"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "사용자는 자신의 진도만 삭제 가능"
  on public.lesson_progress for delete
  using (auth.uid() = user_id);

-- 2) 캡스톤 프로젝트 제출 테이블 (사용자당 1건, 재제출 시 갱신)
create table if not exists public.capstone_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  title text not null,
  description text not null,
  repo_url text not null,
  skill_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.capstone_submissions enable row level security;

create policy "사용자는 자신의 제출만 조회 가능"
  on public.capstone_submissions for select
  using (auth.uid() = user_id);

create policy "사용자는 자신의 제출만 생성 가능"
  on public.capstone_submissions for insert
  with check (auth.uid() = user_id);

create policy "사용자는 자신의 제출만 수정 가능"
  on public.capstone_submissions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "사용자는 자신의 제출만 삭제 가능"
  on public.capstone_submissions for delete
  using (auth.uid() = user_id);
