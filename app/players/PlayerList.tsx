'use client';

import UserListItem from '@/app/chat/UserListItem';
import { Button } from '@/components/ui/button';
import filterPlayersByFriends from '@/helpers/filterPlayersByFriend';
import { useAddFriend, useFriends, usePlayers } from '@/hooks';
import Link from 'next/link';
import PlayerListSkeleton from './PlayerListSkeleton';

const PlayerList = () => {
  console.log('mounted');

  const { data: allPlayers, isLoading: isPlayersLoading, error } = usePlayers();
  const { data: friends, isLoading: isFriendsLoading } = useFriends();
  const mutation = useAddFriend();

  if (isPlayersLoading || isFriendsLoading) return <PlayerListSkeleton/>

  if (error) return <p>{error.message}</p>;

  if (allPlayers && friends) {
    const players = filterPlayersByFriends(allPlayers, friends);

    return (
      <aside className="space-y-4 overflow-y-auto">
        {players.map((player) => (
          <div className="block cursor-pointer rounded-md p-2" key={player._id}>
            <UserListItem userData={{ type: 'player', data: player }}>
              <div className="flex flex-col items-center gap-2 xl:flex-row">
                <Button
                  onClick={() => mutation.mutate(player._id)}
                  className="px-6"
                >
                  Add Friend
                </Button>
                <Button className="px-6" asChild>
                  <Link href={`/players/${player._id}`}>Visit Profile</Link>
                </Button>
              </div>
            </UserListItem>
          </div>
        ))}
      </aside>
    );
  }
};

export default PlayerList;
