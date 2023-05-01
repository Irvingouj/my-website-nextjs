import { GetText } from '../../utils/TextSource';
import TopBar from '@/components/NavBar/TopNavBar';
import Image from 'next/image';
import { FC } from 'react';

const About: FC = () => (
  <div
    id="About"
    className="w-full mt-[2rem] pt-[0.18rem] pb-[0.46rem] bg-main-background flex flex-col"
  >
    <TopBar />
    <div className=" w-[95%] max-w-[1200px] mx-auto flex flex-auto">
      <div className="float-right overflow-hidden flex-1 font">
        <h1 style={{ fontStyle: 'italic' }}>
          Hi There, My name is {GetText.name()}
        </h1>
        <br />
        <br />
        <p style={{ fontSize: '20px', fontStyle: 'oblique', color: 'black' }}>
          Hi there! So excited to see you! I'm a fourth-year student from
          Carleton University with a double major in Math and Computer Science,
          and I'm eager to bring my skills and experience to the next step of my
          career. I pride myself on being a problem solver with a strong work
          ethic, and I've received recognition for these qualities from my
          previous managers and supervisors. I also understand the importance of
          clear and effective communication, and I always strive to deliver on
          my promises. I am confident in my abilities, and I am excited to see
          what the future holds for me in the technology industry.
        </p>
        <br />
        <p>Play a game with me!</p>
      </div>
      <div className="flex-1 float-right">
        <Image
          src="/selfie.png"
          alt="Selfie"
          width={300}
          height={300}
          className="float-right"
        />
      </div>
      <div className="clear"></div>
    </div>
  </div>
);

export default About;
