import getConversationMember from '@/app/chat/getConversationMember';
import { ConversationData, PlayerData } from '@/app/types';
import { PLACEHOLDER_PROFILE_IMAGE } from '@/constants';

const getProfileImage = (userData: PlayerData | ConversationData): string => {
  if (userData.type === 'conversation') {
    if (userData.data.members.length > 2) return PLACEHOLDER_PROFILE_IMAGE;

    const member = getConversationMember(
      userData.data.members,
      userData.userId
    );
    return member.profileImage;
  } else {
    return userData.data.profileImage;
  }
};

export default getProfileImage;
