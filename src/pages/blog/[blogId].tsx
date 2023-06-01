import Markdown from '@/components/Markdown/Markdown';
import { formatDate } from '@/pages/blog';
import { supabase } from '@/utils/supabase';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Avatar, Typography } from '@mui/material';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const BlogPage = ({
  title,
  content,
  published_date,
  user_name,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="bg-main-background min-h-screen bg-cover">
      <div className="sticky min-h-[50px] bg-white flex justify-between shadow-md">
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

      <div className="flex justify-center align-middle">
        <div className=" flex-b min-h-screen bg-white shadow-md  md:min-w-[768px] min-w-[100vw]">
          <div className="mt-[50px] mx-[2vh]">
            <Typography variant="subtitle1" color="#0072E5">
              <Link href="/blog" className="hover:text-blue-300">
                <KeyboardArrowLeftIcon />
                Back to Blog
              </Link>
            </Typography>
            <Typography variant="subtitle2" mt="30px">
              {published_date && formatDate(published_date)}
            </Typography>
            <Typography
              variant="h5"
              mb="20px"
              sx={{ fontSize: '2.25rem', fontWeight: 700 }}
            >
              {title}
            </Typography>
            <Typography variant="subtitle1">{user_name}</Typography>
            <br />
            <Markdown>{content ? content : ''}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getAllPostIds() {
  const { data } = await supabase.from('blogs').select('id').throwOnError();
  return data?.map((post) => ({
    params: {
      blogId: post.id.toString(),
    },
  }));
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { blogId },
}: {
  params: { blogId: string };
}) {
  if (!blogId) throw new Error('blogId is undefined');
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', blogId)
    .single()
    .throwOnError();

  const { data: author } = await supabase
    .from('profiles')
    .select('user_name')
    .eq('id', data?.author_id)
    .single()
    .throwOnError();

  // Fetch the actual blog data from your backend here. This is just placeholder data.
  return {
    props: {
      ...data,
      ...author,
    },
  };
}

export default BlogPage;
