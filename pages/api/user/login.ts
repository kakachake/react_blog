import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./config";
import { ISession } from "..";
export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { verify } = req.body;
  const session: ISession = req.session;
  const verifyCode = session.verifyCode;
  if (verifyCode === verify) {
    res.send({
      code: 0,
      msg: "登录成功",
    });
  }
}
