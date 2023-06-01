import { GetText } from '../utils/TextSource';
import TopBar from '@/components/NavBar/TopNavBar';
import Image from 'next/image';
import { FC } from 'react';

const About: FC = () => (
  <div
    id="About"
    className="w-full mt-[2rem] pt-[0.18rem] pb-[0.46rem] 
    bg-main-background flex flex-col min-h-[60vh] items-center
    rounded-xl bg-cover
    "
  >
    <TopBar />
    <div className=" w-full flex flex-auto my-[3rem] px-[9vw] sm:mx-[50px]">
      <div className="float-right flex-1 font flex flex-col justify-between sm:pr-[30px]">
        <div>
          <h1 className="italic text-xl sm:text-5xl">
            Hi There, My name is {GetText.name()}
          </h1>
          <p className="text-xs font-serif mt-[5vh] whitespace-normal leading-relaxed indent-16 tracking-normal sm:text-xl pr-[5vw]">
            {GetText.about()}
          </p>
        </div>
        <p className="">Play a game with me!</p>
      </div>
      <div className="float-left w-[25vw] h-[25vw] relative hidden sm:block">
        <Image
          src="/selfie.png"
          alt="Selfie"
          fill
          className="float-right"
          loading="eager"
        />
      </div>
      <div className="clear"></div>
    </div>
  </div>
);

export default About;
