import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { NewUserLog } from "../lib/types";
import WorkoutHistory from "./workoutHistory";
import startOfToday from "date-fns/startOfToday";
import {
  format,
  eachDayOfInterval,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isToday,
  isSameMonth,
  isEqual,
  parse,
  add,
} from "date-fns";
import { useState } from "react";
import { UserLog, Workout, WorkoutLine, Exercise } from "@prisma/client";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar({ logs }: { logs: NewUserLog[] }) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayOfCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
  });

  function nextMonth() {
    let firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  }

  function previousMonth() {
    let firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  }

  return (
    <div className="md:grid md:grid-cols-10 md:divide-x md:divide-gray-300">
      <div className="col-span-6">
        <WorkoutHistory logs={logs} selectedDay={selectedDay} />
      </div>

      <div className="hidden col-span-4	max-w-md flex-none border-l border-gray-100 py-10 px-8 md:block">
        <div className="flex items-center text-center text-gray-900">
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={previousMonth}
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex-auto font-semibold">
            {format(firstDayOfCurrentMonth, "MMM, yyyy")}
          </div>
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={nextMonth}
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {days.map((day, dayIdx) => (
            <button
              key={day.toString()}
              onClick={() => setSelectedDay(day)}
              type="button"
              className={classNames(
                logs.length > 0
                  ? "py-1.5 hover:bg-gray-100 focus:z-10"
                  : "py-1.5 hover:bg-gray-100 focus:z-10",
                isSameMonth(day, today) ? "bg-white" : "bg-gray-50",
                (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                isEqual(day, selectedDay) &&
                  "text-white hover:bg-red-700 rounded-full bg-red-500",
                !isEqual(day, selectedDay) &&
                  isSameMonth(day, firstDayOfCurrentMonth) &&
                  !isToday(day) &&
                  "text-gray-900",
                !isEqual(day, selectedDay) &&
                  !isSameMonth(day, firstDayOfCurrentMonth) &&
                  !isToday(day) &&
                  "text-gray-400",
                isToday(day) && !isEqual(day, selectedDay) && "text-indigo-600",
                dayIdx === 0 && "rounded-tl-lg",
                dayIdx === 0 && "rounded-tl-lg",
                dayIdx === 6 && "rounded-tr-lg",

                logs.some((log) => {
                  new Date(log.createdAt).getDate() === day.getDate() &&
                  log.reps > 0
                    ? "dot"
                    : "";
                })
              )}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={classNames(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                )}
              >
                {format(day, "d")}
              </time>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
