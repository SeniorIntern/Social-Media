import { ConversationData, PlayerData } from '@/app/types';
import getProfileImage from '@/helpers/getProfileImage';
import Image from 'next/image';
import { ReactNode } from 'react';

import getConversationMember from './getConversationMember';

type Props = {
  userData: PlayerData | ConversationData;
  children?: ReactNode;
};

const UserListItem = ({ userData, children }: Props) => {
  console.log('mounted');

  const profileImage = getProfileImage(userData);

  return (
    <div className="flex items-center space-x-4">
      <div className="relative h-14 w-14">
        <Image
          src={profileImage}
          alt="profile image"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-full"
        />
      </div>
      <div className="hidden space-y-2 md:block">
        {userData.type === 'conversation' && (
          <p>
            {userData.data.isGroup
              ? userData.data.groupInfo?.groupName
              : getConversationMember(userData.data.members, userData.userId)
                .username}
          </p>
        )}

        {userData.type === 'player' && <p>{userData.data.username}</p>}

        {children}
      </div>
    </div>
  );
};

export default UserListItem;
