'use client';

import useUserTweets from '@/hooks/useUserTweets';

import TweetsContainer from '../tweets/TweetsContainer';

type Props = {
  userId: string;
};

export const ProfileTweets = ({ userId }: Props) => {
  console.log('mounted');

  const { data: tweets, isLoading, error } = useUserTweets(userId);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="rounded-md bg-secondary">
      {tweets && <TweetsContainer tweets={tweets} />}
    </div>
  );
};
