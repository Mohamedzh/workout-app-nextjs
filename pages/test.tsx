import { NextPage } from 'next'
import Header from '../components/header'
import SideBar2 from '../components/sideBar'

const Example: NextPage = () => {

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
                                {/* Replace with your content */}
                                {/* <div className="py-4">
                                    <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                                </div> */}
                                {/* /End replace */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default Example