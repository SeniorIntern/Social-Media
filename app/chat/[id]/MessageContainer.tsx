'use client';

import useSocket from '@/app/store/socketStore';
import { SocketPaylod } from '@/app/types';
import Spinner from '@/components/reusables/Spinner';
import useMessages from '@/hooks/useMessages';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { format } from 'timeago.js';

import { RealtimeMessages } from './RealtimeMessages';
import MessageContainerSkeleton from './MessageContainerSkeleton';

type Props = {
  sender: string;
  conversationId: string;
};

const MessageContainer = ({ sender, conversationId }: Props) => {
  const { socket } = useSocket();

  const limit = 6;
  const { data, error, isLoading, hasNextPage, fetchNextPage } = useMessages(
    conversationId,
    limit
  );

  const fetchedMessages =
    data?.pages.reduce((total, page) => total + page.messages.length, 0) || 0;

  const [chats, setChats] = useState<SocketPaylod[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(
        `react- connectionId: ${socket.id}. conversationId: ${conversationId}`
      );
    });

    socket.on(conversationId, (data: SocketPaylod) => {
      console.log('socket, data recieved=', conversationId, data);
      setChats([...chats, data]);
    });

    return () => {
      socket.off('connect');
      socket.off(conversationId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  console.log('mounted');

  if (isLoading) return <MessageContainerSkeleton />;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Fetching...</p>;

  return (
    <div
      style={{ maxHeight: 'calc(100vh - 168px)' }}
      id="chatBox"
      className="flex grow flex-col space-y-8 overflow-auto p-2"
    >
      {/* messages from (real-time)socketIO */}
      <RealtimeMessages sender={sender} chats={chats} />

      <InfiniteScroll
        dataLength={fetchedMessages}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
        scrollableTarget="chatBox"
        className="space-y-8"
      >
        {/* messages from database */}
        {data.pages[data.pages.length - 1].messages.map((message) => (
          <div
            key={message._id}
            className={cn(
              'flex flex-col items-start space-y-2',
              message.sender == sender && 'items-end'
            )}
          >
            {message.attachmentUrls.length !== 0 && (
              <div className="flex cursor-pointer flex-col gap-2">
                {message.attachmentUrls.map((a, i) => (
                  <div key={i} className="relative h-36 w-36">
                    <Image
                      src={a}
                      alt="message attachment image"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}

            {message.text && (
              <p className="w-fit rounded-2xl bg-primary px-4 py-1">
                {message.text}
              </p>
            )}
            <p className="text-sm text-gray-400">{format(message.updatedAt)}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MessageContainer;
