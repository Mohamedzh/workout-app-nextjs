import { Exercise, PrismaClient, WorkoutLine } from '@prisma/client'
import { NextRouter } from 'next/router'
import { supaBase } from './supabase'
import axios from 'axios'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { Dispatch } from '@reduxjs/toolkit'
import { addExercises } from '../redux/slices/exerciseSlice'
import { SignUp } from '../types'


export const signupUser = async (router: NextRouter, email: string, password: string, body: SignUp) => {
    const res = await supabaseClient.auth.signUp({ email, password }, { redirectTo: '/login', data: { name: "miiiuiu" } })
    console.log({ res })
    const res2 = await supabaseClient.auth.signIn({ email, password, }, { redirectTo: '/' })
    await axios.post("/api/signup", body)
    router.push('/')

}

export const loginUser = async (router: NextRouter, email: string, password: string) => {
    const res = await supabaseClient.auth.signIn({ email, password, }, { redirectTo: '/' })
    console.log(res)
    router.push('/')
    // alert('user logged in')
}

export const signOut = async (router: NextRouter) => {
    try {
        const res = await supabaseClient.auth.signOut()
        console.log(res)
        router.push('/login')

        // const res_back = await supaBase.auth.api.signOut(supabase.auth.token)
        // console.log(res_back)
    } catch (error) {
        console.log(error)
    }

}
export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

// export const prisma = new PrismaClient();

// export const getExercise = async (dispatch: Dispatch) => {
//     try {
//         const res = await axios.get("http://localhost:3000/api/exerciseLine")
//         console.log('function')
//         console.log(res.data)
//         dispatch(addExercises(res.allExerciseLines))
//     } catch (error) {
//         console.log(error)
//     }
// }

export const addUserLog = async (set, lineId: string) => {
    const data = { step: set.index, rec: set.rec, weights: set.weights, workoutLineId: lineId }
    const res = await axios.post("/api/userlog", data)

}