import { safeGetItem, safeSetItem, safeRemoveItem } from "@/lib/storage";

export const setAuthToken = (token: string) => {
  safeSetItem("mana_rythu_token", token);
};

export const getAuthToken = () => {
  return safeGetItem("mana_rythu_token");
};

export const clearAuthToken = () => {
  safeRemoveItem("mana_rythu_token");
};
