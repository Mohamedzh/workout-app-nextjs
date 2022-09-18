export interface Workout {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
}

export interface Exercise {
  id: number
  name: string
  description: string
  imageUrl: string
  videoUrl?: string
}

export interface Navigation {
  name: string
  href: string
  current: boolean
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}