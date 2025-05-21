# PEC 모노레포

프로덕트 엔지니어 커뮤니티(PEC) 서비스를 위한 모노레포 프로젝트입니다. Feature Sliced Design(FSD) 아키텍처를 기반으로 구축되었습니다.

## 기술 스택

- **패키지 매니저**: pnpm - 역할: 프로젝트 의존성 관리. 선택 이유: 빠른 속도와 효율적인 디스크 공간 사용.
- **프론트엔드**: Next.js (App Router) - 역할: 사용자 인터페이스(UI) 개발 및 서버사이드 렌더링(SSR), 정적 사이트 생성(SSG) 처리. 선택 이유: 강력한 라우팅 기능(App Router 기반), 우수한 개발 경험, SEO 최적화 및 고성능 웹 애플리케이션 구축 용이.
- **디자인시스템**: shadcn - 역할: 사전 구축된 UI 컴포넌트 제공. 선택 이유: 높은 수준의 접근성과 커스터마이징 용이성, Tailwind CSS와의 뛰어난 통합, 코드 복사-붙여넣기 방식으로 프로젝트에 직접 통합하여 완전한 제어권 확보.
- **스타일링**: Tailwind CSS - 역할: 유틸리티 우선 CSS 프레임워크를 통한 UI 스타일링. 선택 이유: 빠른 UI 개발 속도, 일관된 디자인 유지, 커스텀 디자인 시스템 구축 용이, HTML에서 직접 스타일을 적용하여 컨텍스트 전환 최소화.
- **상태 관리**: React Hooks, fetch(서버 상태) - 역할: 클라이언트 사이드 상태 및 서버 데이터 관리. 선택 이유: React Hooks는 간결한 컴포넌트 상태 로직 작성 지원, fetch API는 서버와의 비동기 통신을 위한 표준 웹 API로, 가벼운 솔루션을 유지하고 추가 라이브러리 의존성을 최소화하기 위해 선택.
- **데이터베이스 & 인증**: Supabase - 역할: 백엔드 서비스(데이터베이스, 사용자 인증, 실시간 데이터 동기화 등) 제공. 선택 이유: 오픈소스 Firebase 대체재, PostgreSQL 기반의 강력한 기능, 간편한 설정 및 사용, SQL 직접 사용 가능.
- **모노레포 관리**: Turborepo - 역할: 여러 프로젝트/패키지를 단일 저장소에서 효율적으로 관리. 선택 이유: 빌드 및 테스트 시간 단축을 위한 캐싱, 코드 공유 용이, 일관된 개발 환경 제공, 단순화된 설정.

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

Feature Sliced Design (FSD) 아키텍처는 코드베이스의 확장성, 유지보수성 향상 및 관심사 분리를 명확하게 하여 팀원 간의 협업을 용이하게 만들기 위해 채택되었습니다. 프로젝트는 Feature Sliced Design 아키텍처를 따릅니다:

1. **계층 구조 원칙**

   - **상향식 의존성**: 상위 계층은 하위 계층에만 의존 가능 (app → widgets → features → entities → shared)
   - **하위 계층 독립성**: 하위 계층은 상위 계층을 알지 못함
   - **수평적 의존성 금지**: 동일 계층 내 다른 슬라이스 간 의존성 불가

2. **계층 설명**

   - **app**: 애플리케이션 전체 레이아웃, 라우팅 설정, 글로벌 상태 제공 등을 담당합니다. 예를 들어, Next.js의 `layout.tsx`, `page.tsx` 파일 및 최상위 프로바이더 등이 이 계층에 해당합니다.
   - **widgets**: features, entities, shared 컴포넌트를 조합하여 재사용 가능한 UI 블록을 구성합니다. 예를 들어, 커뮤니티 사이트의 '인기 게시물 목록 위젯', '사용자 프로필 사이드바', '최신 댓글 위젯' 등이 여기에 속합니다.
   - **features**: 비즈니스 가치를 제공하는 제품 수준의 기능을 구현합니다 (C,U,D 작업 포함). 예를 들어, '새로운 게시물 작성 기능', '게시물에 댓글 추가 기능', '다른 사용자 팔로우 기능' 등이 이 계층에 해당합니다.
   - **entities**: 핵심 비즈니스 엔티티를 표현하고 Read 로직을 구현합니다 (읽기 전용). 예를 들어, '사용자(User)', '게시물(Post)', '댓글(Comment)'과 같은 데이터 모델 및 관련 데이터를 불러오는 함수들이 여기에 포함됩니다.
   - **shared**: 기술적인 의존성과 유틸리티 함수를 포함합니다. 예를 들어, 공통적으로 사용되는 '버튼(Button) UI 컴포넌트', '날짜 포맷팅 유틸리티 함수', 'Supabase API 클라이언트 설정' 등이 이 계층에 위치합니다.

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

## 비즈니스 모델

본 프로덕트 엔지니어 커뮤니티(PEC) 서비스는 다음과 같은 비즈니스 모델을 목표로 합니다.

### 1. 타겟 고객 (Target Audience)

*   **주요 타겟**: 프로덕트 엔지니어, 소프트웨어 개발자, 프로덕트 매니저, UI/UX 디자이너 등 IT 제품 개발에 참여하는 모든 직군.
*   **확장 타겟**: IT 산업 취업 준비생, 관련 분야 학생, 기술 트렌드에 관심 있는 일반인.

### 2. 핵심 가치 제안 (Core Value Proposition)

*   **지식 공유 및 학습**: 프로덕트 개발 관련 최신 정보, 기술 스택, 문제 해결 경험 등을 공유하고 함께 학습하는 플랫폼 제공.
*   **네트워킹**: 업계 전문가 및 동료들과의 교류를 통해 협업 기회 창출 및 경력 개발 지원.
*   **성장 지원**: 스터디 그룹, 멘토링 프로그램, Q&A 등을 통해 개인 및 팀의 기술적, 커리어적 성장 촉진.
*   **정보 접근성 향상**: 분산된 프로덕트 개발 지식과 노하우를 한 곳에 모아 쉽게 접근하고 활용할 수 있도록 지원.

### 3. 수익 모델 (Revenue Streams) - (가안)

*   **프리미엄 멤버십**: 고급 콘텐츠 접근, 특별 기능 사용, 광고 제거 등의 혜택을 제공하는 유료 구독 모델.
*   **기업 파트너십**: 채용 공고 게시, 기술 워크숍 홍보, 브랜드 노출 등을 위한 기업 대상 유료 서비스.
*   **온라인 강의 및 워크숍**: 특정 기술 또는 주제에 대한 심층 학습을 위한 유료 교육 프로그램.
*   **부가 서비스**: 컨퍼런스 개최, 전문 컨설팅 연결 등 커뮤니티 기반의 다양한 부가 서비스 (추후 확장 가능).

*(참고: 위 수익 모델은 현재 구상 중인 가안이며, 커뮤니티의 성장 단계와 사용자 피드백에 따라 변경될 수 있습니다.)*

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
