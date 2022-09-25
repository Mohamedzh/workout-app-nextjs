import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useRouter } from "next/router";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from 'next/link';

export default function LoginModal({
    open, setOpen
}: {
    open: boolean, setOpen: Dispatch<SetStateAction<boolean>>
}) {

    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            supabaseClient.auth.signIn({ email: values.email, password: values.password })
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please enter your email address"),
            password: Yup.string().required("Please enter your password"),
        }),
    });

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className='text-lg font-bold text-center'>Please login to your account</div>
                                    <div >
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
                                                        {formik.touched.email && formik.errors.email ? <p className="text-red-500 text-sm">{formik.errors.email}</p> : null}
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
                                                        {formik.touched.password && formik.errors.password ? <p className="text-red-500 text-sm">{formik.errors.password}</p> : null}
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
                                                    <p className="mt-3">Don&apos;t have an account? <Link href="/signup"><a className="underline">Sign up</a></Link></p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Go back to dashboard
                                    </button>
                                </div> */}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
