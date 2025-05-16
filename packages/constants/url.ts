type AppName = "auth" | "community" | "camp" | "lecture" | "gateway";

const appPort = {
  auth: 3000,
  community: 3001,
  camp: 3002,
  lecture: 3003,
  gateway: 3004,
};

export const getOrigin = (appName: AppName) => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:${appPort[appName]}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL || "";
};
