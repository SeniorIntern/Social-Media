import { Tweet } from '@/app/types';

import TweetCard from './TweetCard';

type Props = {
  tweets: Tweet[];
};

const TweetsContainer = ({ tweets }: Props) => {
  return (
    <section className="flex flex-col divide-y">
      {tweets?.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} />)}
    </section>
  );
};

export default TweetsContainer;
