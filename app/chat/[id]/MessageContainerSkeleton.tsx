import { Skeleton } from '@/components/ui/skeleton';

const MessageContainerSkeleton = () => {
  return (
    <div
      style={{ maxHeight: 'calc(100vh - 168px)' }}
      id="chatBox"
      className="flex grow flex-col space-y-8 overflow-auto p-2"
    >
      <div className="flex flex-col items-end space-y-2">
        <Skeleton className="h-8 w-56 rounded-2xl px-4 py-1" />
        <Skeleton className="h-2 w-20 text-sm" />
      </div>

      <div className="flex flex-col items-start space-y-2">
        <Skeleton className="h-8 w-56 rounded-2xl px-4 py-1" />
        <Skeleton className="h-2 w-20 text-sm" />
      </div>

      <div className="flex flex-col items-end space-y-2">
        <Skeleton className="h-8 w-56 rounded-2xl px-4 py-1" />
        <Skeleton className="h-2 w-20 text-sm" />
      </div>

      <div className="flex flex-col items-end space-y-2">
        <Skeleton className="h-8 w-56 rounded-2xl px-4 py-1" />
        <Skeleton className="h-2 w-20 text-sm" />
      </div>

      <div className="flex flex-col items-start space-y-2">
        <Skeleton className="h-8 w-56 rounded-2xl px-4 py-1" />
        <Skeleton className="h-2 w-20 text-sm" />
      </div>
    </div>
  );
};

export default MessageContainerSkeleton;
