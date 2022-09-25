import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import { ExerciseWithSets } from '../types';
import { AddedExercises } from '../pages/workout/[workout]';


function ExercisesSection({ exercises }: { exercises: AddedExercises[] }) {
    const router = useRouter()
    return (
        <div className='bg-slate-200'>
            <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
                <h2 id='products-heading' className='sr-only'>
                    Products
                </h2>
                <h1 className='text-4xl font-black mb-7'>{exercises[0].workoutRelation.name}</h1>

                <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
                    {exercises.map((product) => (
                        <Link
                            key={product.id}
                            href={`/workout/${router.query.workout}${product.exerciseRelation.href}`}>
                            <a className='group'>
                                <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3'>
                                    <img
                                        src={product.exerciseRelation.imageSrc}
                                        alt={product.exerciseRelation.imageAlt}
                                        className='h-full w-full object-cover object-center group-hover:opacity-75'
                                    />
                                </div>
                                <div className='mt-4 items-center justify-between text-base font-medium text-gray-900'>
                                    <p className="text-xl">{product.exerciseRelation.name}</p>
                                    <p className='my-2 text-gray-400 text-base italic'>{product.recSets} sets X {product.recReps} reps</p>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExercisesSection