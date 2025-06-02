import { postType } from "./menu";

export const MAIN_PATHNAME = "/";

// no rewrites
export const AUTH_PATHNAME = "/auth";
export const SIGN_IN_PATHNAME = "/signin";
export const SIGN_UP_PATHNAME = "/signup";
export const AUTH_CALLBACK_PATHNAME = "/auth/callback";

export const COMMUNITY_PATHNAME = "/community";
export const COMMUNITY_LANDING_PATHNAME = "/landing";
export const COMMUNITY_POST_WRITE_PATHNAME = "/post/write";
export const COMMUNITY_POST_EDIT_PATHNAME = "/post/edit";

export const COMMUNITY_POST_PATHNAME = "/post";
export const COMMUNITY_PRODUCTIVITY_PATHNAME = "/post/productivity";
export const COMMUNITY_NEXTJS_PATHNAME = "/post/nextjs";
export const COMMUNITY_FSD_PATHNAME = "/post/FSD";
export const COMMUNITY_SIDEPROJECT_PATHNAME = "/post/sideproject";
export const COMMUNITY_LEARNING_PATHNAME = "/post/learning";
export const COMMUNITY_AI_PATHNAME = "/post/AI";
export const COMMUNITY_CODEREVIEW_PATHNAME = "/post/codereview";
export const COMMUNITY_ARTICLES_PATHNAME = "/articles";
export const getPostTypePathname = (type: postType) => {
  return {
    article: COMMUNITY_ARTICLES_PATHNAME,
    productivity: COMMUNITY_PRODUCTIVITY_PATHNAME,
    AI: COMMUNITY_AI_PATHNAME,
    sideproject: COMMUNITY_SIDEPROJECT_PATHNAME,
    learning: COMMUNITY_LEARNING_PATHNAME,
    FSD: COMMUNITY_FSD_PATHNAME,
    nextjs: COMMUNITY_NEXTJS_PATHNAME,
    codereview: COMMUNITY_CODEREVIEW_PATHNAME,
  }[type];
};

export const COMMUNITY_EVENTS_PATHNAME = "/events";

export const CAMP_PATHNAME = "/camp";
export const CAMP_LANDING_PATHNAME = "/landing";
export const CAMP_PAYMENT_PATHNAME = "/payment";
export const CAMP_PAYMENT_COMPLETE_PATHNAME = "/payment/complete";
export const CAMP_PAYMENT_FAIL_PATHNAME = "/payment/fail";

export const COURSE_PATHNAME = "/course";
export const COURSE_LANDING_PATHNAME = "/landing";
