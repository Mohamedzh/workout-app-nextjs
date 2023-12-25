import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { NewUserLog, WorkoutLogs } from "../lib/types";
import { format } from "date-fns";
import { groupBy } from "lodash";
import _ from "lodash";
import Image from "next/image";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const WorkoutHistory = ({
  logs,
  selectedDay,
}: {
  logs: NewUserLog[];
  selectedDay: Date;
}) => {
  const user = useUser();

  const currentUserLogs = logs?.filter((log) => log.userId === user.user?.id);
  const workoutName =
    currentUserLogs[0]?.workoutLineRelation.workoutRelation.name;

  const filteredLog = _.chain(currentUserLogs)
    .groupBy("workoutLineId")
    .map((value, key) => ({ workoutLineId: key, logs: value }))
    .value();

  let newArr: any = [];
  for (let i = 0; i < filteredLog.length; i++) {
    filteredLog[i].logs.map((item) =>
      newArr.push({
        exercise: item.workoutLineRelation.exerciseRelation.name,
        exerciseImg: item.workoutLineRelation.exerciseRelation.imageSrc,
        createdAt: item.createdAt,
        reps: item.reps,
        weight: item.weights,
      })
    );
  }

  const newArr2 = _.chain(newArr)
    .groupBy("exercise")
    .map((value, key) => ({ exercise: key, logs: value }))
    .value();

  const checkDateInLogs = (
    exercise: { logs: WorkoutLogs[] }[],
    selectedDay: Date
  ) => {
    let result = false;
    const currentDay = selectedDay.getDate();
    const currentMonth = selectedDay.getMonth();
    for (let i = 0; i < exercise.length; i++) {
      exercise[i].logs.forEach((log) => {
        const day = new Date(log.createdAt).getDate();
        const month = new Date(log.createdAt).getMonth();
        if (day === currentDay && month === currentMonth) {
          result = true;
          return;
        }
      });
    }
    return result;
  };

  const checkDateInDayLogs = (logs: WorkoutLogs[], selectedDay: Date) => {
    let result = false;
    const currentDay = selectedDay.getDate();
    const currentMonth = selectedDay.getMonth();
    logs.forEach((log) => {
      const day = new Date(log.createdAt).getDate();
      const month = new Date(log.createdAt).getMonth();
      if (day === currentDay && month === currentMonth) {
        result = true;
        return;
      }
    });
    return result;
  };

  return (
    <div>
      <div className="sticky z-50 top-20 bg-gray-50 px-4 py-6 shadow sm:rounded sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
        <dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0 md:divide-y-0">
          <div className="flex justify-between md:block">
            <dt className="font-medium text-gray-900">Workout</dt>
            <dd className="md:mt-1">{workoutName}</dd>
          </div>
          <div className="flex justify-between pt-4 md:block md:pt-0">
            <dt className="font-medium text-gray-900">Date</dt>
            <dd className="md:mt-1">
              <time>{format(selectedDay, "MMMM d, y")}</time>
            </dd>
          </div>
        </dl>
      </div>
      {checkDateInLogs(newArr2, selectedDay) ? (
        newArr2.map((item: any, i) => (
          <div key={i}>
            {checkDateInDayLogs(item.logs, selectedDay) && (
              <div className="relative grid grid-cols-2 my-6 rounded-br-3xl rounded-tr-3xl bg-gray-50 shadow sm:rounded-bl-3xl sm:rounded-tl-3xl sm:rounded-tr-none sm:rounded-br-none">
                <Image
                  width={192}
                  height={348}
                  className="w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={
                    newArr.find(
                      (target: any) => target.exercise === item.exercise
                    )?.exerciseImg
                  }
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                    {item.exercise}
                  </h5>
                  {item.logs.map(
                    (item2: WorkoutLogs, j: number) =>
                      new Date(item2.createdAt).getDate() ===
                        selectedDay.getDate() &&
                      new Date(item2.createdAt).getMonth() ===
                        selectedDay.getMonth() && (
                        <p
                          key={j}
                          className="font-normal text-gray-700 dark:text-gray-600"
                        >
                          {item2.reps} reps - {item2.weight} kg
                        </p>
                      )
                  )}
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-600"></p>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="flex mt-1">
          <ExclamationCircleIcon className="w-7 h-7 text-red-600 mr-1" />
          <p className="font-semibold text-xl">
            No exercise history on this day
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;
