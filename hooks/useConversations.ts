import { Conversation } from '@/app/types';
import { CACHE_KEY_CONVERSATIONS } from '@/constants';
import { conversationService } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useConversations = (userId: string) => {
  return useQuery<Conversation[], Error>({
    queryKey: [CACHE_KEY_CONVERSATIONS, userId],
    queryFn: () => conversationService.getAllWithId(userId),
    refetchOnMount: 'always'
  });
};

export default useConversations;
