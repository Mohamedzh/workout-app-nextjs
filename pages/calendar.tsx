// import { UserLog } from "@prisma/client";
import { UserLog, Workout, WorkoutLine, Exercise } from "@prisma/client";
import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import Calendar from "../components/calendar";
import Header from "../components/header";
import SideBar from "../components/sideBar";
import { prisma } from "../db/index";

export default function CalendarPage({
  logs
}: {
  logs: UserLog[];
}) {
  console.log(logs)
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
                <Calendar
                  logs={logs}
                />
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
    const logs = await prisma?.userLog.findMany({ include: { workoutLineRelation: { include: { exerciseRelation: true, workoutRelation: true } } } });
    // const logs = await prisma.workoutLine.findMany({include: {userLogs: true}});
    console.log("hi", logs)
    // );
    return { props: { logs: JSON.parse(JSON.stringify(logs)) } };
  },
});
