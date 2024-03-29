import { Exercise } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { prisma } from "../../../../lib/db/index";
import ExerciseDetails from "../../../../components/exerciseDetails";
import Player from "../../../../components/videoSection";
import OtherExercises from "../../../../components/otherExercises";
import LoginModal from "../../../../components/loginModal";
import { useUser } from "@supabase/auth-helpers-react";
import Layout from "../../../../components/layout/layout";

function Workout({
  currentExercise,
  setArray,
  lineId,
  other,
}: {
  weight: string;
  currentExercise: Exercise;
  setArray: [];
  lineId: string;
  other: Exercise[];
}) {
  const [open, setOpen] = useState(false);
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user === null && isLoading === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [user]);

  return (
    <>
      <div className="bg-slate-200 h-screen">
        <Layout />
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1 pb-10 bg-slate-200 h-screen">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8"></div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="mb-10">
                  <LoginModal open={open} setOpen={setOpen} />
                  <Player
                    currentExercise={currentExercise}
                    setArray={setArray}
                  />
                </div>
                <ExerciseDetails setArray={setArray} lineId={lineId} />
                <OtherExercises other={other} />
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
  const exercises = await prisma.workoutLine.findMany();
  const paths = exercises.map((item) => ({
    params: {
      exercise: item.exerciseId.toString(),
      workout: item.workoutId.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { workout: string; exercise: string };
}) {
  const workoutLines = await prisma.workoutLine.findMany();
  const currentLine = workoutLines.find(
    (item) =>
      item.exerciseId === Number(params.exercise) &&
      item.workoutId === Number(params.workout)
  );

  const exercises = await prisma.exercise.findMany();
  const currentExercise = exercises.find(
    (item) => item.id === Number(params.exercise)
  );

  const currentWorkoutExerciseIds = workoutLines.filter(
    (item) => item.workoutId === Number(params.workout)
  );

  const other = exercises
    .filter((item) => item.id !== currentExercise?.id)
    .slice(0, 3);

  const set = {
    reps: currentLine?.recReps,
    weight: currentLine?.recWeights,
    disabled: false,
  };
  let setArray: { reps?: number; weight?: number; disabled: boolean }[] = [];

  if (currentLine) {
    for (let i = 0; i < currentLine.recSets; i++) {
      setArray.push(set);
    }
  }

  return {
    props: {
      currentExercise,
      setArray,
      lineId: currentLine?.id,
      other,
    },
  };
}
