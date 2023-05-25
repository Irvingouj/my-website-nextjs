import PostCard from '@/components/Postcard/Postcard';
import SearchBar from '@/components/SearchBar/SearchBar';
import Tags from '@/components/Tags/Tags';
import { muitheme } from '@/styles/theme';
import { Avatar, CssBaseline, Stack, ThemeProvider } from '@mui/material';
import Image from 'next/image';

const testPostProps = {
  title: 'test title',
  summary: 'test summary',
  author: 'test author',
  date: 'test date',
  image: '/react-logo.png',
};

export default function BlogIndexPage() {
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
                <PostCard
                  title={testPostProps.title}
                  summary={testPostProps.summary}
                  author={testPostProps.author}
                  date={testPostProps.date}
                  image={testPostProps.image}
                  tags={['reacr', 'nextjs', 'mui']}
                />
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
}
