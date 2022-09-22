import { Exercise } from '@prisma/client'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
import React, { useEffect } from 'react'
import { prisma } from '../db/index'
import StockChart from '../components/chartSettings'
import Layout from '../components/layout'
import { NewUserLog, PersonalDailyRecords } from '../types'
import { getExerciseData, getPersonalRecords } from '../lib/functions'
import Charts from '../components/charts'
import { useDispatch } from 'react-redux'
import { addRecords } from '../redux/slices/recordsSlice'


function Progress({ logs, exercises }: { logs: NewUserLog[], exercises: Exercise[] }) {
    const { user } = useUser()


    const currentUserLogs = logs?.filter(log => log.userId === user?.id)

    let userDays: number[] = []
    currentUserLogs?.map(log => {
        let day = new Date(log.createdAt).getDate()
        if (!userDays.includes(day)) {
            userDays.push(day)
        }
    })

    const exerciseNames = exercises?.map(exercise => {
        return { name: exercise.name, color: exercise.color }
    })

    const newLogs = currentUserLogs?.map(log => {
        return { weight: log.weights, day: new Date(log.createdAt).getDate(), exercise: log?.workoutLineRelation?.exerciseRelation?.name }
    })


    return (
        <>
            <div className='bg-slate-200 h-screen'>
                <Layout />
                <div className="flex flex-1 flex-col md:pl-64">
                    <main className="flex-1 bg-slate-200">
                        <div className="py-6">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <p className='text-4xl font-black'>My progress</p>
                            </div>
                            <div>
                                <Charts personalBestRecords={getPersonalRecords(userDays, exerciseNames, newLogs)} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Progress

export const getServerSideProps = withPageAuth({
    redirectTo: '/login',
    async getServerSideProps() {
        const logs = await prisma.userLog.findMany({ include: { workoutLineRelation: { include: { exerciseRelation: { select: { name: true } } } } } })
        const exercises = await prisma.exercise.findMany()
        return { props: { logs: JSON.parse(JSON.stringify(logs)), exercises } }
    }
})
