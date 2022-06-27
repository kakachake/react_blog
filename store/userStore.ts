export type IUserInfo = {
  id?: number | null;
  nickname?: string;
  avatar?: string;
};

export interface IUserStore {
  userInfo: IUserInfo;
  // eslint-disable-next-line no-unused-vars
  setUserInfo: (value: IUserInfo) => void;
}

const UserStore: () => IUserStore = () => {
  const userInfo: IUserInfo = {
    // id: 1,
    // nickname: "kaka",
    // avatar:
    //   "https://p1.music.126.net/Qs4WDm3jVqpImhcfCu-oWA==/109951165700073746.jpg",
  };
  return {
    userInfo,
    setUserInfo: function (value: IUserInfo) {
      console.log(value);

      this.userInfo = value;
      console.log(this);
    },
  };
};

export default UserStore;
