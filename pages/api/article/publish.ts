import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../config";
import { ISession } from "..";

import { AppDataSource } from "db";
import { Article, User } from "db/entity";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const session: ISession = req.session;
    const { userId } = session;
    const { title, content } = req.body;
    const userRepo = AppDataSource.getRepository(User);
    const articleRepo = AppDataSource.getRepository(Article);
    const article = new Article();
    article.title = title;
    article.content = content;
    article.create_time = article.update_time = new Date();
    article.is_delete = 0;
    article.user = await userRepo.findOne({
      where: {
        id: userId,
      },
    });
    article.views = 0;

    await articleRepo.save(article);
    res.send({
      code: 0,
      msg: "发布成功",
    });
  } catch (error) {
    res.send({
      code: -1,
      msg: error.message,
    });
  }
}
export default withIronSessionApiRoute(handler, ironOptions);
