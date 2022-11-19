let accessToken = "";

export const setAccessToken = (s: string) => {
  accessToken = s;
  console.log(accessToken);
};

export const getAccessToken = () => {
  return accessToken;
};
