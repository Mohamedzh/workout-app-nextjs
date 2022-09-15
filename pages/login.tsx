import { NextPage } from "next";
import React from "react";
import { useFormik } from "formik";
import { supaBase } from '../components/supabase'
import { useRouter } from "next/router";
import Link from "next/link";
import { loginUser } from "../components/functions";

type Props = {};

const login: NextPage = (props: Props) => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: Yup.object({
    //   title: Yup.string()
    //     .min(8, "Must be 8 characters or more")
    //     .required("Required"),
    //   body: Yup.string().required("Required"),
    // }),
    onSubmit: (values) => {
      loginUser(router, values.email, values.password)
    },
  });
  return (
    <>
      <div className='flex min-h-full h-screen'>
        <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <img
                className='h-12 w-auto'
                src='/logo-4.png'
                alt='Your Company'
              />
              <h2 className='mt-6 text-3xl font-bold tracking-tight text-gray-900'>
                Sign in to your account
              </h2>
              <p className='mt-2 text-sm text-gray-600'>
                Or{" "}
                <Link href='/signup'>
                  <a
                    className='font-medium text-gray-900 hover:text-indigo-900'
                  >
                    create new account
                  </a>
                </Link>
              </p>
            </div>

            <div className='mt-8'>
              <div className='mt-6'>
                <form action='#' method='POST' className='space-y-6'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email address
                    </label>
                    <div className='mt-1'>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete='email'
                        required
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Password
                    </label>
                    <div className='mt-1'>
                      <input
                        id='password'
                        name='password'
                        type='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete='current-password'
                        required
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type='button'
                      className='bg-gray-900 flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      onClick={() => formik.handleSubmit()}
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='relative hidden w-0 flex-1 lg:block'>
          <img
            className='absolute inset-0 h-full w-full object-cover'
            src='/login.jpg'
            alt=''
          />
        </div>
      </div>
    </>
  );
};

export default login;
