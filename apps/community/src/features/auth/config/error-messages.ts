export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: "Invalid login credentials",
  EMAIL_NOT_CONFIRMED: "Email not confirmed",
  USER_DISABLED: "User disabled",
  TOO_MANY_REQUESTS: "Too many requests",
  NETWORK_ERROR: "Network error",
  SERVICE_UNAVAILABLE: "Service unavailable",
} as const;

export type AuthErrorCode =
  (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];

export const AUTH_ERROR_MESSAGES: Record<
  AuthErrorCode | "DEFAULT" | "SIGN_UP_DEFAULT",
  string
> = {
  [AUTH_ERROR_CODES.INVALID_CREDENTIALS]:
    "이메일 또는 비밀번호가 일치하지 않습니다.",
  [AUTH_ERROR_CODES.EMAIL_NOT_CONFIRMED]: "이메일 인증이 완료되지 않았습니다.",
  [AUTH_ERROR_CODES.USER_DISABLED]:
    "계정이 비활성화되었습니다. 관리자에게 문의하세요.",
  [AUTH_ERROR_CODES.TOO_MANY_REQUESTS]: "잠시 후 다시 시도해주세요.",
  [AUTH_ERROR_CODES.NETWORK_ERROR]: "네트워크 연결을 확인해주세요.",
  [AUTH_ERROR_CODES.SERVICE_UNAVAILABLE]:
    "일시적인 서비스 장애가 있습니다. 잠시 후 다시 시도해주세요.",
  SIGN_UP_DEFAULT: "알 수 없는 오류로 회원가입에 실패 하였습니다.",
  DEFAULT: "로그인에 실패했습니다.",
} as const;
