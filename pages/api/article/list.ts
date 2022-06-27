import { AppDataSource } from "db";
import { Article } from "db/entity";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../config";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const articleRepo = AppDataSource.getRepository(Article);
  const articles = await articleRepo.find({
    relations: ["user"],
  });
  res.send({
    code: 0,
    msg: "获取成功",
    data: articles,
  });
}
export default withIronSessionApiRoute(handler, ironOptions);
