import { Exercise, WorkoutLine } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Header from "../../../../components/header";
import SideBar from "../../../../components/sideBar";
import { prisma } from "../../../../db/index";
import ExerciseDetails from "../../../../components/exerciseDetails";
import Player from "../../../../components/videoPlayer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../redux/hooks";
import OtherExercises from "../../../../components/otherExercises";

function Workout({ currentExercise, setArray, lineId, other
}: {
  weight: string, currentExercise: Exercise, setArray: [], lineId: string, other: Exercise[]
}) {
  // const dispatch = useDispatch()
  // const exerciseLines = useAppSelector(state=>state.exercise)
  // const router = useRouter()
  // const [currentLines, setCurrentLines] = useState<WorkoutLine[]>()
  // console.log(router.query)

  // useEffect(()=>{getExercise(dispatch)},[])

  // useEffect(()=>{setCurrentLines(exerciseLines)},[exerciseLines])


  // console.log(currentLines)
  // if(router.query.workout){
  // console.log(currentLines?.filter(line=>line.workoutId === +router.query.workout))
  // }

  return (
    <>
      <div>
        <SideBar />
        <div className="flex flex-1 flex-col md:pl-64">
          <Header />
          <main className="flex-1 bg-slate-200 h-screen pb-10">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="mb-10">
                  <Player currentExercise={currentExercise} setArray={setArray} />
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
    params: { exercise: item.exerciseId.toString(), workout: item.workoutId.toString() },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params
}: {
  params: { workout: string, exercise: string };
}) {
  const workoutLines = await prisma.workoutLine.findMany();
  const currentLine = workoutLines.find(
    (item) => item.exerciseId === +params.exercise && item.workoutId === +params.workout
  )

  const exercises = await prisma.exercise.findMany();
  const currentExercise = exercises.find(item => item.id === +params.exercise)

  const currentWorkoutExerciseIds = workoutLines.filter(
    (item) => item.workoutId === +params.workout
  )

  let other = []
  for (let i = 0; i < currentWorkoutExerciseIds.length; i++) {
    let target = exercises.find(exercise => exercise.id === currentWorkoutExerciseIds[i].id)
    other.push(target)
  }

  const set = { reps: currentLine?.recReps, weight: currentLine?.recWeights, disabled: false }
  let setArray: { reps?: number, weight?: number, disabled: boolean }[] = []

  if (currentLine) {
    for (let i = 0; i < currentLine.recSets; i++) {
      setArray.push(set)
    }
  }
  return {
    props: {
      currentExercise,
      setArray,
      lineId: currentLine?.id,
      other
    }
  };
}
