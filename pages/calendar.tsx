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
      <div className=" bg-slate-200 h-screen">
        <SideBar />
        <div className='flex flex-1 flex-col md:pl-64'>
          <Header />
          <main className='flex-1'>
            <div className='py-6'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
              </div>
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
    console.log("object");
    const WorkoutLog = await prisma?.userLog.findMany();
    const updatedLog = WorkoutLog.map((item) => {
      return {
        ...item,
        createdAt: item.createdAt.getTime(),
        updatedAt: item.updatedAt.getTime(),
      };
    });
    const workoutlines = await prisma.workoutLine.findMany();

    const selectedWorkoutLine = workoutlines.find((item, index) => item.id === updatedLog[index].workoutLineId)
    const workouts = await prisma.workout.findMany()
    const selectedWorkout = workouts.find((item) => item.id === selectedWorkoutLine?.workoutId)

    return { props: { updatedLog } };
  },
});
