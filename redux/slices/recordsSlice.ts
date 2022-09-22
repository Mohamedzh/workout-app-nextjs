import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonalDailyRecords } from '../../types';


const initialState: PersonalDailyRecords[] = []

const recordsSlice = createSlice({
    name: 'records',
    initialState,
    reducers: {
        addRecords: (state, action: PayloadAction<PersonalDailyRecords[]>) => {
            return action.payload
        }
    }
})

export const { addRecords } = recordsSlice.actions;
export default recordsSlice.reducer