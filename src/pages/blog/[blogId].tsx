import Image from 'next/image';
import { FC } from 'react';

interface Props {
  id: string;
  title: string;
  content: string; // Markdown content
  author: string;
  authorAvatar: string;
  date: string;
}
const BlogPage: FC<Props> = ({
  title,
  content,
  author,
  authorAvatar,
  date,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <Image src={authorAvatar} alt={author} width={24} height={24} />
      <p>By {author}</p>
      <p>{date}</p>
      <p>{content}</p>
    </div>
  );
};

export function getAllPostIds() {
  // This is just placeholder data. You should fetch these from your backend.
  return [
    {
      params: {
        blogId: '1',
        title: 'First blog post',
        content: 'This is the **content** of the first blog post.',
      },
    },
    {
      params: {
        blogId: '2',
        title: 'Second blog post',
        content: 'This is the **content** of the second blog post.',
      },
    },
  ];
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { blogId: string; title: string; content: string };
}) {
  // Fetch the actual blog data from your backend here. This is just placeholder data.
  return {
    props: {
      fakedata: 'fake data',
      id: params.blogId,
      title: params.title,
      content: params.content,
    },
  };
}

export default BlogPage;
