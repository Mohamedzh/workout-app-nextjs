import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Dashboard from '../components/dashboard'
import Header from '../components/header'
import SideBar from '../components/sideBar'


const Home: NextPage = () => {
    return (
        <>
            <div>
                <SideBar />
                <div className="flex flex-1 flex-col md:pl-64">
                    <Header />
                    <main className="flex-1  bg-slate-200 h-screen">
                        <div className="py-6">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                            </div>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <Dashboard />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Home

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
