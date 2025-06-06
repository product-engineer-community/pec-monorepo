import {
  COMMUNITY_ARTICLES_PATHNAME,
  COMMUNITY_EVENTS_PATHNAME,
  COMMUNITY_PATHNAME,
  CAMP_LANDING_PATHNAME,
  CAMP_PATHNAME,
  COURSE_PATHNAME,
  COURSE_LANDING_PATHNAME,
  COMMUNITY_PRODUCTIVITY_PATHNAME,
  COMMUNITY_FSD_PATHNAME,
  COMMUNITY_NEXTJS_PATHNAME,
  COMMUNITY_CODEREVIEW_PATHNAME,
  COMMUNITY_AI_PATHNAME,
  COMMUNITY_SIDEPROJECT_PATHNAME,
  COMMUNITY_LEARNING_PATHNAME,
} from "./pathname";
import { getOrigin } from "./url";

// To avoid dependency(packages/ui)
export type PostType =
  | "productivity"
  | "AI"
  | "sideproject"
  | "learning"
  | "FSD"
  | "nextjs"
  | "codereview"
  | "article";

// Helper function to get post type display name
export function getPostTypeDisplayName(type: PostType): string {
  return {
    article: "Article",
    productivity: "생산성",
    AI: "AI",
    sideproject: "사이드 프로젝트",
    learning: "학습 노하우",
    FSD: "F.S.D",
    nextjs: "Next.js",
    codereview: "코드 리뷰",
  }[type];
}

export const HEADER_MENU_ITEMS = [
  {
    label: "Community",
    href: COMMUNITY_PATHNAME,
    items: [
      {
        label: getPostTypeDisplayName("codereview"),
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_CODEREVIEW_PATHNAME}`,
      },
      {
        label: getPostTypeDisplayName("FSD"),
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_FSD_PATHNAME}`,
      },
      {
        label: getPostTypeDisplayName("productivity"),
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_PRODUCTIVITY_PATHNAME}`,
      },
      {
        label: getPostTypeDisplayName("nextjs"),
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_NEXTJS_PATHNAME}`,
      },
      {
        label: getPostTypeDisplayName("AI"),
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_AI_PATHNAME}`,
      },
      {
        label: getPostTypeDisplayName("sideproject"),
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_SIDEPROJECT_PATHNAME}`,
      },
      {
        label: getPostTypeDisplayName("learning"),
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_LEARNING_PATHNAME}`,
      },
    ],
  },
  {
    label: "Articles",
    href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_ARTICLES_PATHNAME}`,
  },
  {
    label: "Events",
    href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_EVENTS_PATHNAME}`,
  },
  {
    label: "Course",
    href: `${getOrigin()}${COURSE_PATHNAME}${COURSE_LANDING_PATHNAME}`,
  },
  {
    label: "Camp",
    href: `${getOrigin()}${CAMP_PATHNAME}${CAMP_LANDING_PATHNAME}`,
  },
] as const;
