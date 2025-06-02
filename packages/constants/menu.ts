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
} from "./pathname";
import { getOrigin } from "./url";

export const HEADER_MENU_ITEMS = [
  {
    label: "Community",
    href: COMMUNITY_PATHNAME,
    items: [
      {
        label: "Productivity",
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_PRODUCTIVITY_PATHNAME}`,
      },
      {
        label: "F.S.D",
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_FSD_PATHNAME}`,
      },
      {
        label: "Next.js",
        href: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_NEXTJS_PATHNAME}`,
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
