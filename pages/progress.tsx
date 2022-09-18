import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import Header from '../components/header'
import SideBar from '../components/sideBar'

type Props = {}

function progress({ }: Props) {
    return (
        <>
            <div>
                <SideBar />
                <div className="flex flex-1 flex-col md:pl-64">
                    <Header />
                    <main className="flex-1">
                        <div className="py-6 bg-slate-200 h-screen">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                            </div>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                {/* Replace with your content */}
                                {/* /End replace */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default progress

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
