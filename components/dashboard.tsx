import { CheckCircleIcon, FireIcon } from "@heroicons/react/20/solid";
import { getPersonalBest } from "../lib/functions";
import { useRouter } from "next/router";
import { PersonalRecords } from "../lib/types";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard({
  personalBestRecords,
  userName,
  favoriteExercises,
  streak,
}: {
  personalBestRecords: PersonalRecords[];
  userName: string;
  favoriteExercises: string[];
  streak: number | undefined;
}) {
  const router = useRouter();

  const favorite = personalBestRecords.filter((record) =>
    favoriteExercises.find((item) => item === record.name)
  );

  return (
    <>
      <div className="mt-6 ml-6 bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="min-w-0 flex-1">
              <div className="flex relative items-center">
                <div className="sm:block hidden">
                  <Image
                    height={64}
                    width={64}
                    className="rounded-full"
                    src="/avatar.png"
                    alt="Avatar"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="sm:hidden">
                      <Image
                        height={64}
                        width={64}
                        className="rounded-full block"
                        src="/avatar.png"
                        alt="Avatar"
                      />
                    </div>
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                      Good morning, {userName}
                    </h1>
                  </div>
                  <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                      <FireIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-600"
                        aria-hidden="true"
                      />
                      {streak} day streak
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <Link href={"/workout"}>
              <a
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                Browse workouts
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Personal Records
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {favorite.map((card) => (
              <div
                key={card.name}
                className={`overflow-hidden ${card.color} rounded-lg shadow`}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-white">
                          {card.name}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-white">
                            {getPersonalBest(card.name, personalBestRecords) ||
                              0}{" "}
                            Ibs
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
