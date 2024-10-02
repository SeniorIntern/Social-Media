'use client';

import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';
import { useMembers } from '@/hooks';
import Link from 'next/link';

type Props = {
  conversationId: string;
};

const ConversationHeader = ({ conversationId }: Props) => {
  const { data: members, isLoading, error } = useMembers(conversationId);

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center space-x-2 p-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (error) return <p>{error.message}</p>;

  if (!members) {
    return <p>No Members in the Chat</p>;
  }

  // if its a group chat
  if (members.length > 1)
    return (
      <div>
        <div className="flex items-center space-x-2 p-2">
          <div className="relative h-10 w-10">
            <Image
              src={members[0].profileImage}
              alt="profile image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>
          <p className="font-[400]">group chat</p>
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex items-center space-x-2 p-2">
        <Link href={`/friends/${members[0]._id}`}>
          <div className="relative h-10 w-10">
            <Image
              src={members[0].profileImage}
              alt="profile image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>
        </Link>

        <Link href={`/friends/${members[0]._id}`} className="font-[400]">
          {members[0].username}
        </Link>
      </div>
    </div>
  );
};

export default ConversationHeader;
