import { Exercise } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const OtherExercises = ({ other }: { other: Exercise[] }) => {
  const router = useRouter();
  return (
    <div className="bg-slate-200">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <hr className="border-solid border-gray-300 mb-14"></hr>
        <p className="text-2xl font-bold mb-7">Other Workouts</p>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {other.map((product) => (
            <Link
              key={product.id}
              href={`/workout/${router.query.workout}${product.href}`}
            >
              <a className="group">
                <div className="relativeaspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
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
};
export default OtherExercises;
