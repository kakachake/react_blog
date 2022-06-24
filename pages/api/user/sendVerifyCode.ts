import { NextApiRequest, NextApiResponse } from "next";
import axRequest from "request";
import { SID, generateSign, generateAuth, APP_ID, ironOptions } from "./config";
import { withIronSessionApiRoute } from "iron-session/next";

import { ISession } from "..";

const getRandCode = () => Math.floor(Math.random() * 9999);
const expire = 5;

export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const session: ISession = req.session;
  const { to, templateId } = req.body;
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${SID}/SMS/TemplateSMS?sig=${generateSign()}`;
  const verifyCode = getRandCode();
  axRequest
    .post({
      url,
      data: {
        to,
        appId: APP_ID,
        templateId,
        datas: [verifyCode, expire],
      },
      headers: {
        Authorization: generateAuth(),
      },
    })
    .then(async (response) => {
      if (response.statusCode === "000000") {
        session.verifyCode = verifyCode;
        await session.save();
        res.send({
          code: 0,
          msg: response?.statusMsg,
          data: response?.templateSMS,
        });
      } else {
        res.send({
          code: response.statusCode,
          msg: response?.statusMsg,
        });
      }
    })
    .catch((err) => {
      res.send(err);
    });
}
