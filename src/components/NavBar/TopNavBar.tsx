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
    <div>
      <div>
        <Image src="/irving-ou.svg" alt="logo" width={50} height={50} />
      </div>
      <div>
        <Image src="/01.png" alt="phone" width={50} height={50} />
        {GetText.phone()}
      </div>
      <div>
        <a href="#" onClick={(e) => e.preventDefault()}>
          <span></span>
        </a>
        <nav>
          <div>
            <ul>
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
      <div></div>
    </div>
  );
};

export default TopBar;
