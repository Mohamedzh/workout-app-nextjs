import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { NewUserLog } from "../types";
import { format } from "date-fns";
import { groupBy } from "lodash";
import _ from "lodash";

const WorkoutHistory = ({
  logs,
  selectedDay
}: {
  logs: NewUserLog[];
  selectedDay: Date
}) => {
  const user = useUser()

  const currentUserLogs = logs?.filter((log) => log.userId === user.user?.id)
  const workoutName = currentUserLogs[0]?.workoutLineRelation.workoutRelation.name


  // const grouped = _.groupBy(currentUserLogs, log => log.workoutLineRelation.exerciseRelation.name);
  // console.log("object", grouped);

  //   const p = {
  //     "p1": "value1",
  //     "p2": "value2",
  //     "p3": "value3"
  // };

  // for (let key in p) {
  //     if (p.hasOwnProperty(key)) {
  //         console.log(key + " -> " + p[key]);
  //     }
  // }

  const filteredLog = _.chain(currentUserLogs)
    .groupBy("workoutLineId")
    .map((value, key) => ({ workoutLineId: key, logs: value }))
    .value()

  let newArr: any = []
  for (let i = 0; i < filteredLog.length; i++) {
    filteredLog[i].logs.map((item) => newArr.push({ exercise: item.workoutLineRelation.exerciseRelation.name, createdAt: item.createdAt, reps: item.reps, weight: item.weights }))
  }

  const newArr2 = _.chain(newArr)
    .groupBy("exercise")
    .map((value, key) => ({ exercise: key, logs: value }))
    .value()
  console.log(newArr2)

  // let exercises: any  = {}
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

  // const day = currentUserLogs[0]?.createdAt
  // const date = new Date(day);
  // const dayNew = date.getDate();
  // console.log("bye", day, date, dayNew)





  // let newArray = []
  // for (let i = 0; i < currentUserLogs.length - 1; i++) {
  //   let j = i + 1
  //   while (currentUserLogs[i].workoutLineId === currentUserLogs[j]?.workoutLineId &&
  //     new Date(currentUserLogs[i].createdAt).getDate() === new Date(currentUserLogs[j]?.createdAt).getDate()) {
  //     // newArray.push({ ...currentUserLogs[i], reps: [] })
  //     console.log(currentUserLogs[i].workoutLineId)
  //     j++
  //     i++
  //   }
  // }

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
              <time>{format(selectedDay, "MMMM d, y")}</time>
            </dd>
          </div>
        </dl>
      </div>
      {newArr2.map((item: any) => (
        <>
          {/* {item.logs.map(item3 => 
            new Date(item3.createdAt).getDate() === selectedDay.getDate() && new Date(item3.createdAt).getMonth() === selectedDay.getMonth() && */}
          <div className='my-6 flex rounded-br-3xl rounded-tr-3xl bg-gray-50 shadow sm:rounded-bl-3xl sm:rounded-tl-3xl sm:rounded-tr-none sm:rounded-br-none'>
            <img
              className='object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
              src='/login.jpg'
              alt=''
            />
            <div className='flex flex-col justify-between p-4 leading-normal'>
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900'>
                {item.exercise}
              </h5>
              {item.logs.map((item2: any) =>
                new Date(item2.createdAt).getDate() === selectedDay.getDate() && new Date(item2.createdAt).getMonth() === selectedDay.getMonth() &&
                <p className='font-normal text-gray-700 dark:text-gray-600'>
                  {item2.reps} reps - {item2.weights} kg
                </p>
              )}
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-600'>
              </p>
            </div>
          </div>
        </>
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