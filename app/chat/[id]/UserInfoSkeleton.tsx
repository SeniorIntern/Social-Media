import { Skeleton } from '@/components/ui/skeleton';

const UserInfoSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <>
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="h-4 w-[200px]" />
      </>
    </div>
  );
};

export default UserInfoSkeleton;
