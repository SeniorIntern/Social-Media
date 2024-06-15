'use client';

import Spinner from '@/components/reusables/Spinner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useTweets } from '@/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

import TweetForm from './TweetForm';
import TweetPageSkeleton from './TweetPageSkeleton';
import TweetsContainer from './TweetsContainer';

export default function Page() {
  console.log('mounted');

  const limit = 6;
  const { data, error, isLoading, hasNextPage, fetchNextPage } =
    useTweets(limit);

  const fetchedTweets =
    data?.pages.reduce((total, page) => total + page.tweets.length, 0) || 0;

  if (isLoading) return <TweetPageSkeleton />;
  if (error) return <p>{error.message}</p>;

  return (
    <ScrollArea
      style={{ maxHeight: 'calc(100vh - 56px)' }}
      className="flex grow flex-col space-y-8 overflow-auto p-2"
      id="tweetBox"
    >
      <TweetForm />
      <Separator />
      <InfiniteScroll
        dataLength={fetchedTweets}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
        scrollableTarget="tweetBox"
        className=""
      >
        {data?.pages && (
          <TweetsContainer tweets={data.pages[data.pages.length - 1].tweets} />
        )}
      </InfiniteScroll>
    </ScrollArea>
  );
}
