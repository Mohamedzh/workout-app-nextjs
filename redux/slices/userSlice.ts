import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';


const initialState = {}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state = action.payload
        }
    }
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer