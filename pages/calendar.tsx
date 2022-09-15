import { Fragment, useState } from "react";
import Calendar from "../components/calendar";
import Header from "../components/header";
import SideBar2 from "../components/sideBar";

export default function CalendarPage() {

  return (
    <>
      <div>
        <SideBar2 />
        <div className="flex flex-1 flex-col md:pl-64">
          <Header />
          <main className="flex-1">
            <div className="py-6 bg-slate-200 h-screen">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <Calendar />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
