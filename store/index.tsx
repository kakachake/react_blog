import React, { createContext, useContext } from "react";
import { useLocalObservable, enableStaticRendering } from "mobx-react-lite";
import createStore, { IStore } from "./rootStore";

interface IProps {
  initialValue: Record<any, any>;
  children: React.ReactNode;
}

enableStaticRendering(true);

// 创建context
const StoreContext = createContext({});

export const StoreProvider = ({ initialValue, children }: IProps) => {
  // 创建响应式数据
  const store: IStore = useLocalObservable(createStore(initialValue));
  // 将响应式数据作为provider的value传入上下文
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store: IStore = useContext(StoreContext) as IStore;
  if (!store) {
    throw new Error("数据不存在");
  }
  return store;
};
