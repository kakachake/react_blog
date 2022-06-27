import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { ISession } from "..";
import fs from "fs";
import { UserAuth } from "db/entity";
import { setCookie } from "util/index";
import { Cookie } from "next-cookie";
import { User } from "db/entity/";
import { AppDataSource } from "db";
import axRequest from "request";
import { ironOptions } from "../config";
import path from "path";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const session: ISession = req.session;
  const { code } = req.query;
  const cookies = Cookie.fromApiRoute(req, res);
  const github_id = process.env.GITHUB_CLIENT_Id;
  const github_secret = process.env.GITHUB_CLIENT_Secret;
  try {
    const tokenRes = await axRequest.post({
      url: "https://github.com/login/oauth/access_token",
      params: {
        client_id: github_id,
        client_secret: github_secret,
        code: code,
      },
      headers: {
        Accept: "application/json",
      },
    });
    console.log("111");

    console.log(tokenRes);
    if (!tokenRes.access_token) {
      console.log("获取access_token失败");

      throw new Error("获取access_token失败");
    }

    session.github_token = tokenRes.access_token;
    await session.save();
    const userRes = await axRequest.get({
      url: "https://api.github.com/user",
      headers: {
        Authorization: `token ${session.github_token}`,
      },
    });
    console.log("222");

    console.log(userRes);

    const userAuthRepository = AppDataSource.getRepository(UserAuth);
    const userAuth = await userAuthRepository.findOne({
      where: {
        identity_type: "github",
        identifier: userRes.id,
      },
      relations: {
        user: true,
      },
    });
    if (userAuth) {
      const user = userAuth.user;
      const { id, nickname, avatar } = user;
      userAuth.credential = session.github_token;
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;
      await session.save();
      setCookie(cookies, {
        id,
        nickname,
        avatar,
      });
    } else {
      const user = new User();
      user.nickname = userRes.login;
      user.avatar = userRes.avatar_url;
      user.job = "程序员";
      user.introduce = "前端程序员";

      const userAuth = new UserAuth();
      userAuth.identifier = userRes.id;
      userAuth.identity_type = "github";
      userAuth.credential = session.github_token;
      userAuth.user = user;
      await userAuthRepository.save(userAuth);
      session.userId = user.id;
      session.nickname = user.nickname;
      session.avatar = user.avatar;
      await session.save();
      setCookie(cookies, {
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
      });
    }

    return res.write(fs.readFileSync(path.resolve("./public/succ.html")));
  } catch (error) {
    return res.status(500).send(error);
  }
}

export default withIronSessionApiRoute(handler, ironOptions);
