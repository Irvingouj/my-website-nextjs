import { Data, Message, Role } from '@/types/chatboxTypes';
import React, { FC, useEffect, useState } from 'react';

const Chatbox: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: 'Hello,is there anything you wanna know about me?',
      role: Role.Assisstant,
    },
  ]);
  const [inputFinished, setInputFinished] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const chatboxRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<Map<number, HTMLDivElement> | null>(null);

  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current) {
      return;
    }
    if (e.key !== 'Enter') {
      return;
    }
    const newUserMessage = {
      content: inputRef.current.value,
      role: Role.User,
    };

    const newAssisstantMessage = {
      content: '',
      role: Role.Assisstant,
    };
    setMessages([...messages, newUserMessage, newAssisstantMessage]);
    inputRef.current.value = '';
    setInputFinished(true);
  };

  const streamingRespones = async () => {
    const response = await fetch('/api/chat');
    if (!response.body) {
      return;
    }
    const reader = response.body.getReader();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      const decoded_data = new TextDecoder('utf-8').decode(value).trim();
      const datas = decoded_data
        .split('\n')
        .filter((data) => data.startsWith('data: '))
        .map((data) => {
          if (data.includes('[DONE]')) {
            return null;
          }
          return JSON.parse(data.replace('data: ', '')) as Data;
        });

      for (const data of datas) {
        if (data === null) {
          setInputFinished(false);
          return;
        }

        const delta = data.choices[0].delta;
        if ('role' in delta || delta.content == undefined) {
          continue;
        }

        const chunk = delta.content;
        const lastMessage = messages[messages.length - 1];
        const newMessage = {
          ...lastMessage,
          content: (lastMessage.content += chunk),
        };
        setMessages([...messages.slice(0, -1), newMessage]);
      }
    }
  };

  useEffect(() => {
    if (inputFinished) {
      streamingRespones();
    }
  }, [inputFinished]);

  // ...

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
                    {message.role.charAt(0).toUpperCase() +
                      message.role.slice(1) +
                      ':'}
                  </div>

                  <span className="text">{message.content}</span>
                </div>
              );
            })}
          </div>
          <input
            className="rounded-3xl shadow-md min-h-[60px] border-[1px] border-gray-400 p-[10px]] text-xl"
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
