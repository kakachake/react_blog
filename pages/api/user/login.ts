import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./config";
import { ISession } from "..";
import { User } from "db/entity/user";
import { AppDataSource } from "db";
import { UserAuth } from "db/entity";
import { setCookie } from "util/index";
import { Cookie } from "next-cookie";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { phone, verify, identity_type } = req.body;
  const cookies = Cookie.fromApiRoute(req, res);
  const session: ISession = req.session;
  const verifyCode = session.verifyCode;
  try {
    if (verifyCode == verify) {
      const userAuthRepository = AppDataSource.getRepository(UserAuth);
      // const userRepository = AppDataSource.getRepository(User);
      const userAuth = await userAuthRepository.findOne({
        where: {
          identity_type,
          identifier: phone,
        },
        relations: {
          user: true,
        },
      });
      if (userAuth) {
        //已存在的用户
        const user = userAuth.user;
        const { id, nickname, avatar } = user;
        session.userId = id;
        session.nickname = nickname;
        session.avatar = avatar;
        await session.save();

        setCookie(cookies, {
          id,
          nickname,
          avatar,
        });

        res.send({
          code: 0,
          msg: "登录成功",
          data: user,
        });
      } else {
        //新用户
        const user = new User();
        user.nickname = `用户_${Math.floor(Math.random() * 10000)}`;
        user.avatar =
          "https://p1.music.126.net/Qs4WDm3jVqpImhcfCu-oWA==/109951165700073746.jpg";
        user.job = "程序员";
        user.introduce = "前端程序员";

        const userAuth = new UserAuth();
        userAuth.identifier = phone;
        userAuth.identity_type = identity_type;
        userAuth.credential = session.verifyCode;
        userAuth.user = user;
        const resUserAuth = await userAuthRepository.save(userAuth);
        const {
          user: { id, nickname, avatar },
        } = resUserAuth;

        session.userId = id;
        session.nickname = nickname;
        session.avatar = avatar;
        await session.save();
        setCookie(cookies, {
          id,
          nickname,
          avatar,
        });
        res.send({
          code: 0,
          msg: "登录成功",
          data: user,
        });
      }
    } else {
      res.send({
        code: -1,
        msg: "验证码错误",
      });
    }
  } catch (error) {
    res.send({
      code: -1,
      msg: "登陆失败",
      err: error,
    });
  }
}
export default withIronSessionApiRoute(handler, ironOptions);
