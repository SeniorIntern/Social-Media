import TweetCardSkeleton from '../TweetCardSkeleton';

const BookmarkContainerSkeleton = () => {
  return (
    <div
      style={{
        maxHeight: 'calc(100vh - 56px)',
        height: 'calc(100vh - 56px)'
      }}
      className="flex grow flex-col overflow-y-scroll"
    >
      <section className="flex flex-col divide-y">
        <TweetCardSkeleton />
        <TweetCardSkeleton />
        <TweetCardSkeleton />
        <TweetCardSkeleton />
      </section>
    </div>
  );
};

export default BookmarkContainerSkeleton;
