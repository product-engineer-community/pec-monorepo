export type AppName = "auth" | "community" | "camp" | "lecture";

const appPort = {
  auth: 3000,
  community: 3001,
  camp: 3002,
  lecture: 3003,
};

export const getOrigin = (appName?: AppName) => {
  if (process.env.NODE_ENV === "development") {
    return appName
      ? `http://localhost:${appPort[appName]}`
      : "http://localhost:3000";
  }

  return appName
    ? `https://${appName}.productengineer.info`
    : "https://www.productengineer.info";
};
