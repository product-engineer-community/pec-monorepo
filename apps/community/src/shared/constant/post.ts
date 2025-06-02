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
