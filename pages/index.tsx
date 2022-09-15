import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import SideBar from '../components/sideBar'
import { middleware } from '../middleware/_middleware'


const Home: NextPage = () => {
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
                        {/**map workouts */}
                        {/* /End replace */}
                    </div>
                </div>
            </main>
        </div>
    </div>
</>
  )
}

export default Home
