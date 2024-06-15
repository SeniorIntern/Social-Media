'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { PLACEHOLDER_PROFILE_IMAGE } from '@/constants';
import { usePlayer } from '@/hooks';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  userId: string;
  hideName?: boolean;
};

export const UserAvatar = ({ userId, hideName = false }: Props) => {
  const { data: user, isLoading, error } = usePlayer(userId);
  if (isLoading) return <Skeleton className="h-12 w-12 rounded-full" />;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className={cn('relative h-8 w-8', hideName && 'h-10 w-10')}>
        <Image
          src={user?.profileImage || PLACEHOLDER_PROFILE_IMAGE}
          alt="profile image"
          fill
          style={{ objectFit: 'cover' }}
          className="cursor-pointer rounded-full"
        />
      </div>
      {!hideName && (
        <span className="font-semibold text-white">{user?.username}</span>
      )}
    </>
  );
};
