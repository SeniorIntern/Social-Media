'use client';

import filterPlayersByFriends from '@/helpers/filterPlayersByFriend';
import { useFriends, usePlayers } from '@/hooks';

import PeopleSuggestionItem from './PeopleSuggestionItem';

const FriendSuggestions = () => {
  const { data: allPlayers } = usePlayers();
  const { data: friends } = useFriends();

  if (allPlayers && friends) {
    const players = filterPlayersByFriends(allPlayers, friends);

    return (
      <aside className="flex gap-4 overflow-scroll">
        {players.map((p) => (
          <PeopleSuggestionItem key={p._id} user={p} />
        ))}
      </aside>
    );
  }
};

export default FriendSuggestions;
