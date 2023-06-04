import { AppThunk } from '@/utils/redux/store';
import { supabase } from '@/utils/supabase';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Tag = {
  id: number;
  name: string;
  selected?: boolean;
};

type TagsState = Tag[];

const initialState: TagsState = [];

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    initTags: (_state, action: PayloadAction<TagsState>) => {
      return action.payload.map((tag) => {
        return { ...tag, selected: true };
      });
    },
    toggleSelectTag(state, action: PayloadAction<number>) {
      const index = state.findIndex((tag) => tag.id === action.payload);
      state[index].selected = !state[index].selected;
    },
  },
});

export const fetchTags = (): AppThunk => async (dispatch) => {
  const { data, error } = await supabase.from('tags').select('id, name');

  if (error || !data) {
    return;
  }

  dispatch(tagsSlice.actions.initTags(data));
};

export const { toggleSelectTag } = tagsSlice.actions;
