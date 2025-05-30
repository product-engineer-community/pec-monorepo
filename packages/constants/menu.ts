import {
  COMMUNITY_ARTICLES_PATHNAME,
  COMMUNITY_DISCUSSIONS_PATHNAME,
  COMMUNITY_EVENTS_PATHNAME,
  COMMUNITY_PATHNAME,
  COMMUNITY_QUESTIONS_PATHNAME,
  CAMP_LANDING_PATHNAME,
  CAMP_PATHNAME,
  COURSE_PATHNAME,
} from "./pathname";
import { getOrigin } from "./url";

export const HEADER_MENU_ITEMS = [
  {
    label: "Community",
    href: COMMUNITY_PATHNAME,
    items: [
      {
        label: "Questions",
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_QUESTIONS_PATHNAME}`,
      },
      {
        label: "Discussions",
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_DISCUSSIONS_PATHNAME}`,
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
    label: "Camp",
    href: `${getOrigin()}${CAMP_PATHNAME}${CAMP_LANDING_PATHNAME}`,
  },
] as const;
