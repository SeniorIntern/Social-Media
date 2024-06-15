'use client';

import { Player } from '@/app/types';
import { Button } from '@/components/ui/button';
import { PLACEHOLDER_PROFILE_IMAGE } from '@/constants';
import { useAddFriend } from '@/hooks';
import { UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  user: Player;
};

const PeopleSuggestionItem = ({ user }: Props) => {
  console.log('mounted');
  const mutation = useAddFriend();

  return (
    <div className="w-40 rounded-md border">
      <div className="relative h-36 w-full">
        <Image
          src={
            user?.profileImage
              ? user.profileImage
              : PLACEHOLDER_PROFILE_IMAGE
          }
          alt="profile image"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t"
        />
      </div>
      <div className="flex h-28 flex-col place-content-between space-y-2 p-3">
        <Link href={`/players/${user?._id}`}>{user?.username}</Link>
        <Button
          onClick={() => mutation.mutate(user._id)}
          className="space-x-2 px-4"
        >
          <UserPlus size="18" fill="white" />
          <span>Add Friend</span>
        </Button>
      </div>
    </div>
  );
};

export default PeopleSuggestionItem;
