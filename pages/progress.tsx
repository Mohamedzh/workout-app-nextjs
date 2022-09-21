import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import Header from '../components/header'
import SideBar from '../components/sideBar'
import StockChart from '../components/stockChart'

type Props = {}

function progress({ }: Props) {

    const data = {
        chartData: {
            labels: [
                "10:00",
                "",
                "",
                "",
                "12:00",
                "",
                "",
                "",
                "2:00",
                "",
                "",
                "",
                "4:00",
            ],
            data: [
                2.23,
                2.215,
                2.22,
                2.25,
                2.245,
                2.27,
                2.28,
                2.29,
                2.3,
                2.29,
                2.325,
                2.325,
                2.32,
            ],
        },
    };

    return (
        <>
            <div className='bg-slate-200 h-screen'>
                <SideBar />
                <div className="flex flex-1 flex-col md:pl-64">
                    <Header />
                    <main className="flex-1 ">
                        <div className="py-6">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                            </div>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <div className="min-w-screen min-h-screen bg-blue-500  flex items-center justify-center px-5 py-5">
                                    <StockChart info={data} />
                                </div>
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
