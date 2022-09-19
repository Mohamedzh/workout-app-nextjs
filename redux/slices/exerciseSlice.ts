import { WorkoutLine } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';
import { Exercise } from '../../types';


const initialState: WorkoutLine[] = []

const exerciseSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addExercises: (state, action: PayloadAction<WorkoutLine[]>) => {
            state = action.payload
        }
    }
})

export const { addExercises } = exerciseSlice.actions;
export default exerciseSlice.reducer