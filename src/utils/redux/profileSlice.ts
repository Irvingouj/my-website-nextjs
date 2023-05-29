import { AppThunk } from '@/utils/redux/store';
import { supabase } from '@/utils/supabase';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '@supabase/auth-helpers-nextjs';

export type ProfileState = {
  name: string;
};

const initialState: ProfileState = {
  name: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const fetchProfileName =
  (user: User): AppThunk =>
  async (dispatch) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('user_name')
      .eq('id', user.id)
      .single();

    if (error || !data) {
      return;
    }

    dispatch(profileSlice.actions.setProfileName(data.user_name));
  };
