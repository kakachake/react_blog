import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalObservable, enableStaticRendering } from "mobx-react-lite";
import createStore, { IStore } from "./rootStore";
// import { makePersistable } from "mobx-persist-store";
// import { cookieStore } from "./cookieStore";
interface IProps {
  initialValue: IStore;
  children: React.ReactNode;
}

enableStaticRendering(typeof window === "undefined" ? true : false);

// 创建context

const StoreContext = createContext({});
export const StoreProvider = ({ initialValue, children }: IProps) => {
  // 创建一个store

  const cstore = createStore(initialValue);

  const [store, setStore] = useState(initialValue);

  const obStore: IStore = useLocalObservable(cstore);
  // 创建响应式数据

  //等到客户端渲染阶段再赋值
  // useEffect(() => {
  //   // typeof window !== "undefined" &&
  //   //   makePersistable(obStore.user, {
  //   //     name: "userStore",
  //   //     properties: ["userInfo"],
  //   //     storage: cookieStore,
  //   //   }).then(() => {
  //   //     console.log("setSUcc");
  //   //   });
  //   setStore(obStore);
  // }, [obStore]);
  // 将响应式数据作为provider的value传入上下文
  return (
    <StoreContext.Provider value={obStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store: IStore = useContext(StoreContext) as IStore;
  if (!store) {
    throw new Error("数据不存在");
  }
  return store;
};
