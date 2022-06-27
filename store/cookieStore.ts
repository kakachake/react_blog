import cookie from "react-cookies";

export const cookieStore = {
  getItem: (key: string) => {
    return cookie.load(key);
  },
  setItem: (key: string, value: string | number | object) => {
    return cookie.save(key, value, {});
  },
  removeItem: (key: string) => {
    return cookie.remove(key);
  },
};
