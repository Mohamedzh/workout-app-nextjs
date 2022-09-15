// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function CreateUser( req: NextApiRequest, res: NextApiResponse) {
  try {
    const { firstName, lastName, email, password, imageUrl, weight, height, gender, age,} = req.body;
    const newUser = await prisma.user.create({
      data: { firstName, lastName, email, password, imageUrl, weight, height, gender, age,},
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
