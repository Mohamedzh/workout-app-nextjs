import { Exercise, WorkoutLine } from "@prisma/client";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ExercisesSection from "../../../components/exercisesSection";
import Layout from "../../../components/layout";
import LoginModal from "../../../components/loginModal";
import { prisma } from "../../../db/index";
import { ExerciseWithSets } from "../../../types";


export interface AddedExercises extends WorkoutLine {
    exerciseRelation: Exercise
    workoutRelation: { name: string }
}

function Workout({ exercises }: { exercises: AddedExercises[] }) {
    const { user } = useUser()
    const [open, setOpen] = useState(false)
    const router = useRouter()
    console.log(exercises);


    useEffect(() => {
        if (user === null) {
            setOpen(true)
        } else {
            setOpen(false)
        }

    },
        [user]
    )

    return (
        <>
            <div className="bg-slate-200 h-screen">
                <Layout />
                <div className='flex flex-1 flex-col md:pl-64'>
                    <main className='flex-1 bg-slate-200 h-screen'>
                        <div className='py-6'>
                            <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                                <LoginModal open={open} setOpen={setOpen} />
                            </div>
                            <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                                <ExercisesSection exercises={exercises} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Workout;

export async function getStaticPaths() {
    const workouts = await prisma.workout.findMany();
    const paths = workouts.map((item) => ({
        params: { workout: item.id.toString() },
    }));
    console.log(paths);
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({
    params,
}: {
    params: { workout: string };
}) {
    const exercises = await prisma.workoutLine.findMany({ include: { exerciseRelation: true, workoutRelation: { select: { name: true } } } });
    const currentWorkoutExercises = exercises.filter(
        (line) => line.workoutId === +params.workout
    );

    return { props: { exercises: JSON.parse(JSON.stringify(currentWorkoutExercises)) } };
}
