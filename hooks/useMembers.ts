import { Player } from '@/app/types';
import { CACHE_KEY_MEMBERS } from '@/constants';
import memberService from '@/services/memberService';
import { useQuery } from '@tanstack/react-query';

const useMembers = (id: string) => {
  return useQuery<Player[], Error>({
    queryKey: [CACHE_KEY_MEMBERS, id],
    queryFn: () => memberService.getAllWithId(id)
  });
};

export default useMembers;
