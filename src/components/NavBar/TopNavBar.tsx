import { GetText } from '../../utils/TextSource';
import Image from 'next/image';
import React, { FC } from 'react';

interface MenuItem {
  id: string;
  text: string;
}

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
  const menuItems: MenuItem[] = [
    { id: 'About', text: 'About' },
    { id: 'Game', text: 'Game' },
    { id: 'Chat', text: 'Chat' },
    { id: 'Links', text: 'Links' },
    { id: 'Contact', text: 'Contact' },
  ];

  return (
    <div
      id="TopNavBar"
      className=" hidden sm:flex flex-row w-[95%] 
    justify-evenly mt-[1rem] mb-[3rem] "
    >
      <div className="hidden sm:flex flex-1 flex-col">
        <div className="flex flex-row relative flex-1 ">
          <Image src="/irving-ou.svg" alt="logo" fill className="mt-[1rem]" />
        </div>
      </div>

      <div
        className="flex-grow-[1] flex-shrink-[1] ml-[20%]
         h-full"
      >
        <nav
          className="list-disc m-4 min-h-full
         min-w-full rounded-full bg-white sm:ml-10 float-right"
        >
          <div className="min-h-full">
            <ul className="flex min-h-[5vh]">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className="flex-1 text-center rounded-full align-middle flex flex-col justify-center hover:bg-button-blue m-[5px] duration-500"
                >
                  <a href={`#${item.id}`} onClick={smoothScroll}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="hidden sm:flex flex-1 flex-col justify-center items-center font-sans">
        <div className="flex-1" />
        <div className="flex-1 flex">
          <div className="h-[30px] w-[30px] relative mr-[10px] ">
            <Image src="/01.png" alt="phone" fill />
          </div>
          <p>{GetText.phone()}</p>
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
};

export default TopBar;
