import { PointType } from "./point.type";

const POINT_POLICIES: Record<PointType, number> = {
  post: 20,
  comment: 5,
  signup: 10,
};

const POINT_NOTICE_MESSAGE: Record<PointType, string> = {
  post: "포스트 작성 완료",
  comment: "",
  signup: "회원가입 완료",
};

const POINT_LEVEL = {
  1: { emoji: "🌱", point: 50 },
  2: { emoji: "☘️", point: 150 },
  3: { emoji: "🍀", point: 230 },
  4: { emoji: "🎄", point: 350 },
};
export const convertPointTypeToToastMessage = (pointType: PointType) => {
  return `🌟 +${POINT_POLICIES[pointType]} 포인트 적립 🌟${POINT_NOTICE_MESSAGE[pointType]}`;
};

export const getPointForAction = (pointType: PointType) => {
  return POINT_POLICIES[pointType];
};

const getPointLevel = (point: number) => {
  if (point >= POINT_LEVEL[3].point) return 4;
  if (point >= POINT_LEVEL[2].point) return 3;
  if (point >= POINT_LEVEL[1].point) return 2;
  return 1;
};

export const convertPointToPercent = (point: number) => {
  return Math.min(
    100,
    Math.round((point / POINT_LEVEL[getPointLevel(point)].point) * 100),
  );
};

export const convertPointToEmoji = (point: number) => {
  return POINT_LEVEL[getPointLevel(point)].emoji;
};
