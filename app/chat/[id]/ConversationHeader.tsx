'use client';

import useConversationStore from '@/app/store/conversationStore';
import { PLACEHOLDER_PROFILE_IMAGE } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

import getConversationMember from '../getConversationMember';

type Props = {
  userId: string;
};

const ConversationHeader = ({ userId }: Props) => {
  const conversation = useConversationStore((s) => s.conversation);

  console.log('mounted');

  return (
    <div>
      {conversation && (
        <Link
          href={
            '/friends/' +
            getConversationMember(conversation?.members, userId)._id
          }
        >
          <div className="flex h-[var(--bar-height)] items-center space-x-2 p-2">
            <div className="relative h-10 w-10">
              <Image
                src={
                  conversation.members.length > 2
                    ? PLACEHOLDER_PROFILE_IMAGE
                    : getConversationMember(conversation?.members, userId)
                      .profileImage
                }
                alt="profile image"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-full"
              />
            </div>
            <p className="font-semibold">
              {conversation.isGroup
                ? conversation.groupInfo?.groupName
                : getConversationMember(conversation?.members, userId).username}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ConversationHeader;
