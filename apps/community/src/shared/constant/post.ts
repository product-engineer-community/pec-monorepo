import { PostType } from "@packages/ui";

export const getPostTypeDescription = (postType: PostType) => {
  return {
    article:
      "P.E.C 커뮤니티의 다양한 아티클들을 살펴보세요. 새로운 관점을 발견하고, 유용한 지식을 얻으며, 당신의 경험을 공유해보세요.",
    nextjs:
      "Next.js 관련 기술 전반을 다루는 공간입니다. App Router, Server Action, Routing, Caching 등 실무에서 부딪히는 구체적 기술 구현 이슈를 중심으로 논의합니다.",
    FSD: "Feature-Sliced Design 아키텍처에 대한 이해, 적용, 설계 고민을 다루는 공간입니다. 폴더 구조, entity/feature 구분, scalable frontend architecture 등 시스템 구조 중심의 논의가 이뤄집니다.",
    codereview:
      "구현된 코드에 대해 피드백을 받고, 개선을 위한 논의를 하는 공간입니다. 함수 로직, 컴포넌트 구조, 상태관리, 테스트 코드 등 코드 레벨에서의 리뷰를 중심으로 진행됩니다.",
    productivity:
      "개발자의 생산성을 높이는 도구, 자동화, 워크플로우, 에디터 설정, 단축키 등 일하는 방식을 개선하는 내용을 다룹니다.",
    AI: "LLM, AI 도구, 프롬프트 엔지니어링, 코드 생성, AI와의 협업 방식 등을 다룹니다. 실험적인 구현이나 AI 기반 자동화도 포함됩니다.",
    sideproject:
      "개인 혹은 소규모 팀이 진행 중인 사이드 프로젝트를 소개하고, 피드백을 받거나 고민을 나누는 공간입니다. 기획, 기술 선택, 런칭까지의 전체 과정을 포함합니다.",
    learning: "학습 방법, 학습 자료, 학습 팁 등을 공유하는 공간입니다.",
  }[postType];
};

export const getPostCategoryDescription = (category: string) => {
  return {
    question:
      "명확한 문제 해결을 원하는 글. 에러, 구현 방법, 모범 사례 등. 예시) 이럴 땐 서버 액션 써야 하나요? 또는 Supabase에서 세션이 안 잡혀요",
    discussion:
      "정답이 없는 주제에 대해 생각이나 의견을 나누는 글. 예시) Next.js에서 caching 전략 어떻게 가져가세요? 또는 FSD에서 api 호출 위치 어떻게 잡으세요?",
    retrospective:
      "프로젝트/작업/학습 이후에 정리한 경험 공유. 예시) 사이드 프로젝트 MVP 4주 회고 또는 실무에서 FSD 도입해본 후기",
    introduction:
      "내가 만든 도구/서비스/라이브러리/프로젝트 등을 알리는 글. 예시) Next.js + AI로 만든 문서 생성기 소개합니다",
    guide:
      "어떤 주제에 대한 정리된 설명, 팁, 모범 사례. 예시) Supabase에서 SSR 안전하게 쓰는 방법 또는 TurboRepo와 Vercel 캐시 최적화 가이드",
    etc: "위에 포함되지 않는 잡담, 이벤트, 뉴스 등. 예시) 캠프에서 나눈 이야기 정리 또는 이번에 Notion AI가 달라졌네요",
  }[category];
};
