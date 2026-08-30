let currentAccessToken = null;

export const getAccessToken = () => currentAccessToken;

export const setCurrentAccessToken = (token) => {
  currentAccessToken = token;
};