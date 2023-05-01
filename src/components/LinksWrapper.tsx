import Image from 'next/image';
import { FC } from 'react';

const LinksWrapper: FC = () => {
  return (
    <div id="links-wrapper" className="mt-[5rem] mb-[5rem] px-[5rem]">
      <div className="w">
        <ul className="flex justify-center ">
          <li className="flex-1 mx-[5rem] bg-main-background">
            <div className="img">
              <a
                href="Software_Engineer_Resume__8.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/resume-icon.jpg"
                  alt="Resume Icon"
                  width={100}
                  height={100}
                />
                <h3>Resume</h3>
              </a>
            </div>
            <div className="txt">
              <p>
                You looking for a software engineer with a passion for
                technology? Look no further! I guarantee you that I am the best
                candidate for the job. Hit the download button below to view my
                resume!.
              </p>
              <a
                href="Software_Engineer_Resume__8.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </div>
          </li>
          <li className="flex-1 mx-[5rem] bg-main-background">
            <div className="img">
              <a href="https://github.com/Irvingouj/my-website">
                <Image
                  src="/openai-react-logo.png"
                  alt="OpenAI React Logo"
                  width={100}
                  height={100}
                />
                <h3>Fun fact about this website</h3>
              </a>
            </div>
            <div className="txt">
              <p>
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
              <a href="https://github.com/Irvingouj/my-website">Website Repo</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LinksWrapper;
