import React, { useEffect } from 'react'
import { useLayoutEffect, useRef, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { addUserLog, classNames } from './functions'

type Props = {
    setArray: { reps: string, weight: string, disabled: boolean }[]
    lineId: string
}

function ExerciseDetails({ setArray, lineId }: Props) {
    const [start, setStart] = useState<boolean>(false)
    const [startButton, setStartButton] = useState<string>("Start Timer")

    const [checked, setChecked] = useState<boolean>(false)
    const [selectedSet, setSelectedSet] = useState<{ reps: string, weight: string }>()

    useEffect(() => { setStartButton(start ? "Stop" : "Start Timer") }, [start])

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Log Workout</h1>
                </div>
                {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add user
                    </button>
                </div> */}
            </div>
            <div className='flex justify-evenly'>
                <div className="mt-8 flex flex-col flex-1">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                {/* {selectedSets.length > 0 && (
                                <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        Bulk edit
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        Delete all
                                    </button>
                                </div>
                            )} */}
                                <table className="min-w-full table-fixed divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="min-w-[2rem] py-3.5 pl-6 text-left text-sm font-semibold text-gray-900">
                                                #
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Weight (KGs)
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Reps
                                            </th>
                                            <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {setArray.map((set, idx) => (
                                            <tr key={idx} className={set.disabled ? 'bg-gray-50' : undefined}>

                                                <td
                                                    className={classNames(
                                                        'whitespace-nowrap py-4 pl-6 text-sm font-medium',
                                                        set.disabled ? 'text-indigo-600' : 'text-gray-900'
                                                    )}
                                                >
                                                    {idx + 1}
                                                </td>

                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><label htmlFor="email" className="sr-only">
                                                    weight
                                                </label>
                                                    <input
                                                        type="weight"
                                                        name="weight"
                                                        id="weight"
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder={set.weight}
                                                    /></td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><label htmlFor="email" className="sr-only">
                                                    reps
                                                </label>
                                                    <input
                                                        type="reps"
                                                        name="reps"
                                                        id="reps"
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder={set.reps}
                                                    /></td>

                                                <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                                    <input
                                                        type="checkbox"
                                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                                        value={set.weight}
                                                        checked={set.disabled}
                                                        disabled={set.disabled}
                                                        onChange={(e) => {
                                                            set.disabled = true
                                                            setSelectedSet(set)
                                                            addUserLog(selectedSet, lineId)
                                                        }
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mx-12'>
                    <CountdownCircleTimer
                        isPlaying={start}
                        duration={30}
                        colors={['#000000', '#F7B801', '#fae105', '#08cf29']}
                        colorsTime={[7, 5, 2, 0]}
                        onComplete={() => console.log('completed')}
                    >
                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                    <button
                        className='mt-14 bg-gray-900 flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        onClick={() => setStart(!start)}>
                        {startButton}
                    </button>
                </div>
            </div>
        </div>
    )
}


export default ExerciseDetails
