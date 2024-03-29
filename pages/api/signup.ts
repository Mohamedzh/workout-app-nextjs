// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getUser } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/db/index";



export default async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { firstName, lastName, email, weight, height, gender, age, } = req.body;
    const { user } = await getUser({ req, res })
    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName,
        lastName,
        email,
        weight,
        height,
        gender,
        age,
      },
    });
    console.log(newUser)
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: `an error occurred as ${error}` });
  }
}
