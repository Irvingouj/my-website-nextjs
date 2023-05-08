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
    <div className=" w-[95%] mx-[50px] flex flex-auto my-[3rem] px-[150px]">
      <div className="float-right flex-1 font pr-[30px] flex flex-col justify-between">
        <div>
          <h1 className="italic text-5xl">
            Hi There, My name is {GetText.name()}
          </h1>
          <p className="text-xl font-serif mt-[5vh] whitespace-normal pr-[5vw] leading-relaxed indent-16 tracking-normal">
            Hi there! So excited to see you! I'm a fourth-year student from
            Carleton University with a double major in Math and Computer
            Science, and I'm eager to bring my skills and experience to the next
            step of my career. I pride myself on being a problem solver with a
            strong work ethic, and I've received recognition for these qualities
            from my previous managers and supervisors. I also understand the
            importance of clear and effective communication, and I always strive
            to deliver on my promises. I am confident in my abilities, and I am
            excited to see what the future holds for me in the technology
            industry.
          </p>
        </div>
        <p className="">Play a game with me!</p>
      </div>
      <div className="float-left w-[25vw] h-[25vw] relative hidden sm:block">
        <Image src="/selfie.png" alt="Selfie" fill className="float-right" />
      </div>
      <div className="clear"></div>
    </div>
  </div>
);

export default About;
