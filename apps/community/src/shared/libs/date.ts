/**
 * 상대적인 시간을 반환하는 함수
 * @param dateString - ISO 날짜 문자열
 * @returns 상대적 시간 문자열 (예: "17일 전", "1달 전", "1년 전")
 */
export function getRelativeTime(dateString: string): string {
  const now = new Date();
  const targetDate = new Date(dateString);
  const diffInMs = now.getTime() - targetDate.getTime();

  // 밀리초를 일로 변환
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 1) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes < 1 ? "방금 전" : `${diffInMinutes}분 전`;
    }
    return `${diffInHours}시간 전`;
  }

  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}달 전`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}년 전`;
}
