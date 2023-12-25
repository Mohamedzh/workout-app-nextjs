import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import Calendar from "../components/calendar";
import Layout from "../components/layout/layout";
import { prisma } from "../lib/db/index";
import { NewUserLog } from "../lib/types";

export default function CalendarPage({
  logs,
}: {
  logs: NewUserLog[];
  test: any;
}) {
  return (
    <>
      <div className=" bg-slate-200 h-full">
        <Layout />
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8"></div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <Calendar logs={logs} />
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
    const logs = await prisma?.userLog.findMany({
      include: {
        workoutLineRelation: {
          include: { exerciseRelation: true, workoutRelation: true },
        },
      },
    });
    return { props: { logs: JSON.parse(JSON.stringify(logs)) } };
  },
});
