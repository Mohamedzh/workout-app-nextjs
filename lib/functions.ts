import { Exercise, WorkoutLine } from '@prisma/client'
import { NextRouter } from 'next/router'
import axios from 'axios'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { PersonalRecord, SignUp } from '../types'


export const signupUser = async (router: NextRouter, email: string, password: string, body: SignUp) => {
    const res = await supabaseClient.auth.signUp({ email, password }, { data: { name: body.firstName + " " + body.lastName } })
    await supabaseClient.auth.signIn({ email, password, }, { redirectTo: '/' })
    await axios.post("/api/signup", body)
    router.push('/')
}

export const loginUser = async (router: NextRouter, email: string, password: string) => {
    const res = await supabaseClient.auth.signIn({ email, password, }, { redirectTo: '/' })
    router.push('/')
}

export const signOut = async (router: NextRouter) => {
    try {
        const res = await supabaseClient.auth.signOut()
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