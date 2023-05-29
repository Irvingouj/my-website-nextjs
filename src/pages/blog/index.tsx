import PostCard from '@/components/Postcard/Postcard';
import SearchBar from '@/components/SearchBar/SearchBar';
import Tags from '@/components/Tags/Tags';
import { muitheme } from '@/styles/theme';
import { fetchBlogs } from '@/utils/redux/blogSlice';
import { fetchProfileName } from '@/utils/redux/profileSlice';
import { useAppSelector, withStore } from '@/utils/redux/store';
import { Avatar, CssBaseline, Stack, ThemeProvider } from '@mui/material';
import {
  Session,
  User,
  createPagesServerClient,
} from '@supabase/auth-helpers-nextjs';
import { InferGetServerSidePropsType, NextPage } from 'next';
import Image from 'next/image';

const BlogIndexPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const blogs = useAppSelector((state) => state.blogs).blogs;
  const currentUserName = useAppSelector((state) => state.profile).name;

  return (
    <ThemeProvider theme={muitheme}>
      <CssBaseline />
      <main className="bg-main-background bg-cover h-[100vh]">
        <div className="sticky min-h-[75px] bg-white flex justify-between">
          <div className="flex flex-row justify-start relative flex-1 max-h-[60px] mt-[5px] max-w-[300px]">
            <Image src="/irving-ou.svg" alt="logo" fill className="" />
          </div>
          <div className="flex flex-col justify-center align-middle min-w-[15vw] mx-[2vw]">
            <div className="flex min-w-full justify-around">
              <Avatar sx={{ background: '#f2f6fa' }}>
                <Image
                  src="/linkendin.png"
                  alt="LinkedIn"
                  width={40}
                  height={40}
                />
              </Avatar>
              <Avatar sx={{ background: '#f2f6fa' }}>
                <Image src="/github.png" alt="GitHub" width={40} height={40} />
              </Avatar>
              <Avatar sx={{ background: '#f2f6fa' }}>
                <Image src="/wechat.png" alt="WeChat" width={40} height={40} />
              </Avatar>
            </div>
          </div>
        </div>
        <hr className="" />

        <div className="flex justify-center align-middle">
          <div className="grid grid-cols-[2fr_1fr] mt-[5vh]">
            <div className="flex-grow-[2] flex justify-center align-middle">
              <Stack spacing={2} sx={{ minWidth: 600, mx: '2rem' }}>
                {blogs.map((blog) => (
                  <PostCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    summary={blog.content}
                    author={currentUserName}
                    date={formatDate(blog.created_at)}
                    image="/react-logo.png" // Assuming you don't have an image URL in the blog data, so left blank
                    tags={['react', 'nextjs', 'mui']} // Tags seem to be static, so left as is
                  />
                ))}
              </Stack>
            </div>

            <div className="flex-grow">
              <SearchBar />
              <div className="relative py-4 my-[10px]">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-b border-gray-300"></div>
                </div>
              </div>
              <div className="flex-grow min-w-[15vw ] mt-[1vh]">
                <Tags />
              </div>
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export const getServerSideProps = withStore<{
  initialSession: Session;
  user: User;
}>(async (store, ctx) => {
  await store.dispatch(fetchBlogs());
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };

  await store.dispatch(fetchProfileName(session.user));

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
});

export default BlogIndexPage;
