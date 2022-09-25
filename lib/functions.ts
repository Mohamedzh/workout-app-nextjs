import { NextRouter } from 'next/router'
import axios from 'axios'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { PersonalDailyRecords, PersonalRecord, SignUp } from '../types'


export const signupUser = async (router: NextRouter, email: string, password: string, body: SignUp) => {
    await supabaseClient.auth.signUp({ email, password }, { data: { name: body.firstName + " " + body.lastName } })
    await supabaseClient.auth.signIn({ email, password, }, { redirectTo: '/' })
    await axios.post("/api/signup", body)
    router.push('/')
}

export const resetPassword = async (email: string) => {
    const res = await supabaseClient.auth.api.resetPasswordForEmail(email, { redirectTo: "/login" })
}

export const changePassword = async (password: string) => {
    const { data, error } = await supabaseClient.auth.update({
        password,
    })
    if (data) alert("Password updated successfully!")
    if (error) alert("There was an error updating your password.")
}

export const loginUser = async (router: NextRouter, email: string, password: string) => {
    try {
        const { user, error } = await supabaseClient.auth.signIn({ email, password }, { redirectTo: '/' })
        if (error) { return error }
        else {
            router.push('/')
            return user
        }
    } catch (error) {
        console.log(error)
    }

}

export const signOut = async (router: NextRouter) => {
    try {
        await supabaseClient.auth.signOut()
        router.push('/login')
    } catch (error) {
        console.log(error)
    }
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const addUserLog = async (rep: string, weight: string, index: number, lineId: string) => {
    const data = { step: index + 1, reps: rep, weights: weight, workoutLineId: lineId }
    const res = await axios.post("/api/userlog", data)
    console.log(res)
}

export const getPersonalBest = (exercise: string, arr: PersonalRecord[]) => {
    let targetExercise = arr.find(item => item.name === exercise)
    return targetExercise?.weight
}

export const getDaysInCurrentMonth = () => {
    const date = new Date();
    return new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();
}

export const getExerciseData = (exercise: string, personalBestRecords: PersonalDailyRecords[]) => {
    const labels = Array.from(Array(getDaysInCurrentMonth()).keys())
    let data
    let graphData = []
    let currentExercise = personalBestRecords.find(item => item.name === exercise)

    for (let i = 0; i < labels.length; i++) {
        let target = currentExercise?.days.find(log => log === i)
        if (target) {
            graphData.push(currentExercise?.weights[currentExercise?.days.indexOf(i)])
        } else graphData.push(0)
    }
    data = {
        chartData: {
            labels,
            data: graphData,
        },
        name: exercise
    }
    return data
}

export const getPersonalRecords = (
    userDays: number[],
    exerciseNames: { name: string, color: string }[],
    newLogs: { weight: number, day: number, exercise: string }[]
) => {
    let personalBestRecords: PersonalDailyRecords[] = []
    let exerciseRecord = []
    let exerciseDay: number[] = []
    for (let i = 0; i < exerciseNames.length; i++) {
        let name = exerciseNames[i].name
        exerciseRecord = []
        exerciseDay = []
        for (let k = 0; k < userDays.length; k++) {
            let currentDay = userDays[k]
            for (let j = 0; j < newLogs.length; j++) {
                if (newLogs[j].exercise === name && newLogs[j].day === currentDay) {
                    exerciseRecord.push(newLogs[j].weight)
                    exerciseDay.push(newLogs[j].day)
                }
            }
            if (exerciseRecord.length > 0) {
                let target = personalBestRecords.find(item => item.name === exerciseNames[i].name)
                if (!target) {
                    personalBestRecords.push({
                        name: exerciseNames[i].name,
                        color: exerciseNames[i].color,
                        weights: [Math.max(...exerciseRecord)],
                        days: [exerciseDay[exerciseRecord.indexOf(Math.max(...exerciseRecord))]]
                    })
                } else {
                    target.days.push(Math.max(...exerciseRecord))
                    target.weights.push(exerciseDay[exerciseRecord.indexOf(Math.max(...exerciseRecord))])
                }
            }
        }
    }
    return personalBestRecords
}