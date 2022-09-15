import { Exercise } from "@prisma/client";
import React from "react";
import Header from "../../components/header";
import SideBar from "../../components/sideBar";
import SideBar2 from "../../components/sideBar";
import { prisma } from "../../db/index";
import workout from './index';

const products = [
  {
    id: 1,
    name: "Focus Paper Refill",
    href: "#",
    price: "$13",
    description: "3 sizes available",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 2,
    name: "Focus Card Holder",
    href: "#",
    price: "$64",
    description: "Walnut",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg",
    imageAlt: "Paper card sitting upright in walnut card holder on desk.",
  },
  {
    id: 3,
    name: "Focus Carry Case",
    href: "#",
    price: "$32",
    description: "Heather Gray",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg",
    imageAlt:
      "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
  },
  // More products...
];
function Workout({ target }: { target: Exercise[] }) {
  return (
    <>
      <div>
        <SideBar2 />
        <div className='flex flex-1 flex-col md:pl-64'>
          <Header />
          <main className='flex-1'>
            <div className='py-6 bg-slate-200 h-screen'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'></div>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                <div className='bg-white'>
                  <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
                    <h2 id='products-heading' className='sr-only'>
                      Products
                    </h2>

                    <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
                      {target.map((product) => (
                        <a
                          key={product.id}
                          //   href={product.href}
                          className='group'
                        >
                          <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3'>
                            <img
                              src={product.imageUrl}
                              alt='product.imageAlt'
                              className='h-full w-full object-cover object-center group-hover:opacity-75'
                            />
                          </div>
                          <div className='mt-4 flex items-center justify-between text-base font-medium text-gray-900'>
                            <h3>{product.name}</h3>
                          </div>
                          {/* <p className='mt-1 text-sm italic text-gray-500'>
                            {product.name}
                          </p> */}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Workout;

export async function getStaticPaths() {
  console.log("hello world");
  const workouts = await prisma.workout.findMany();
  console.log({ workouts });
  return {
    paths: workouts.map((item) => ({
      params: {
        workout: item.id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { workout: string } }) {
  console.log("inside", { params });
  const exercises = await prisma.workoutLine.findMany();
  const currentExercises = exercises.filter((line) => {
    line.workoutId === +params.workout;
  });
  let target: Exercise[] = [];
  console.log({ exercises, currentExercises, target });
  for (let i = 0; i < currentExercises.length; i++) {
    const x = await prisma.exercise.findFirst({
      where: { id: currentExercises[i].exerciseId },
    });
    if (x) target.push(x);
  }
  return { props: { target } };
}
