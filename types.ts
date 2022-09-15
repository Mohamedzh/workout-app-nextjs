export interface Workout {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
}

export interface Exercise{
    id: number
    name: string
    description: string
    imageUrl: string
    videoUrl?: string
}