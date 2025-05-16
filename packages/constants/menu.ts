import {
  COMMUNITY_ARTICLES_PATHNAME,
  COMMUNITY_DISCUSSIONS_PATHNAME,
  COMMUNITY_EVENTS_PATHNAME,
  COMMUNITY_PATHNAME,
  COMMUNITY_QUESTIONS_PATHNAME,
  CAMP_LANDING_PATHNAME,
} from "./pathname";

export const MENU_ITEMS = [
  {
    label: "Community",
    href: COMMUNITY_PATHNAME,
    items: [
      { label: "Questions", href: COMMUNITY_QUESTIONS_PATHNAME },
      { label: "Discussions", href: COMMUNITY_DISCUSSIONS_PATHNAME },
    ],
  },
  { label: "Articles", href: COMMUNITY_ARTICLES_PATHNAME },
  { label: "Events", href: COMMUNITY_EVENTS_PATHNAME },
  { label: "Camp", href: CAMP_LANDING_PATHNAME },
] as const;
