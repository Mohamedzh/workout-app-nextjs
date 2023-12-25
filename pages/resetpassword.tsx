import { NextPage } from "next";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import { resetPassword, signOut } from "../lib/functions";
import { User } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";

const Reset: NextPage = () => {
  const router = useRouter();
  const { user, error } = useUser();

  const [show, setShow] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      resetPassword(values.email);
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email address"),
    }),
  });

  return (
    <>
      <div className="flex min-h-full h-screen">
        {user === null ? (
          <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="relative mx-auto w-full max-w-sm lg:w-96">
              <div>
                <Image
                  height={48}
                  width={138}
                  src="/logo-4.png"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                  Reset your password
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Or{" "}
                  <Link href="/signup">
                    <a className="font-medium text-gray-900 hover:text-indigo-900">
                      create a new account
                    </a>
                  </Link>
                </p>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form action="#" method="POST" className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="email"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <p className="text-red-500 text-sm">
                            {formik.errors.email}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="bg-gray-900 flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => formik.handleSubmit()}
                      >
                        Send password reset link
                      </button>
                      <p
                        className="cursor-pointer mt-3"
                        onClick={() => setShow(true)}
                      >
                        <Link href="/login">
                          <a className="hover:underline">
                            Login with your account
                          </a>
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>You are already loggedIn as user {user?.email}</h1>
            <div>
              <button
                className="bg-gray-900 flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => signOut(router)}
              >
                Sign Out
              </button>
            </div>
            <div>
              <button
                className="bg-gray-900 flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => router.push("/")}
              >
                Return to your dashboard
              </button>
            </div>
          </div>
        )}
        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            layout="fill"
            className="absolute inset-0 h-full w-full object-cover"
            src="/login.jpg"
            alt="workout login pic"
          />
        </div>
      </div>
    </>
  );
};

export default Reset;
