import { getUser } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/index";

export default async function sendUserLog(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { workoutLineId, reps, step, weights } = req.body
        const current = await getUser({ req, res })
        console.log("hi", current )
        console.log(req.body, current.user.id)
        await prisma.userLog.create({
            data: {
                userId: current.user.id,
                workoutLineId,
                reps,
                step,
                weights
            }
        })
        res.status(201).send('new user log created')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}