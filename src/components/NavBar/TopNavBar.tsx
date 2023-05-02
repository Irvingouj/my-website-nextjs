import { GetText } from '../../utils/TextSource';
import Image from 'next/image';
import React, { FC } from 'react';

export const smoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) => {
  e.preventDefault();
  const target = e.currentTarget.getAttribute('href');
  if (target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const TopBar: FC = () => {
  return (
    <div
      id="TopNavBar"
      className="flex flex-row w-[95%] 
    justify-evenly mt-[1rem] mb-[3rem] "
    >
      <div className="flex-1 flex flex-col">
        <div className="flex flex-row relative flex-1 ">
          <Image src="/irving-ou.svg" alt="logo" fill className="mt-[1rem]" />
        </div>
      </div>

      <div
        className="flex-grow-[1] flex-shrink-[1] pl-[20%]
         h-full"
      >
        <nav
          className="list-disc m-4 ml-10 min-h-full
        float-right min-w-full rounded-full bg-white"
        >
          <div className="min-h-full">
            <ul className="flex m-4 pl-10  min-h-full">
              <li className=" flex-1">
                <a href="#">About</a>
              </li>
              <li className="flex-1">
                <a href="#Game" onClick={smoothScroll}>
                  Game
                </a>
              </li>
              <li className="flex-1">
                <a href="#Chat" onClick={smoothScroll}>
                  Chat
                </a>
              </li>
              <li className="flex-1">
                <a href="#Links" onClick={smoothScroll}>
                  Links
                </a>
              </li>
              <li className="flex-1">
                <a href="#Contact" onClick={smoothScroll}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center ">
        <div className="flex-1" />
        <div className="flex-1 flex">
          <div className="h-[30px] w-[30px] relative mr-[10px] ">
            <Image src="/01.png" alt="phone" fill />
          </div>
          {GetText.phone()}
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
};

export default TopBar;
