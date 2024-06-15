import { Separator } from '@radix-ui/react-dropdown-menu';
import { ScrollArea } from '@radix-ui/react-scroll-area';

import TweetCardSkeleton from './TweetCardSkeleton';
import { TweetFormSkeleton } from './TweetFormSkeleton';

const TweetPageSkeleton = () => {
  return (
    <ScrollArea
      style={{ maxHeight: 'calc(100vh - 56px)' }}
      className="flex grow flex-col space-y-8 overflow-auto p-2"
      id="tweetBox"
    >
      <TweetFormSkeleton/>
      <Separator />

      <section className="flex flex-col divide-y">
        <TweetCardSkeleton />
        <TweetCardSkeleton />
        <TweetCardSkeleton />
        <TweetCardSkeleton />
        <TweetCardSkeleton />
        <TweetCardSkeleton />
        <TweetCardSkeleton />
      </section>
    </ScrollArea>
  );
};

export default TweetPageSkeleton;
