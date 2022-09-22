import {
  CheckCircleIcon,
} from '@heroicons/react/20/solid'
import { getPersonalBest } from '../lib/functions'
import { useRouter } from 'next/router'
import { PersonalRecord } from '../types'
import { User } from '@supabase/supabase-js'
import { useState } from 'react'



export default function Dashboard({ personalBestRecords, userName, favoriteExercises }: {
  personalBestRecords: PersonalRecord[], userName: string, favoriteExercises: string[]
}) {
  const router = useRouter()

  const favorite = personalBestRecords.filter(record => favoriteExercises.find(item => item === record.name))

  return (
    <>
      <div className="mt-6 ml-6 bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <img
                  className="hidden h-16 w-16 rounded-full sm:block"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div>
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 rounded-full sm:hidden"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                      Good morning, {userName}
                    </h1>
                  </div>
                  <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">

                    <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                      <CheckCircleIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                        aria-hidden="true"
                      />
                      10 day streak
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                onClick={() => { router.push('/workout') }}
              >
                Browse workouts
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">Personal Records</h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {favorite.map((card) => (
              <div key={card.name} className={`overflow-hidden ${card.color} rounded-lg shadow`}>
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-white">{card.name}</dt>
                        <dd>
                          <div className="text-lg font-medium text-white">{getPersonalBest(card.name, personalBestRecords) || 0} Ibs</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
