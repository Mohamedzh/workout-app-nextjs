import React from 'react'
import { getExerciseData } from '../lib/functions'
import { PersonalDailyRecords } from '../types'
import StockChart from './chartSettings'

type Props = {
    personalBestRecords: PersonalDailyRecords[]
}

function Charts({ personalBestRecords }: Props) {
    return (
        <div className='mx-auto grid grid-cols-1 max-w-7xl px-4  sm:grid-cols-2 sm:px-6 md:px-8'>
            {personalBestRecords.map((exercise, idx) =>
                <div key={idx} className='mx-5 my-10'>
                    <StockChart info={getExerciseData(exercise.name, personalBestRecords)} color={exercise.color} />
                    <p className='text-center text-2xl mt-3 font-bold'>{exercise.name}</p>
                </div >
            )}
        </div>
    )
}

export default Charts