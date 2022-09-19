import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/index";



export default async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const allExerciseLines = prisma.workoutLine.findMany()
        const allExercises = prisma.exercise.findMany()
        res.status(200).send({ allExercises, allExerciseLines });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
