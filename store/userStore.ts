export type IUserInfo = {
  userId?: number | null;
  nickname?: string;
  avatar?: string;
};

export interface IUserStore {
  userInfo: IUserInfo;
  // eslint-disable-next-line no-unused-vars
  setUserInfo: (value: IUserInfo) => void;
}

const userStroe = (): IUserStore => {
  return {
    userInfo: {
      userId: 1,
      avatar:
        "https://p1.music.126.net/0VRN6GBaPibXxfKz2UbzdA==/109951165959686617.jpg",
      nickname: "kakachake",
    },
    setUserInfo: function (value) {
      this.userInfo = value;
    },
  };
};

export default userStroe;
