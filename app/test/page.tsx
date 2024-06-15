'use client';

import Spinner from '@/components/reusables/Spinner';
import { useMessages } from '@/hooks';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Page() {
  const limit = 6;
  const conversationId = '665c8febb6622a88bec4aa37';

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useMessages(conversationId, limit);

  const fetchedTodos =
    data?.pages.reduce((total, page) => total + page.messages.length, 0) || 0;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Fetching...</p>;
  console.log('msg===', data?.pages);

  return (
    <div>
      <div>
        <p>STATS</p>
        <p>hasMore: {'' + !!hasNextPage}</p>
        <p>dataLength: {fetchedTodos}</p>
      </div>
      <div
        id="box"
        className="h-60 overflow-y-scroll rounded-md border border-white"
      >
        <InfiniteScroll
          dataLength={fetchedTodos}
          hasMore={!!hasNextPage}
          next={() => fetchNextPage()}
          loader={<Spinner />}
          scrollableTarget="box"
        >
          <React.Fragment>
            {data.pages[data.pages.length - 1].messages.map((message) => (
              <div
                key={message._id}
                className={cn('my-4 flex flex-col items-start space-y-2')}
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
              </div>
            ))}
          </React.Fragment>
        </InfiniteScroll>
      </div>
    </div>
  );
}
