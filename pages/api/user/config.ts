import dayjs from "dayjs";
import md5 from "md5";
import { encode } from "js-base64";

export const SID = process.env.SID;
export const TOKEN = process.env.TOKEN;
export const APP_ID = process.env.APP_ID;

export const ironOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME,
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  },
};

export const generateSign = () => {
  const timestamp = dayjs().format("YYYYMMDDHHmmss");
  return md5(`${SID}${TOKEN}${timestamp}`).toUpperCase();
};

export const generateAuth = () => {
  const timestamp = dayjs().format("YYYYMMDDHHmmss");
  return encode(`${SID}:${timestamp}`);
};
