import { Tweet } from '@/app/types';
import { CACHE_KEY_TWEETS } from '@/constants';
import { userTweetService } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useUserTweets = (userId: string) => {
  return useQuery<Tweet[], Error>({
    queryKey: [CACHE_KEY_TWEETS, userId],
    queryFn: () => userTweetService.getAllWithId(userId)
  });
};

export default useUserTweets;
