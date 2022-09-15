import { PrismaClient } from '@prisma/client'
import { NextRouter } from 'next/router'
import { supaBase } from './supabase'
import axios from 'axios'

export const signupUser = async (router: NextRouter, email: string, password: string) => {
    const res = await supaBase.auth.signUp({ email, password }, { data: { name: "miiiuiu" } })
    console.log({ res })
    await axios.get("/api/moustafa")

    // router.push('/')
}

export const loginUser = async (router: NextRouter, email: string, password: string) => {
    const res = await supaBase.auth.signIn({ email, password })
    // router.push('/')
    alert('user logged in')
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

// export const prisma = new PrismaClient();