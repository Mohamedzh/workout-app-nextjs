import { Exercise, UserLog, WorkoutLine } from '@prisma/client'
import { User, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
import type { NextPage } from 'next'
import Dashboard from '../components/dashboard'
import Header from '../components/header'
import SideBar from '../components/sideBar'
import { prisma } from '../db'


const Home: NextPage = ({ exercises, logs, user, lines }: {
    exercises?: Exercise[],
    logs?: UserLog[],
    user?: User,
    lines?: WorkoutLine[]
}) => {
    const userName = user?.user_metadata.name

    const userLogs = logs?.filter(line => line.userId === user?.id)

    let exerciseNames = exercises?.map(item => {
        return item.name
    })

    const userNums = userLogs?.map(log => {
        let workLine = lines?.find(item => item.id === log.workoutLineId)
        let exercise = exercises?.find(exercise => exercise.id === workLine?.exerciseId)
        return { weight: log.weights, name: exercise?.name }
    }
    )

    let exerciseRecord = []
    let personalBestRecords = []
    for (let i = 0; i < exerciseNames!.length; i++) {
        let name = exerciseNames![i]
        for (let j = 0; j < userNums!.length; j++) {
            if (userNums![j].name === name) {
                exerciseRecord.push(userNums![j].weight)
                // { name: userNums![j].weight }
            }
            // else { console.log(name) }
        }
        if (exerciseRecord.length > 0) {
            personalBestRecords.push({ name: exerciseNames![i], weight: Math.max(...exerciseRecord) })
        }
    }

    console.log(personalBestRecords)

    // const favouriteExercises = ['Squat', 'Bicep Curl', 'Bench Press', 'Overhead Press']
    // const colors = ["bg-red-600", "bg-gray-900", "bg-blue-600", "bg-green-600"]
    // const cards2 = personalBestRecords.filter(item => favouriteExercises.includes(item.name)).map(item=>{
    //     return {...item, }
    // })
    // console.log(cards2)

    return (
        <>
            <div className=' bg-slate-200 h-screen'>
                <SideBar />
                <div className="flex flex-1 flex-col md:pl-64">
                    <Header />
                    <main className="flex-1">
                        <div className="py-6">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                            </div>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <Dashboard personalBestRecords={personalBestRecords} userName={userName}/>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Home

export const getServerSideProps = withPageAuth({
    redirectTo: '/login',
    async getServerSideProps() {
        let logs = await prisma.userLog.findMany();
        const exercises = await prisma.exercise.findMany()
        let lines = await prisma.workoutLine.findMany()
        // let lines = await prisma.exercise.findMany({where:{workoutLines:{some:{workoutId:4}}}})
        // console.log(lines)
        return { props: { logs: JSON.parse(JSON.stringify(logs)), exercises, lines: JSON.parse(JSON.stringify(lines)) } };
    }
})
