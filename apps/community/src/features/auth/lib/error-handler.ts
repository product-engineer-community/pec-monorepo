import { AUTH_ERROR_MESSAGES } from "../config/error-messages";

export const getAuthErrorMessage = (error: Error) => {
  return (
    AUTH_ERROR_MESSAGES[error.message as keyof typeof AUTH_ERROR_MESSAGES] ??
    AUTH_ERROR_MESSAGES.DEFAULT
  );
};
