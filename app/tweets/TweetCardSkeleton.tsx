import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const TweetCardSkeleton = () => {
  return (
    <article className="flex p-4">
      <Skeleton className="h-10 w-10 rounded-full lg:block" />

      <div className="grow px-2">
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
          <span className="text-mutedtext">.</span>
          <Skeleton className="h-3 w-20" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <Button variant={null} className="inline-flex gap-1 text-mutedtext">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
          </Button>

          <Button variant={null} className="inline-flex gap-1 text-mutedtext">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
          </Button>

          <Button variant={null} className="inline-flex gap-1 text-mutedtext">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
          </Button>

          <Button variant={null} className="inline-flex gap-1 text-mutedtext">
            <Skeleton className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default TweetCardSkeleton;
