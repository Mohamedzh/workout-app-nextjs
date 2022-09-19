// import { UserLog } from "@prisma/client";
import { UserLog } from "@prisma/client";
import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import Calendar from "../components/calendar";
import Header from "../components/header";
import SideBar from "../components/sideBar";
import { prisma } from "../db/index";

export default function CalendarPage({
  updatedLog,
  user,
}: {
  updatedLog: UserLog[];
  user: User;
}) {



  return (
    <>
      <div>
        <SideBar />
        <div className='flex flex-1 flex-col md:pl-64'>
          <Header />
          <main className='flex-1  bg-slate-200 h-screen'>
            <div className='py-6'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'></div>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                <Calendar updatedLog={updatedLog} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps() {
    const WorkoutLog = await prisma?.userLog.findMany();
    const updatedLog = WorkoutLog.map((item) => {
      return {
        ...item,
        createdAt: item.createdAt.getTime(),
        updatedAt: item.updatedAt.getTime(),
      };
    });
    const workoutlines = await prisma.workoutLine.findMany();
    let selectedLog = []
    for (let i=0; i<workoutlines.length; i++) {
    selectedLog.push(updatedLog.find((item)=> item.workoutLineId === workoutlines[i].id))
  }
  console.log("hi", selectedLog)
  const workouts = await prisma.workout.findMany();
  // for (let i=0; i<workouts.length; i++) {
  //   const selectedWorkout = workouts.filter((item)=> item.workouts[i].id === selectedLog.workoutLineId);
  //   condole.log(selectedWorkout)
  // }
  

    return { props: { updatedLog } };
  },
});
