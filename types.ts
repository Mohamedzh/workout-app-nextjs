import { Exercise, UserLog, Workout, WorkoutLine } from "@prisma/client"


export interface Navigation {
  name: string
  href: string
  current: boolean
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

export interface SignUp {
  firstName: string
  lastName: string
  email: string
  password: string
  weight: string
  height: string
  gender: string
  age: string
}

export interface ExerciseWithSets extends Exercise {
  sets: string
  reps: string
}

export interface PersonalRecord {
  weight: number
  name: string
}

export interface NewUserLog extends UserLog {
  workoutLineRelation: NewWorkoutLine
}
export interface NewWorkoutLine extends WorkoutLine {
  exerciseRelation: Exercise
  workoutRelation: Workout
}

export interface PersonalDailyRecords {
  name: string
  color: string
  weights: number[]
  days: number[]
}

export interface PersonalRecords {
  name: string
  color: string
  weight: number
}
 