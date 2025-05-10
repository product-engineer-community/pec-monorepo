# PEC 모노레포

프로덕트 엔지니어 커뮤니티(PEC) 서비스를 위한 모노레포 프로젝트입니다. Feature Sliced Design(FSD) 아키텍처를 기반으로 구축되었습니다.

## 기술 스택

- **패키지 매니저**: pnpm
- **프론트엔드**: Next.js (App Router)
- **디자인시스템**: shadcn
- **스타일링**: Tailwind CSS
- **상태 관리**: React Hooks, fetch(서버 상태)
- **데이터베이스 & 인증**: Supabase
- **모노레포 관리**: Turborepo

## 프로젝트 구조

```
pec-monorepo/
├── apps/
│   └── community/           # 커뮤니티 애플리케이션
│       ├── src/
│       │   ├── app/         # Next.js App Router
│       │   ├── widgets/     # 독립적인 UI 블록(features, entities 들의 조합)
│       │   ├── features/    # CUD(사용자 이벤트 -> 데이터 처리까지 모두 포함)
│       │   ├── entities/    # R, 비즈니스 엔티티
│       │   └── shared/      # 공유 유틸리티 및 UI 컴포넌트
│       └── ...
└── packages/
    ├── supabase/            # Supabase 클라이언트 및 타입
    ├── shared/              # 공유 컴포넌트 및 유틸리티
    ├── auth/                # 인증 관련 기능
    ├── ui/                  # UI 컴포넌트(shadcn)
    ├── env/                 # 환경 변수 관리
    ├── eslint-config/       # ESLint 설정
    └── typescript-config/   # TypeScript 설정
```

### packages 하위

- 기본적으로 shared layer
  - 이때는 @packages/{name} 으로 참조
    - e.g. @packages/supabase
- 특정 packages 는 entities, featrues, widgets 가짐
  - 이때는 @packages/{name}/src/entities 등으로 참조
    - e.g. @packages/auth/src/entities, @packages/point/src/features etc.

## Feature Sliced Design 아키텍처

프로젝트는 Feature Sliced Design 아키텍처를 따릅니다:

1. **계층 구조 원칙**

   - **상향식 의존성**: 상위 계층은 하위 계층에만 의존 가능 (app → widgets → features → entities → shared)
   - **하위 계층 독립성**: 하위 계층은 상위 계층을 알지 못함
   - **수평적 의존성 금지**: 동일 계층 내 다른 슬라이스 간 의존성 불가

2. **계층 설명**

   - **app**: 전통적인 app 레이어와 pages 레이어를 통합한 구조
   - **widgets**: features, entities, shared 컴포넌트를 조합하여 재사용 가능한 UI 블록 구성
   - **features**: 비즈니스 가치를 제공하는 제품 수준의 기능 구현 (C,U,D 작업 포함)
   - **entities**: 핵심 비즈니스 엔티티 표현 및 Read 로직 구현 (읽기 전용)
   - **shared**: 기술적인 의존성과 유틸리티 함수

3. **슬라이스 구조**

```
feature/
├── api/        # 외부 API 통신
├── action/     # serverAction
├── model/      # 비즈니스 로직
├── ui/         # UI 컴포넌트
└── index.ts    # Public API
```

## 주요 기능

- **사용자 인증**: 회원가입, 로그인, 프로필 관리
- **게시글**: 게시글 작성, 조회, 수정, 삭제
- **댓글**: 댓글 작성, 조회, 수정, 삭제
- **좋아요**: 게시글 및 댓글에 좋아요 기능

## 설치 및 실행

1. **저장소 클론**

```bash
git clone https://your-repository-url.git
cd pec-monorepo
```

2. **의존성 설치**

```bash
pnpm install
```

3. **환경 변수 설정**

```bash
# apps/community/.env.local 파일 생성
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. **개발 서버 실행**

```bash
pnpm dev
```

## 서버 컴포넌트 및 클라이언트 컴포넌트 가이드라인

### 서버 컴포넌트 우선 원칙

- 명시적인 클라이언트 요구사항이 없으면 서버 컴포넌트로 구현
- 모든 API 호출과 데이터 로딩은 서버 컴포넌트나 서버 액션으로 구현
- 클라이언트 컴포넌트 파일 최상단에 'use client' 지시문 추가
- 데이터 변환, 필터링, 정렬 등 무거운 계산 작업은 서버에서 수행

### 클라이언트 컴포넌트 제한적 사용

- UI 렌더링, 브라우저 API, 사용자 이벤트 처리에만 사용
- 임시 상태(form 입력, UI 토글 등)만 관리
- 번들 크기 최소화를 위해 서버 컴포넌트 내부에 깊이 배치
- 불필요한 글로벌 상태 사용 자제

## Supabase 개발 가이드라인

- `getSupabaseServerClient()` 함수를 사용하여 Supabase 클라이언트 초기화
- `@packages/supabase`를 활용
- 재사용을 위해 단일 Supabase 클라이언트 인스턴스 생성 및 내보내기

## 빌드

**빌드**

```bash
pnpm build
```

## 유용한 링크

- [Feature Sliced Design 공식 문서](https://feature-sliced.design/)
- [Next.js 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Turborepo 문서](https://turbo.build/repo/docs)
