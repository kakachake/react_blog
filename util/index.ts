export const setCookie = (cookies: any, items: Record<any, any>) => {
  const expires = 24 * 60 * 60 * 1000;
  const path = "/";
  console.log("setCookie");

  Object.keys(items).forEach((key: any) => {
    cookies.set(key, items[key], { expires, path });
    console.log(`set cookie: ${key}=${items[key]}`);
  });
};
