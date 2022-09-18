import { Exercise } from "@prisma/client";
import React from "react";
import Header from "../../components/header";
import SideBar from "../../components/sideBar";
import { prisma } from "../../db/index";
import ExerciseDetails from "../../components/exerciseDetails";
import Player from "../../components/videoPlayer";

function Workout({ target }: { target: Exercise[] }) {
  return (
    <>
      <div>
        <SideBar />
        <div className="flex flex-1 flex-col md:pl-64">
          <Header />
          <main className="flex-1">
            <div className="py-6 bg-slate-200 h-screen">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <Player/>
                <ExerciseDetails/>
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
    params: { exercise: item.id.toString() },
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
  params: { exercise: string };
}) {
  //   console.log("inside", { params });
  const exercises = await prisma.workoutLine.findMany();
  const currentExercises = exercises.filter(
    (line) => line.workoutId === +params.exercise
  );
  let target: Exercise[] = [];
  //   console.log({ exercises, currentExercises, target });
  for (let i = 0; i < currentExercises.length; i++) {
    const x = await prisma.exercise.findFirst({
      where: { id: currentExercises[i].exerciseId },
    });
    if (x) target.push(x);
  }
  return { props: { target } };
}
