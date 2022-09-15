import { NextPage } from 'next'
import Header from '../components/header'
import SideBar2 from '../components/sideBar'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js';



const Example: NextPage = ({ user }: { user?: User }) => {
    console.log({user})
    return (
        <>
            <div>
                <SideBar2 />
                <div className="flex flex-1 flex-col md:pl-64">
                    <Header />
                    <main className="flex-1">
                        <div className="py-6 bg-slate-200 h-screen">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                            </div>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <div><h1>Hello {user?.email}</h1></div>

                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default Example

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })