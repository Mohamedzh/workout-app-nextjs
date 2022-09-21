import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import SideBar from "../../components/sideBar";
import { prisma } from '../../db/index';
import Link from "next/link";
import { Workout } from "@prisma/client";
import WorkoutsSection from "../../components/workoutsSection";
import { NextPage } from "next";
import { useUser } from "@supabase/auth-helpers-react";
import LoginModal from "../../components/loginModal";
import { useRouter } from "next/router";

type Props = { workouts?: Workout[] };

const Workout: NextPage = ({ workouts }: Props) => {
  const { user } = useUser()
  const [open, setOpen] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if (user === null) {
      router.push('/login')
    }
    // if (user.user === null) {
    //   setOpen(true)
    // } else { setOpen(false) }
  }, [user])

  return (
    <>
      <div className="bg-slate-200 h-screen">
        <SideBar />
        <div className='flex flex-1 flex-col md:pl-64'>
          <Header />
          <main className='flex-1'>
            <div className=''>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                {/* <LoginModal open={open} setOpen={setOpen} /> */}
              </div>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                <WorkoutsSection workouts={workouts!} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Workout;

export async function getStaticProps() {
  const workouts = await prisma.workout.findMany();
  return { props: { workouts } };
}
