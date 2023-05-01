import { smoothScroll } from '@/components/NavBar/TopNavBar';
import { GetText } from '@/utils/TextSource';
import Image from 'next/image';
import { FC } from 'react';

const Contacts: FC = () => (
  <div className="w-full flex items-center " id="Contact">
    <div className="flex flex-col justify-evenly flex-1">
      <p>
        <Image src="/15.png" alt="Email" width={40} height={40} />
        {GetText.email()}
      </p>
      <div className="flex">
        <a href={GetText.linkedin()}>
          <Image src="/16.png" alt="LinkedIn" width={40} height={40} />
        </a>
        <a href={GetText.github()}>
          <Image src="/17.png" alt="GitHub" width={40} height={40} />
        </a>
        <a href={GetText.wechat()}>
          <Image src="/18.png" alt="WeChat" width={40} height={40} />
        </a>
      </div>
    </div>
    <div className="flex-1">
      <p>Contact me</p>
      <h3>{GetText.phone()}</h3>
      <a href={`mailto: ${GetText.email()}`}>Send emails</a>
    </div>
    <div className="flex-1 float-right">
      <p>Quick navigation</p>
      <div>
        <a href="#" onClick={smoothScroll}>
          About
        </a>
        <a href="#Game" onClick={smoothScroll}>
          Game
        </a>
        <a href="#Chat" onClick={smoothScroll}>
          Chat
        </a>
      </div>
    </div>
  </div>
);

export default Contacts;
