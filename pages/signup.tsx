import React from "react";
import { NextPage } from "next";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {};

const Genders = [{ name: "Male" }, { name: "Female" }];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const signup: NextPage = (props: Props) => {
  const [selected, setSelected] = useState(Genders[1]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      // imageUrl: "",
      weight: "",
      height: "",
      age: "",
    },
    // validationSchema: Yup.object({
    //   title: Yup.string()
    //     .min(8, "Must be 8 characters or more")
    //     .required("Required"),
    //   body: Yup.string().required("Required"),
    // }),
    onSubmit: (values) => {
      const body = { ...values, selected };
    },
  });
  return (
    <div className='flex min-h-full h-screen'>
      <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img className='h-12 w-auto' src='/logo-4.png' alt='Your Company' />
            <h2 className='mt-6 text-3xl font-bold tracking-tight text-gray-900'>
              Create a New account
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Or{" "}
              <a
                href='#'
                className='font-medium text-gray-900 hover:text-indigo-900'
              >
                sign in to an existing account
              </a>
            </p>
          </div>

          <div className='mt-8'>
            <div className='mt-6'>
              <form action='#' method='POST' className='space-y-6'>
                <div>
                  <div className="flex space-x-3">
                    <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700'
                    >
                      First name
                    </label>
                    <div className='mt-1'>
                      <input
                        id='firstName'
                        name='firstName'
                        type='text'
                        autoComplete='firstName'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                    </div>
                    <div className=''>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Last name
                      </label>
                      <div className='mt-1'>
                        <input
                          id='lastName'
                          name='lastName'
                          type='text'
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete='lastName'
                          required
                          className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='space-y-1'>
                  <label
                    htmlFor='password'
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
                      autoComplete='current-password'
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
                <div className='flex justify-center'>
                  <div className='mb-3 xl:w-96'>
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className='block text-sm font-medium text-gray-700'>
                            Gender
                          </Listbox.Label>
                          <div className='relative mt-1'>
                            <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
                              <span className='block truncate'>
                                {selected.name}
                              </span>
                              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                <ChevronUpDownIcon
                                  className='h-5 w-5 text-gray-400'
                                  aria-hidden='true'
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave='transition ease-in duration-100'
                              leaveFrom='opacity-100'
                              leaveTo='opacity-0'
                            >
                              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                {Genders.map((gender, index) => (
                                  <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "text-white bg-indigo-600"
                                          : "text-gray-900",
                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={gender}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "block truncate"
                                          )}
                                        >
                                          {gender.name}
                                        </span>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-indigo-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className='h-5 w-5'
                                              aria-hidden='true'
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                </div>
                <div className='flex'>
                  <div>
                    <label
                      htmlFor='search'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Age
                    </label>
                    <div className='relative mt-1 flex items-center'>
                      <input
                        type='number'
                        name='age'
                        id='age'
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                      <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
                        <kbd className='inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400'>
                          years
                        </kbd>
                      </div>
                    </div>
                  </div>
                  <div className='mx-3'>
                    <label
                      htmlFor='search'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Weight
                    </label>

                    <div className='relative mt-1 flex items-center'>
                      <input
                        type='number'
                        name='weight'
                        id='weight'
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                      <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
                        <kbd className='inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400'>
                          kgs
                        </kbd>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='search'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Height
                    </label>

                    <div className='relative mt-1 flex items-center'>
                      <input
                        type='number'
                        name='height'
                        id='height'
                        value={formik.values.height}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                      <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
                        <kbd className='inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400'>
                          cm
                        </kbd>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type='button'
                    onClick={() => formik.handleSubmit()}
                    className='bg-gray-900 flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Sign up
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
          src='/signup.jpg'
          alt=''
        />
      </div>
    </div>
  );
};

export default signup;
