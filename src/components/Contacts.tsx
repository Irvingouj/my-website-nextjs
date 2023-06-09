import LinkButton from '@/components/LinkButton';
import { smoothScroll } from '@/components/NavBar/TopNavBar';
import { GetText } from '@/utils/TextSource';
import Image from 'next/image';
import { FC } from 'react';

const Contacts: FC = () => (
  <div
    className=" flex-col-reverse sm:flex-row flex items-center min-h-[20vh] sm:min-h-[40vh] px-[5rem] w-full justify-between"
    id="Contact"
  >
    <div className="flex flex-row sm:flex-col justify-evenly h-full mt-6 sm:mt-0 ">
      <div className="hidden sm:flex ml-[0.5rem] mb-[0.5rem] justify-center align-middle ">
        <div className="flex justify-center flex-col mr-[1rem]">
          <div className="relative w-[1rem] h-[1rem]">
            <Image
              className="hidden sm:block text-"
              src="/15.png"
              alt="Email"
              fill
            />
          </div>
        </div>
        {GetText.email()}
      </div>
      <div className="flex justify-around align-middle min-w-[70vw] sm:min-w-[80%] my-[5vh] sm:mb-0">
        <a href={GetText.linkedin()} className="bg-[#f2f6fa] rounded-full">
          <Image src="/linkendin.png" alt="LinkedIn" width={40} height={40} />
        </a>
        <a href={GetText.github()} className="bg-[#f2f6fa] rounded-full">
          <Image src="/github.png" alt="GitHub" width={40} height={40} />
        </a>
        <a href={GetText.wechat()} className="bg-[#f2f6fa] rounded-full">
          <Image src="/wechat.png" alt="WeChat" width={40} height={40} />
        </a>
      </div>
    </div>
    <div className="flex flex-col justify-between h-full">
      <p className="text-center text-xl mb-[1rem]">Contact me</p>
      <h3 className="text-blue-500 sm:text-4xl mb-[1rem] font-sans">
        {GetText.phone()}
      </h3>
      <div className="flex justify-center align-middle">
        <LinkButton href={`mailto: ${GetText.email()}`}>Send emails</LinkButton>
      </div>
    </div>
    <div className="hidden sm:block float-right">
      <p className="text-lg">Quick navigation</p>
      <div className="flex flex-col mt-[1rem] justify-evenly">
        <a
          href="#"
          onClick={smoothScroll}
          className="text-fgery mt-[0.5rem] text-xl"
        >
          About
        </a>
        <a
          href="#Game"
          onClick={smoothScroll}
          className="text-fgery mt-[1rem] text-xl"
        >
          Game
        </a>
        <a
          href="#Chat"
          onClick={smoothScroll}
          className="text-fgery mt-[1rem] text-xl"
        >
          Chat
        </a>
      </div>
    </div>
  </div>
);

export default Contacts;
