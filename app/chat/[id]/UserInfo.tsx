'use client';

import useConversationStore from '@/app/store/conversationStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { PLACEHOLDER_PROFILE_IMAGE } from '@/constants';
import useMembers from '@/hooks/useMembers';
import Image from 'next/image';
import Link from 'next/link';

import UserInfoSkeleton from './UserInfoSkeleton';

type Props = {
  conversationId: string;
};

const UserInfo = ({ conversationId }: Props) => {
  const { data: members, isLoading, error } = useMembers(conversationId);
  const conversation = useConversationStore((s) => s.conversation);

  if (isLoading) return <UserInfoSkeleton />;
  if (error) return <p>{error.message}</p>;

  console.log('mounted');

  return (
    <div className="flex flex-col items-center space-y-4">
      {members && (
        <>
          <div className="relative h-20 w-20">
            <Image
              src={
                members.length > 2
                  ? PLACEHOLDER_PROFILE_IMAGE
                  : members[0].profileImage
              }
              alt="profile image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>
          {members.length > 2 ? (
            <div className="flex w-full flex-col gap-4">
              <p className="text-center text-xl font-semibold hover:underline">
                {conversation?.groupInfo?.groupName}
              </p>

              <div>
                <span className="font-bold text-mutedtext">Other Members</span>
                <Separator />
              </div>

              <ScrollArea className="h-60 w-full">
                <div className="flex flex-col gap-2">
                  {members.map((member) => (
                    <Link
                      href={'/friends/' + member._id}
                      key={member._id}
                      className="flex items-center gap-2"
                    >
                      <div className="relative h-10 w-10">
                        <Image
                          src={member.profileImage}
                          alt="profile image"
                          fill
                          style={{ objectFit: 'cover' }}
                          className="rounded-full"
                        />
                      </div>
                      <span>{member.username}</span>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <Link
              href={`/friends/${members[0]._id}`}
              className="inline-flex gap-2"
            >
              <p className="text-xl font-semibold hover:underline">
                {members[0].username}
              </p>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default UserInfo;
