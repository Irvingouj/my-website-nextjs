import { Data, Message, Role } from '@/types/chatboxTypes';
import React, { FC, useEffect, useState } from 'react';

const DEFAULT_MESSAGES: Message[] = [
  {
    content: 'Hello,is there anything you wanna know about me?',
    role: Role.Assisstant,
  },
];

const Chatbox: FC = () => {
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
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
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        //messages except the last one
        messages: messages.slice(0, -1),
      }),
    });
    if (!response.body) {
      return;
    }

    if (response.status === 429) {
      // update the last message to show the error
      const lastMessage = messages[messages.length - 1];
      const newMessage = {
        ...lastMessage,
        content:
          'Sorry, you have sent too many requests. Please try again later.',
      };
      setMessages([...messages.slice(0, -1), newMessage]);
      setInputFinished(false);
      return;
    }

    if (response.status === 500) {
      const lastMessage = messages[messages.length - 1];
      const newMessage = {
        ...lastMessage,
        content: 'Sorry, something went wrong. Please try again later.',
      };
      setMessages([...messages.slice(0, -1), newMessage]);
      setInputFinished(false);
      return;
    }

    if (response.status >= 400 && response.status < 500) {
      // eslint-disable-next-line no-console
      console.error('Client error');
      const lastMessage = messages[messages.length - 1];
      const newMessage = {
        ...lastMessage,
        content: 'Sorry, something went wrong. Please try again later.',
      };
      setMessages([...messages.slice(0, -1), newMessage]);
      setInputFinished(false);
      return;
    }

    const reader = response.body.getReader();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();

      // eslint-disable-next-line no-console
      console.log('start streaming');
      if (done) {
        // eslint-disable-next-line no-console
        console.log('Done streaming');
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
          try {
            return JSON.parse(data.replace('data: ', '')) as Data;
          } catch (e) {
            return null;
          }
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

  useEffect(() => {
    if (!chatboxRef.current) {
      return;
    }
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messages]);

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
      className="flex mt-[5rem] justify-center bg-second-background w-full h-[70vh] items-center rounded-xl"
      id="Chat"
    >
      <div className=" w-[90vw] my-[1rem] relative h-[97%] sm:h-[80%] sm:w-[75vw] sm:my-[5rem]">
        <div className="border bg-white w-full h-full px-[10px] py-[10px] rounded-xl flex flex-col">
          <div
            id="chatbox"
            className="h-full overflow-y-scroll"
            ref={chatboxRef}
          >
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
                    ' rounded-xl min-h-[60px] h-fit p-[10px] flex flex-col justify-center text-sm sm:text-xl tracking-wide '
                  }
                  key={index}
                >
                  <div className="flex items-baseline">
                    <div className="hidden sm:flex sm:flex-col sm:justify-start pr-[5px] min-w-[100px] mt-1">
                      <div className="align-top float-right text-right">
                        {message.role.charAt(0).toUpperCase() +
                          message.role.slice(1) +
                          ':'}
                      </div>
                    </div>

                    <span className="text">{message.content}</span>
                  </div>
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
