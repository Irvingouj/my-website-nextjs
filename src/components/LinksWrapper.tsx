/* eslint-disable @next/next/no-img-element */
import LinkButton from '@/components/LinkButton';
import Image from 'next/image';
import { FC } from 'react';

const LinksWrapper: FC = () => {
  return (
    <div id="links-wrapper" className=" mt-[3rem] mb-[3rem] sm:px-[5rem]">
      <div className="h-[180vh] sm:h-[70vh]">
        <ul className="flex justify-between h-full flex-col md:flex-row">
          <li className="mb-[2rem] sm:mb-0 sm:flex-1 sm:mx-[2rem] bg-second-background bg-cover rounded-3xl flex flex-col h-full p-[2rem] max-w-[500px] background-cover overflow-hidden">
            <div className=" rounded relative flex-1">
              <a
                className="block w-full h-full relative overflow-hidden rounded-3xl"
                href="Software_Engineer_Resume__8.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/resume-icon.jpg"
                  alt="Resume Icon"
                  fill
                  className="rounded-3xl object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
                <h3 className="absolute bottom-0 left-0 pb-2 pl-2 bg-heading-background w-full text-white bg-cover">
                  Resume
                </h3>
              </a>
            </div>
            <div className="mt-[2rem] flex flex-col justify-between">
              <p
                className="text-base font-serif whitespace-normal 
              leading-relaxed indent-8 text-links-text
              tracking-normal mb-[1rem]"
              >
                You looking for a software engineer with a passion for
                technology? Look no further! I guarantee you that I am the best
                candidate for the job. Hit the download button below to view my
                resume!.
              </p>
              <LinkButton
                href="Software_Engineer_Resume__8.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </LinkButton>
            </div>
          </li>
          <li className="grid sm:flex-1 sm:mx-[2rem] bg-second-background bg-cover rounded-3xl justify-between h-full max-w-[500px] p-[2rem] overflow-hidden">
            <div className="flex mb-[2rem] h-fit">
              <a
                href="https://github.com/Irvingouj/my-website"
                className="block overflow-hidden rounded-3xl w-full h-fit relative"
              >
                <div className="relative w-full h-fit">
                  <Image
                    src="/openai-react-logo.png"
                    alt="OpenAI React Logo"
                    width={500}
                    height={500}
                    className="transition-transform duration-300 hover:scale-110 object-contain"
                  />
                </div>

                <h3 className="absolute bottom-0 left-0 pb-2 pl-2 bg-heading-background w-full text-white bg-cover">
                  Fun fact about this website
                </h3>
              </a>
            </div>
            <div className="flex justify-end flex-col">
              <p
                className="text-base font-serif whitespace-normal 
              leading-relaxed indent-8 text-links-text
              tracking-normal mb-[1rem]"
              >
                This personal portfolio website is designed to showcase my
                skills and experiences, built using the latest technologies such
                as React and Typescript. And, in keeping with my passion for
                technology, the site features a chatbox powered by OpenAI,
                allowing visitors to ask me anything and get to know me better.
                However, if you're looking for my secret OpenAI key, I'm afraid
                you're out of luck - it's safely stored in my backend service
                using Azure Functions. And, for those who value their privacy,
                just know that any information shared in the chatbox will be
                kept confidential (Beware Open AI has access to it). So go
                ahead, ask away!
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LinksWrapper;
