import userStore, { IUserStore } from "./userStore";

export interface IStore {
  user?: IUserStore;
}

const user = userStore();

export default function createStore(initialValue: any): () => IStore {
  const store: IStore = {
    user: { ...user, ...initialValue?.user },
  };

  return () => {
    return store;
  };
}
