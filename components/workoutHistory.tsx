import { UserLog, Workout, WorkoutLine, Exercise } from "@prisma/client";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { NewUserLog } from "../types";

const WorkoutHistory = ({
  logs,
  selectedDay
}: {
  logs: NewUserLog[];
  selectedDay: Date
}) => {
  const user = useUser()

  const currentUserLogs = logs?.filter((log) => log.userId === user.user?.id)

  // let exercises: any = {}
  // let newArr: any = []
  // currentUserLogs.map((item) => {
  //   let exerciseName = item.workoutLineRelation.exerciseRelation.name
  //   const set = { exerciseName, reps: item.workoutLineRelation.recReps, weight: item.workoutLineRelation.recWeights }
  //   newArr.push(set)
  //   if (exercises.exerciseName) {
  //     exercises.exerciseName = newArr
  //   } else {
  //         exercises = {...exercises, exerciseName: newArr}
  //   }
  // })

  // const exerciseName = currentUserLogs[0]?.workoutLineRelation.exerciseRelation.name
  // item.workoutLineRelation.exerciseRelation.name
  const workoutName = currentUserLogs[0]?.workoutLineRelation.workoutRelation.name
  // const day = currentUserLogs[0]?.createdAt
  // const date = new Date(day);
  // const dayNew = date.getDate();
  // console.log("bye", day, date, dayNew)

  console.log(currentUserLogs)

  let newArray = []
  for (let i = 0; i < currentUserLogs.length - 1; i++) {
    let j = i + 1
    while (currentUserLogs[i].workoutLineId === currentUserLogs[j]?.workoutLineId &&
      new Date(currentUserLogs[i].createdAt).getDate() === new Date(currentUserLogs[j]?.createdAt).getDate()) {
      // newArray.push({ ...currentUserLogs[i], reps: [] })
      console.log(currentUserLogs[i].workoutLineId)
      j++
      i++
    }
  }

  return (
    <div>
      <div className='sticky top-20 bg-gray-50 px-4 py-6 shadow sm:rounded sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8'>
        <dl className='flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0 md:divide-y-0'>
          <div className='flex justify-between md:block'>
            <dt className='font-medium text-gray-900'>Workout</dt>
            <dd className='md:mt-1'>{workoutName}</dd>
          </div>
          <div className='flex justify-between pt-4 md:block md:pt-0'>
            <dt className='font-medium text-gray-900'>Date</dt>
            <dd className='md:mt-1'>
              <time>January 14, 2021</time>
            </dd>
          </div>
        </dl>
      </div>
      {currentUserLogs.map((item, index) => (
        <div>
          {new Date(item.createdAt).getDate() === selectedDay.getDate() &&
            <div className='my-6 flex rounded-br-3xl rounded-tr-3xl bg-gray-50 shadow sm:rounded-bl-3xl sm:rounded-tl-3xl sm:rounded-tr-none sm:rounded-br-none'>
              <img
                className='object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
                src='/login.jpg'
                alt=''
              />
              <div className='flex flex-col justify-between p-4 leading-normal'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900'>
                  {item.workoutLineRelation.exerciseRelation.name}
                </h5>
                <p className='font-normal text-gray-700 dark:text-gray-600'>
                  {item.reps} reps - {item.weights} kg
                </p>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-600'>
                </p>
              </div>
            </div>
          }
        </div>
      ))}
    </div>
  );
};

export default WorkoutHistory;

{/* {newArr.map((set: any) => (
                  set.exerciseName === item.workoutLineRelation.exerciseRelation.name &&
                  <p className='font-normal text-gray-700 dark:text-gray-600'>
                    {set.reps} reps - {set.weight} kg
                  </p>))} */}