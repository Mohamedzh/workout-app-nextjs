import { getUser } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/index";

export default async function sendUserLog(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { data } = req.body
        const current = await getUser({ req, res })
        const userLog = await prisma.userLog.create({
            data: {
                userId: current.user.id,
                workoutLineId: data.workoutLineId,
                reps: data.reps,
                step: data.step,
                weights: data.weights
            }
        })
        res.status(201).send('new user log created')
    } catch (error) {
        console.log(error)
    }
}