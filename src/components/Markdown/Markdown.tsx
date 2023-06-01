import { Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ReactMarkdown from 'markdown-to-jsx';
import React from 'react';

interface MarkdownListItemProps {
  children: React.ReactNode;
}

function MarkdownListItem({ children }: MarkdownListItemProps) {
  return (
    <Box component="li" sx={{ mt: 1, typography: 'body1' }}>
      {children}
    </Box>
  );
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
        component: 'h1',
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6', component: 'h2' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'caption',
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: { component: Link },
    li: {
      component: MarkdownListItem,
    },
  },
};

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return <ReactMarkdown options={options}>{children}</ReactMarkdown>;
}
