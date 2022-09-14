import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import SideBar from '../components/sideBar'
import { middleware } from '../middleware/_middleware'


const Home: NextPage = () => {
  return (
    <div>
     <SideBar/>
    </div>
  )
}

export default Home
