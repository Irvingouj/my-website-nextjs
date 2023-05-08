import LinkButton from '@/components/LinkButton';
import { smoothScroll } from '@/components/NavBar/TopNavBar';
import { GetText } from '@/utils/TextSource';
import Image from 'next/image';
import { FC } from 'react';

const Contacts: FC = () => (
  <div
    className="flex items-center min-h-[40vh] px-[5rem] w-full justify-between"
    id="Contact"
  >
    <div className="flex flex-col justify-evenly h-full">
      <div className="flex ml-[0.5rem] mb-[0.5rem]">
        <div className="flex justify-center flex-col mr-[1rem]">
          <div className="relative w-[1rem] h-[1rem]">
            <Image src="/15.png" alt="Email" fill />
          </div>
        </div>
        {GetText.email()}
      </div>
      <div className="flex justify-around max-w-[80%]">
        <a href={GetText.linkedin()} className="bg-[#f2f6fa] rounded-full">
          <Image src="/16.png" alt="LinkedIn" width={40} height={40} />
        </a>
        <a href={GetText.github()} className="bg-[#f2f6fa] rounded-full">
          <Image src="/17.png" alt="GitHub" width={40} height={40} />
        </a>
        <a href={GetText.wechat()} className="bg-[#f2f6fa] rounded-full">
          <Image src="/18.png" alt="WeChat" width={40} height={40} />
        </a>
      </div>
    </div>
    <div className="flex flex-col justify-between h-full">
      <p className="text-center text-xl mb-[1rem]">Contact me</p>
      <h3 className="text-blue-500 text-4xl mb-[1rem]">{GetText.phone()}</h3>
      <div className="flex justify-center align-middle">
        <LinkButton href={`mailto: ${GetText.email()}`}>Send emails</LinkButton>
      </div>
    </div>
    <div className="float-right">
      <p>Quick navigation</p>
      <div className="flex flex-col mt-[2rem] justify-evenly">
        <a href="#" onClick={smoothScroll} className="font-fgrey">
          About
        </a>
        <a href="#Game" onClick={smoothScroll} className="">
          Game
        </a>
        <a href="#Chat" onClick={smoothScroll} className="">
          Chat
        </a>
      </div>
    </div>
  </div>
);

export default Contacts;
