import React, { useEffect, useState } from "react";
import { prisma } from "../../lib/db/index";
import { Workout } from "@prisma/client";
import WorkoutsSection from "../../components/workoutsSection";
import { NextPage } from "next";
import { useUser } from "@supabase/auth-helpers-react";
import LoginModal from "../../components/loginModal";
import Layout from "../../components/layout/layout";

type Props = { workouts?: Workout[] };

const Workout: NextPage = ({ workouts }: Props) => {
  const { user, isLoading } = useUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user === null && isLoading === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [user]);

  return (
    <>
      <div className="bg-slate-200 h-screen">
        <Layout />
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1 bg-slate-200 h-screen">
            <div className="">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <LoginModal open={open} setOpen={setOpen} />
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <WorkoutsSection workouts={workouts!} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Workout;

export async function getStaticProps() {
  const workouts = await prisma.workout.findMany();
  return { props: { workouts }, revalidate: 86400 };
}
