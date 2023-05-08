import { FC } from 'react';

interface LinkButtonProps {
  href: string;
  target?: string;
  children: React.ReactNode;
  rel?: string;
}

const LinkButton: FC<LinkButtonProps> = (prop: LinkButtonProps) => {
  return (
    <div className="flex justify-start">
      <a
        href={prop.href}
        target={prop.target}
        rel={prop.rel}
        className="rounded-full bg-button-blue text-white mt-[1rem] py-[0.5rem] min-h-[25px] min-w-[120px]
            text-center
            hover:bg-sky-700 transition duration-300 ease-in-out"
      >
        {prop.children}
      </a>
    </div>
  );
};

export default LinkButton;
