import { AppThunk } from '@/utils/redux/store';
import { Tag } from '@/utils/redux/tagsSlice';
import { supabase } from '@/utils/supabase';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type BlogSummary = {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  tags: Tag[];
};

export interface BlogListState {
  blogs: BlogSummary[];
}

const initialState: BlogListState = { blogs: [] } as BlogListState;

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs: (state, action: PayloadAction<BlogSummary[]>) => {
      state.blogs = action.payload;
    },
  },
});

export const fetchBlogs = (): AppThunk => async (dispatch) => {
  const { data, error } = await supabase.from('blogs').select(`
    id,
    title,
    content,
    author_id,
    published_date,
    tags (id, name)
  `);

  if (error) {
    return;
  }
  if (!data) return;

  const transformedData: BlogSummary[] = data.map((blog) => ({
    id: blog.id,
    title: blog.title,
    content: blog.content,
    author: blog.author_id,
    created_at: blog.published_date ? blog.published_date : '',
    tags: blog.tags,
  }));

  dispatch(blogSlice.actions.setBlogs(transformedData));
};
