type AppName = "auth" | "community" | "camp" | "lecture";

const appPort = {
  auth: 3000,
  community: 3001,
  camp: 3002,
  lecture: 3003,
};

export const getOrigin = (appName: AppName) => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:${appPort[appName]}`;
  }

  return "https://productengineer.info";
};
