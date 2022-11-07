# Workout Web App

![Homepage](/public/workout2.png)
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
A web app for workouts where users can choose from different workouts, log their exercises and monitor their progress for each exercise using graphs.
## Technologies
* React version: 18.2.0
* Next version: 12.3.1
* Typescript version:4.8.4
* TailwindCSS version: 3.1.8
* Redux toolkit version: 1.8.5
* Formik version: 2.2.9
* Axios version: 0.27.2
* Prisma version: 4.3.1
* React-chartjs-2 version: 4.3.1
*date-fns version: 2.29.3

## Functionalities
* View different workouts and exercises for each workout with recommended sets, reps and weights for each one.
* Log exercises with user-defined sets, reps and weights, along with a timer for plank and similar exercises.
* User dashboard showing the best achieved weight for favorite  exercises along with progress graphs.
* History calendar showing the activity history for chosen day.
* Progress page showing progress graphs for every exercise the user has played.
## Setup
To run this project:
* You'll need to provide a .env file with the following variables:
DATABASE_URL: database connection string
**(User authentication is based on supabase auth so you'll need to create a supabase database and use its API credentials to connect to the user auth tables in your database )
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

* Install it locally using npm:
```
npm install
npm run dev
```
Or you can view a live example on vercel [Here](https://workout-app-nextjs-6q67.vercel.app)

![Dashboard](/public/workout1.png.png)
![Progress Page](/public/workout3.png)
![Sign-up page](/public/workoutsignup.png)


