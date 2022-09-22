import { UserLog, Workout, WorkoutLine, Exercise } from "@prisma/client";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";

const WorkoutHistory = ({
  logs
}: {
  logs: UserLog[];
}) => {
  const user = useUser()

  const userLogs = logs.filter((log) => log.userId === user.user?.id)
  console.log(userLogs)

  return (
    <div>
      <div className='sticky top-20 bg-gray-50 px-4 py-6 shadow sm:rounded sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8'>
        <dl className='flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0 md:divide-y-0'>
          <div className='flex justify-between md:block'>
            <dt className='font-medium text-gray-900'>Workout</dt>
            <dd className='md:mt-1'>Cardio</dd>
          </div>
          <div className='flex justify-between pt-4 md:block md:pt-0'>
            <dt className='font-medium text-gray-900'>Date</dt>
            <dd className='md:mt-1'>
              <time>January 14, 2021</time>
            </dd>
          </div>
        </dl>
      </div>
      <div className='my-6 flex rounded-br-3xl rounded-tr-3xl bg-gray-50 shadow sm:rounded-bl-3xl sm:rounded-tl-3xl sm:rounded-tr-none sm:rounded-br-none'>
        <img
          className='object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
          src='/login.jpg'
          alt=''
        />
        <div className='flex flex-col justify-between p-4 leading-normal'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900'>
            Noteworthy technology acquisitions 2021
          </h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-600'>
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistory;
