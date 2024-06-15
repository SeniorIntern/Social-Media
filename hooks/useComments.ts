import { TweetWithComment } from '@/app/types';
import { CACHE_KEY_COMMENTS } from '@/constants';
import { tweetCommentService } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useComments = (tweetId: string) => {
  return useQuery<TweetWithComment, Error>({
    queryKey: [CACHE_KEY_COMMENTS, tweetId],
    queryFn: () => tweetCommentService.getById(tweetId),
    refetchOnMount: 'always'
  });
};

export default useComments;
