import { Player } from '@/app/types';

export default function filterPlayersByFriends(
  usersArray: Player[],
  friendsArray: Player[]
): Player[] {
  // Extract friend IDs from friendsArray
  const friendIDs = friendsArray.map((friend) => friend._id);

  // Filter usersArray by checking if any user's _id matches a friend ID
  const filteredUsers = usersArray.filter((user) =>
    !friendIDs.includes(user._id)
  );

  return filteredUsers;
}
