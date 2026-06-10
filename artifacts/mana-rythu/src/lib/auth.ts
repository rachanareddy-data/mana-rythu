export const setAuthToken = (token: string) => {
  localStorage.setItem("mana_rythu_token", token);
};

export const getAuthToken = () => {
  return localStorage.getItem("mana_rythu_token");
};

export const clearAuthToken = () => {
  localStorage.removeItem("mana_rythu_token");
};