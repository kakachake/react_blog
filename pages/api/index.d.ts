import { IronSession } from "iron-session";

export type ISession = IronSession & Record<string, any>;

export type IUser = {
  id: number;
  nickname: string;
  job: string;
  avatar: string;
  introduce: string;
};

export type IArticle = {
  id: number;
  title: string;
  content: string;
  create_time: string;
  update_time: string;
  views: number;
  is_delete: boolean;
  user: IUser;
};
