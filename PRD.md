제시해주신 내용을 바탕으로 **Claude Code 완벽 마스터 교육 플랫폼** 구성을 위한 **PRD(제품 요구사항 정의서)** 표준 양식을 작성했습니다.

실제 제품 개발 및 Google Drive 문서 생성이 필요하시면 생성해 드릴 수 있으니 편하게 말씀해 주세요.

---

# 📄 Product Requirement Document (PRD)

## 1. 문서 개요 (Document Overview)

* **제품명:** Claude Code 완벽 마스터 (Claude Code Mastery Learning Platform)
* **작성일:** 2026년 9월 16일
* **문서 버전:** v1.0
* **작성자:** AI Product Manager

---

## 2. 제품 비전 및 목적 (Vision & Purpose)

* **비전:** 개발자가 CLI 환경에서 AI 에이전트인 Claude Code를 완벽히 통제하고, 실무 개발 워크플로우를 자동화할 수 있도록 지원하는 최고의 실무 중심 AI 교육 플랫폼 구축
* **목적:**
* 단순 이론 교육을 넘어 터미널 환경 중심의 실습형 교육 인터페이스 제공
* 기초 사용법부터 커스텀 스킬 작성 및 MCP(Model Context Protocol) 연동까지의 단계별 학습 경로 확립



---

## 3. 타겟 사용자 (Target Audience)

1. **소프트웨어 개발자 (Backend/Frontend/Full-stack):** AI 페어 프로그래밍 및 코드 리팩토링/디버깅 생산성 증대를 원하는 개발자
2. **DevOps / SRE 엔지니어:** CLI 기반 배포 스크립트 작성, 자동화 및 시스템 환경 관리를 원하는 엔지니어
3. **AI 에이전트 활용 희망자:** MCP 및 플러그인을 활용해 업무 특화 맞춤형 도구를 구축하고자 하는 기술자

---

## 4. 핵심 기능 요구사항 (Core Functional Requirements)

### 4.1. 교육 커리큘럼 및 콘텐츠 시스템

* **모듈 1: 입문 및 환경 구축**
* Claude Desktop과 Claude Code(CLI) 차이점 설명 지원
* CLI 도구 설치(`npm install -g @anthropic-ai/claude-code`) 및 키 인증 가이드
* 슬래시 명령어(`/help`, `/compact`, `/clear`) 및 보안/권한 제어 모드 학습 가이드


* **모듈 2: 코드베이스 탐색 및 대화 기술**
* `CLAUDE.md` 컨텍스트 설정 파일 표준 템플릿 제공
* 코드베이스 탐색 프롬프트 패턴 및 세션 압축 방식 가이드


* **모듈 3: 코드 수정, 디버깅 및 리팩토링**
* 이슈 디버깅, 멀티 파일 리팩토링, 단위 테스트 작성 및 CLI 기반 검증 실습


* **모듈 4: Git 연동 및 워크플로우 자동화**
* Git 커밋 메시지/PR 설명 작성 자동화, Diff 기반 코드 리뷰, 브랜치 제어 학습


* **모듈 5: 플러그인, 스킬 및 MCP 확장**
* 커스텀 스킬 및 플러그인(`claude plugins`) 활용법
* Slack, Notion, GitHub 등 MCP 연동 및 캡스톤 프로젝트 수행 지원



### 4.2. 학습용 인터렉티브 및 보조 기능 (Educational Enhancements)

1. **Interactive CLI Simulator (웹 시뮬레이터)**
* 별도 CLI 설치 없이 웹 브라우저에서 Claude Code 주요 명령어 모의 실행 인터페이스 제공


2. **Cheat Sheet 및 템플릿 다운로드**
* 프로젝트 규칙 정의용 `CLAUDE.md` 표준 예시 및 명령어 요약집 PDF/Markdown 제공


3. **실습용 Git Repository 연동**
* 의도적 버그, 리팩토링 대상 코드, 미완성 테스트가 포함된 실습용 스타터 코드 저장소 링크 연동



---

## 5. 유저 워크플로우 (User Workflow)

1. **대시보드 접속 및 진단:** 사용자가 코스 진도표 확인 및 스타터 코드 Repository 복제
2. **이론 및 웹 시뮬레이션:** 개념 학습 후 웹 시뮬레이터를 통해 슬래시 명령어 실습
3. **로컬 환경 실습:** 본인 터미널 환경에서 실습 프로젝트 진행 (디버깅, PR 작성, MCP 연동)
4. **캡스톤 프로젝트 제출:** 5모듈 종료 후 커스텀 스킬 및 워크플로우 결과물 제출

---

## 6. 성공 지표 (Key Success Metrics)

* **완강률 (Course Completion Rate):** 전체 등록 수강생 중 캡스톤 프로젝트 제출 비율 65% 이상
* **시뮬레이터 참여도:** 수강생당 웹 CLI 시뮬레이터 평균 사용 횟수 5회 이상
* **수강생 만족도 (NPS):** 코스 평가 점수 4.5 / 5.0 이상

---

위 PRD 내용으로 **Google Doc 문서**를 직접 생성해 드리거나 내용 수정을 원하시면 언제든 요청해 주세요.