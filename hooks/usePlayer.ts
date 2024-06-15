import { Player } from '@/app/types';
import { CACHE_KEY_PLAYER } from '@/constants';
import playerService from '@/services/playerService';
import { useQuery } from '@tanstack/react-query';

const usePlayer = (id: string) => {
  return useQuery<Player, Error>({
    queryKey: [CACHE_KEY_PLAYER, id],
    queryFn: () => playerService.getById(id)
  });
};

export default usePlayer;
