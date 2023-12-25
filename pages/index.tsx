import { Exercise, WorkoutLine } from "@prisma/client";
import {
  supabaseClient,
  User,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Charts from "../components/charts";
import Dashboard from "../components/dashboard";
import Layout from "../components/layout/layout";
import { prisma } from "../lib/db";
import { getPersonalRecords } from "../lib/functions";
import { NewUserLog } from "../lib/types";

const Home: NextPage = ({
  exercises,
  logs,
  user,
  lines,
  streak,
}: {
  exercises?: Exercise[];
  logs?: NewUserLog[];
  user?: User;
  lines?: WorkoutLine[];
  streak?: number;
}) => {
  const router = useRouter();
  useEffect(() => {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        router.push("/newpassprompt");
      }
    });
  }, []);

  const userName = user?.user_metadata.name;
  const userLogs = logs?.filter((line) => line.userId === user?.id);

  let userDays: number[] = [];
  userLogs?.map((log) => {
    let day = new Date(log.createdAt).getDate();
    if (!userDays.includes(day)) {
      userDays.push(day);
    }
  });
  const exerciseNames = exercises?.map((exercise) => {
    return { name: exercise.name, color: exercise.color };
  });

  const newLogs = userLogs?.map((log) => {
    return {
      weight: log.weights,
      day: new Date(log.createdAt).getDate(),
      exercise: log?.workoutLineRelation?.exerciseRelation?.name,
    };
  });

  const [favoriteExercises, setFavorite] = useState<string[]>([
    "Squats",
    "Bicep Curl",
    "Bench Press",
    "Overhead Press",
  ]);

  const favoriteGraphs = getPersonalRecords(
    userDays,
    exerciseNames!,
    newLogs!
  ).filter((item) => favoriteExercises.find((one) => one === item.name));

  const userNums = userLogs?.map((log) => {
    let workLine = lines?.find((item) => item.id === log.workoutLineId);
    let exercise = exercises?.find(
      (exercise) => exercise.id === workLine?.exerciseId
    );
    return { weight: log.weights, name: exercise?.name };
  });

  let exerciseRecord = [];
  let personalBestRecords = [];
  for (let i = 0; i < exerciseNames!.length; i++) {
    let name = exerciseNames![i].name;
    exerciseRecord = [];
    for (let j = 0; j < userNums!.length; j++) {
      if (userNums![j].name === name) {
        exerciseRecord.push(userNums![j].weight);
      }
    }
    if (exerciseRecord.length > 0 && exerciseNames) {
      personalBestRecords.push({
        name: exerciseNames[i].name,
        weight: Math.max(...exerciseRecord),
        color: exerciseNames[i].color,
      });
    }
  }

  return (
    <>
      <div className=" bg-slate-200 h-screen">
        <Layout />
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1 bg-slate-200 h-screen">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8"></div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <Dashboard
                  personalBestRecords={personalBestRecords}
                  userName={userName}
                  favoriteExercises={favoriteExercises}
                  streak={streak}
                />
                <div className="mt-10">
                  <Charts personalBestRecords={favoriteGraphs!} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps() {
    let logs = await prisma.userLog.findMany({
      include: { workoutLineRelation: { include: { exerciseRelation: true } } },
      orderBy: { id: "desc" },
    });

    let streak = 0;
    const currentDayMonth = new Date().getDate() + new Date().getMonth();
    logs.forEach((log) => {
      const DayMonth =
        new Date(log.createdAt).getDate() + new Date(log.createdAt).getMonth();
      if (DayMonth === currentDayMonth) {
        streak = 1;
      } else if (currentDayMonth - DayMonth === streak) {
        streak += 1;
      }
    });

    const exercises = await prisma.exercise.findMany();
    let lines = await prisma.workoutLine.findMany();
    return {
      props: {
        logs: JSON.parse(JSON.stringify(logs)),
        exercises,
        lines: JSON.parse(JSON.stringify(lines)),
        streak,
      },
    };
  },
});
