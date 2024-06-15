import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const TweetFormSkeleton = () => {
  return (
    <div className="flex gap-2 p-4">
      <Skeleton className="h-10 w-10 rounded-full" />

      <div className="flex grow flex-col">
        <Skeleton className="h-4 w-60" />

        <div className="flex justify-between">
          <div className="flex items-end gap-4">
            <Skeleton className="h-4 w-4" />
          </div>

          <Skeleton className="h-10 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
};
