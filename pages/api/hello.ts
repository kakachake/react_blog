// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "../../db/entity/";
import { AppDataSource } from "db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  res.send({
    users,
  });
}
