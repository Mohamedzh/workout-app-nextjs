import { NextRouter } from 'next/router'
import { supaBase } from './supabase'

export const signupUser = async (router: NextRouter, email: string) => {
    const res = await supaBase.auth.signUp({ email })
    router.push('/')
}

export const loginUser = async (router: NextRouter, email: string, password: string) => {
    const res = await supaBase.auth.signIn({ email, password })
    router.push('/')
    alert('user logged in')
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}