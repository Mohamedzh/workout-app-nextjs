export interface Workout {
  id: number
  name: string
  imageSrc: string
  imageAlt: string
  href: string
}

export interface Exercise {
  id: number
  name: string
  description: string
  imageUrl: string
  videoUrl: string
  href: string
}

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
  weight: number
  height: number
  gender: string
  age: number
}