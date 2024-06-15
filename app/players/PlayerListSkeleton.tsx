import { Skeleton } from '@/components/ui/skeleton';

const PlayerListSkeleton = () => {
  return (
    <aside className="space-y-4 overflow-y-auto">
      <div className="block cursor-pointer rounded-md p-2">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-14 w-14 rounded-full" />
          <div className="hidden space-y-2 md:block">
            <Skeleton className="h-4 w-48" />
            <div className="flex flex-col items-center gap-2 xl:flex-row">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>
      </div>
      <div className="block cursor-pointer rounded-md p-2">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-14 w-14 rounded-full" />
          <div className="hidden space-y-2 md:block">
            <Skeleton className="h-4 w-48" />
            <div className="flex flex-col items-center gap-2 xl:flex-row">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PlayerListSkeleton;
