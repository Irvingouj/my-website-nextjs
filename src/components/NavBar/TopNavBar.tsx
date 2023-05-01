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
    <div id="TopNavBar" className="flex flex-row w-11/12 justify-evenly">
      <div>
        <Image src="/irving-ou.svg" alt="logo" width={228} height={53.05} />
      </div>

      <div>
        <a href="#" onClick={(e) => e.preventDefault()}>
          <span></span>
        </a>
        <nav>
          <div>
            <ul className="flex ">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#Game" onClick={smoothScroll}>
                  Game
                </a>
              </li>
              <li>
                <a href="#Chat" onClick={smoothScroll}>
                  Chat
                </a>
              </li>
              <li>
                <a href="#Links" onClick={smoothScroll}>
                  Links
                </a>
              </li>
              <li>
                <a href="#Contact" onClick={smoothScroll}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="flex">
        <Image src="/01.png" alt="phone" width={28} height={14} />
        {GetText.phone()}
      </div>
      <div></div>
    </div>
  );
};

export default TopBar;
