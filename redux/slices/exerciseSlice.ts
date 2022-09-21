import { WorkoutLine } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: WorkoutLine[] = []

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        addExercises: (state, action: PayloadAction<WorkoutLine[]>) => {
            state = action.payload
        }
    }
})

export const { addExercises } = exerciseSlice.actions;
export default exerciseSlice.reducer