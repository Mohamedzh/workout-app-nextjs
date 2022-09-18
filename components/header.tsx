import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
    Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline'
import { classNames, signOut } from './functions'
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react'
import { addUser } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux'

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

type Props = {}

function Header({ }: Props) {
    const dispatch = useDispatch()
    const user = useUser()

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter()
    useEffect(() => {
        console.log(user)
        // if(user){
        //     dispatch(addUser(user))
        // }
    }, [])

    return (
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
            >
                <span className="sr-only">Open sidebar</span>
                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 place-content-end px-4">
                <div className="ml-4 flex justify-items-end items-center md:ml-6">
                    {/* Profile dropdown */}
                    <p className='flex-1'>Name</p>
                    <Menu as="div" className="relative  ml-3">
                        <div className=''>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                            <a
                                                onClick={() => signOut(router)}
                                                href={item.href}
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>

    )
}

export default Header