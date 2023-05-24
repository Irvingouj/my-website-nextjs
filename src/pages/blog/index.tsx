import PostCard from '@/components/Postcard/Postcard';
import SearchBar from '@/components/SearchBar/SearchBar';
import Tags from '@/components/Tags/Tags';
import { muitheme } from '@/styles/theme';
import { CssBaseline, Stack, ThemeProvider } from '@mui/material';

const testPostProps = {
  title: 'test title',
  summary: 'test summary',
  author: 'test author',
  date: 'test date',
  image: '/react-logo.png',
};

export default function BlogPage() {
  return (
    <ThemeProvider theme={muitheme}>
      <CssBaseline />
      <main className="bg-main-background bg-cover h-[100vh]">
        <div>
          <h1 className="text-4xl text-center">Blog</h1>
        </div>
        <hr className="" />
        <div className="flex justify-center mt-[5vh]">
          <div className="flex justify-around align-middle max-w-[70vw]">
            <div className="flex-grow min-w-[20vw]">
              <Tags />
            </div>
            <div className="flex-grow-[2] flex justify-center align-middle">
              <Stack spacing={2} sx={{ minWidth: 650 }}>
                <PostCard
                  title={testPostProps.title}
                  summary={testPostProps.summary}
                  author={testPostProps.author}
                  date={testPostProps.date}
                  image={testPostProps.image}
                />
              </Stack>
            </div>

            <div className="flex-grow">
              <SearchBar />
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
