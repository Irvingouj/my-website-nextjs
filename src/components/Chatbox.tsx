import { Message, getResponse } from '../utils/ChatService';
import React, { FC, useEffect, useState } from 'react';

const Chatbox: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: 'Hello,is there anything you wanna know about me?',
      sender: 'me',
    },
  ]);
  const [inputFinished, setInputFinished] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const chatboxRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<Map<number, HTMLDivElement> | null>(null);

  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current) {
      return;
    }
    if (e.key === 'Enter') {
      const newMessage = {
        content: inputRef.current.value,
        sender: 'you',
      };
      setMessages([...messages, newMessage]);
      inputRef.current.value = '';
      setInputFinished(true);
    }
  };

  useEffect(() => {
    if (!inputFinished) {
      inputRef.current?.focus();
      return;
    }

    async function getResponseFromServer() {
      const res = await getResponse(messages);
      setMessages([...messages, { content: res, sender: 'Me' }]);
      setInputFinished(false);
    }

    try {
      getResponseFromServer();
    } catch (e) {
      setMessages([
        ...messages,
        { content: 'Sorry,OpenAI refuse to answer', sender: 'Me' },
      ]);
    }
  }, [inputFinished]);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.blur();
  }, []);

  const getMap = () => {
    if (!listRef.current) {
      listRef.current = new Map<number, HTMLDivElement>();
    }
    return listRef.current;
  };

  return (
    <div
      className="mt-[5rem] justify-center bg-second-background w-full h-[70vh] flex items-center rounded-3xl"
      id="Chat"
    >
      <div className="w-[75vw] mt-[5rem] mb-[5rem] relative h-[80%]">
        <div className="border bg-white w-full h-full px-[10px] py-[10px] rounded-3xl flex flex-col">
          <div id="chatbox" className="flex flex-col h-full" ref={chatboxRef}>
            {messages.map((message, index) => {
              return (
                <div
                  ref={(ref) => {
                    const map = getMap();
                    if (ref) {
                      map.set(index, ref);
                    } else {
                      map.delete(index);
                    }
                  }}
                  className={
                    (index % 2 == 0 ? 'bg-lightblue' : '') +
                    ' rounded-full min-h-[60px] p-[10px] flex items-center text-xl tracking-wide'
                  }
                  key={index}
                >
                  <div className="pr-[5px]">
                    {message.sender.charAt(0).toUpperCase() +
                      message.sender.slice(1) +
                      ':'}
                  </div>

                  <span className="text">{message.content}</span>
                </div>
              );
            })}
          </div>
          <input
            className="rounded-3xl shadow-md min-h-[60px] border-[1px] border-gray-400 p-[10px]]"
            disabled={inputFinished}
            ref={inputRef}
            type="text"
            id="1"
            onKeyDown={sendMessage}
          ></input>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Chatbox;
