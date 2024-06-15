import { Player } from '@/app/types';
import { CACHE_KEY_PLAYER_FRIENDS } from '@/constants';
import { playerFriendService } from '@/services';
import { useQuery } from '@tanstack/react-query';

const usePlayerFriends = (userId: string) => {
  return useQuery<Player[], Error>({
    queryKey: CACHE_KEY_PLAYER_FRIENDS,
    queryFn: () => playerFriendService.getAllWithId(userId),
    refetchOnMount: 'always'
  });
};

export default usePlayerFriends;
