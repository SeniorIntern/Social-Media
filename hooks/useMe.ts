import { Player } from '@/app/types';
import { CACHE_KEY_ME } from '@/constants';
import userService from '@/services/userService';
import { useQuery } from '@tanstack/react-query';

const useMe = () => {
  return useQuery<Player, Error>({
    queryKey: CACHE_KEY_ME,
    queryFn: userService.getMe
  });
};

export default useMe;
