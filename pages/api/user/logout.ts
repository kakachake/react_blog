import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../config";
import { ISession } from "..";

import { setCookie } from "util/index";
import { Cookie } from "next-cookie";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = Cookie.fromApiRoute(req, res);
  const session: ISession = req.session;
  await session.destroy();
  setCookie(cookies, { id: "", nickname: "", avatar: "" });
  res.send({
    code: 0,
    msg: "退出成功",
  });
}
export default withIronSessionApiRoute(handler, ironOptions);
