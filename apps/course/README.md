# FSD Boilerplate

이 프로젝트는 Product Engineer Camp 참가자들이 Feature Sliced Design (FSD) 아키텍처를 학습하고 구현하는 과정을 돕기 위한 보일러플레이트입니다. 사용자 인증(회원가입, 로그인) 기능을 FSD 원칙에 따라 구현한 예제를 포함하고 있습니다.

## 기술 스택

- **Frontend Framework**: Next.js (App Router)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **상태 관리**: React Hooks
- **데이터베이스**: Supabase

## Feature Sliced Design 구조

프로젝트는 FSD 아키텍처의 계층 구조를 따릅니다:

```
application/      # 전역 설정
src/
├── app/          # 기존 pages 대체
├── entities/     # 비즈니스 엔티티 (User 등)
├── features/     # 비즈니스 기능 구현 (auth 등)
├── shared/      # 공유 유틸리티 및 UI 컴포넌트
└── widgets/     # 독립적인 UI 블록
```

### 주요 기능 구현

#### 1. 인증 기능 (features/auth)

- 회원가입 (SignUp)
  - 이메일/비밀번호 기반 회원가입
  - 사용자 데이터 유효성 검증
- 로그인 (Login)
  - 이메일/비밀번호 기반 인증
  - 세션 관리 (쿠키 기반)

#### 2. 사용자 관리 (entities/user)

- 사용자 인터페이스 정의
- 사용자 상태 관리

## 프로젝트 설정

1. 환경 설정

```bash
# 프로젝트 클론
git clone [repository-url]

# 의존성 설치
pnpm install

# 환경 변수 설정
cp .env.example .env.local
```

2. 환경 변수 설정

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. 개발 서버 실행

```bash
pnpm run dev
```

## FSD 아키텍처 특징

1. **Shared Layer**

   - UI 컴포넌트
   - 유틸리티 함수
   - Supabase 클라이언트 설정

2. **Entities Layer**

   - User 인터페이스 정의
   - 기본 데이터 모델

3. **Features Layer**

   - 인증 관련 기능 구현
   - 상태 관리 로직

4. **Widgets Layer**

   - LoginForm 컴포넌트
   - 재사용 불가능한, 조합된 UI 블록

5. **App Layer**
   - 라우팅 설정
   - 전역 레이아웃
   - 미들웨어 설정

## 개발 가이드

### 1. 계층 구조 원칙

- **상향식 의존성**: 상위 계층은 하위 계층에만 의존 가능 (app → widgets → features → entities → shared)
- **수평적 의존성 금지**: 동일 계층 간 의존성 불가 (feature는 다른 feature에 의존 불가)
- **하위 계층 독립성**: 하위 계층은 상위 계층을 알지 못함

### 2. 슬라이스 구조

각 기능은 다음과 같은 세그먼트로 구성:

```
feature/
├── api/        # 외부 통신 로직
│   ├── index.ts
│   └── [feature-name].ts
├── model/      # 비즈니스 로직
│   ├── index.ts
│   └── types.ts
├── ui/         # 컴포넌트
│   ├── index.ts
│   └── [ComponentName].tsx
└── index.ts    # Public API
```

### 3. 기능 구현 가이드라인

1. **Public API 설계**

   - 각 슬라이스는 `index.ts`를 통해서만 외부로 노출
   - 내부 구현은 private으로 유지

2. **비즈니스 로직 분리**

   - 모델(model/)에 비즈니스 로직 집중
   - UI 컴포넌트는 최소한의 로직만 포함

3. **명명 규칙**
   - 파일명은 기능을 명확히 표현
   - 컴포넌트: PascalCase
   - 유틸리티/훅: camelCase
   - 타입/인터페이스: PascalCase + `.types.ts`

### 4. 새로운 기능 추가 절차

1. **계층 결정**

   - 기능의 성격에 따라 적절한 계층 선택
   - 재사용 가능성 고려

2. **슬라이스 생성**

   - 기획에서 작성한 framework 기반 도메인 구조 따름

3. **의존성 관리**
   - 계층 구조 원칙 준수
   - 순환 의존성 방지

## 참고 사항

- FSD 아키텍처에 대한 자세한 내용은 [공식 문서](https://feature-sliced.design/)를 참고하세요.
- Supabase 관련 설정 및 사용법은 [Supabase 문서](https://supabase.com/docs)를 참고하세요.
