import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn"); // 全局使用简体中文

export function fromNow(date?: string) {
  if (!date) {
    return "";
  }
  return dayjs(date).fromNow();
}

export const setCookie = (cookies: any, items: Record<any, any>) => {
  const expires = 24 * 60 * 60 * 1000;
  const path = "/";
  console.log("setCookie");

  Object.keys(items).forEach((key: any) => {
    cookies.set(key, items[key], { expires, path });
    console.log(`set cookie: ${key}=${items[key]}`);
  });
};
