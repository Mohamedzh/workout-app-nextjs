import React from "react";
import Link from "next/link";
import { Workout } from "@prisma/client";
import Image from "next/image";

type Props = { workouts: Workout[] };

function WorkoutsSection({ workouts }: Props) {
  return (
    <div className="bg-slate-200">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mb-10 grid justify-items-center">
          <p className="text-4xl font-black">
            Browse our carefully curated exercises
          </p>
          <p className="text-lg text-gray-500 font-bold mt-3">
            Thoughtfully designed exercises meant to push you to the absolute
            limits
          </p>
        </div>
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {workouts.map((product) => (
            <Link href={product.href} key={product.id}>
              <a className="group">
                <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
                  <Image
                    layout="fill"
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3>{product.name}</h3>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkoutsSection;
