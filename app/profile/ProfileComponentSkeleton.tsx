import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Camera } from 'lucide-react';
import Link from 'next/link';

import FriendSuggestions from './FriendSuggestions';

const ProfileComponentSkeleton = () => {
  return (
    <section className="grow px-24">
      <div className="relative">
        <Skeleton className="h-96 w-full" />
      </div>

      <div className="flex h-36 justify-between p-4">
        <div className="relative flex items-center gap-4">
          <Skeleton className="relative hidden self-end md:block lg:h-44 lg:w-44" />

          <div className="self-center">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileComponentSkeleton;
