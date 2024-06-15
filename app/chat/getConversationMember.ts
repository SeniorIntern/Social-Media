import { Member } from '@/app/types';

function getConversationMember(
  membersArray: Member[],
  idToExclude: string
): Member {
  return membersArray.find((obj) => obj._id !== idToExclude)!;
}

export default getConversationMember;
