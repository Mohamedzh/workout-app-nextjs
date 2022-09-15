// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { getUser } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
    try {

      const x = await  getUser({req,res})
      console.log({x})

        res.json({ newUser: "mioustaf" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
