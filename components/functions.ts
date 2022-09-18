import { PrismaClient } from '@prisma/client'
import { NextRouter } from 'next/router'
import { supaBase } from './supabase'
import axios from 'axios'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'


export const signupUser = async (router: NextRouter, email: string, password: string) => {
    const res = await supabaseClient.auth.signUp({ email, password }, { redirectTo: '/login', data: { name: "miiiuiu" } })
    console.log({ res })
    const res2 = await supabaseClient.auth.signIn({ email, password, }, { redirectTo: '/' })
    await axios.get("/api/moustafa")
    router.push('/')

}

export const loginUser = async (router: NextRouter, email: string, password: string) => {
    const res = await supabaseClient.auth.signIn({ email, password, }, { redirectTo: '/' })
    console.log(res)
    router.push('/test')
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