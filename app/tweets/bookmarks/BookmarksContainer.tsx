import { ScrollArea } from '@/components/ui/scroll-area';
import { useBookmarks } from '@/hooks';

import TweetsContainer from '../TweetsContainer';
import BookmarkContainerSkeleton from './BookmarkContainerSkeleton';

type Props = {
  userId: string;
};

const BookmarksContainer = ({ userId }: Props) => {
  const { data: bookmark, isLoading, error } = useBookmarks(userId);
  if (isLoading) return <BookmarkContainerSkeleton />;
  if (error) return <p>{error.message}</p>;

  return (
    <ScrollArea
      style={{
        maxHeight: 'calc(100vh - 56px)',
        height: 'calc(100vh - 56px)'
      }}
      className="flex grow flex-col overflow-y-scroll"
    >
      {bookmark && <TweetsContainer tweets={bookmark?.tweetIds} />}
    </ScrollArea>
  );
};

export default BookmarksContainer;
