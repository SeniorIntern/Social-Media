import { PaginatedTweets } from '@/app/types';
import { CACHE_KEY_TWEETS } from '@/constants';
import { apiClient } from '@/services';
import {
  keepPreviousData,
  useInfiniteQuery,
} from '@tanstack/react-query';

const useTweets = (limit: number) => {
  return useInfiniteQuery<PaginatedTweets, Error>({
    queryKey: CACHE_KEY_TWEETS,
    queryFn: ({ pageParam }) =>
      apiClient
        .get<PaginatedTweets>('/tweets', {
          params: {
            limit: typeof pageParam === 'number' ? pageParam : limit
          }
        })
        .then((res) => res.data),
    refetchOnMount: 'always',
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.totalPages > 1
        ? limit * (allPages.length + 1)
        : undefined;
    },
    initialPageParam: limit
  });
};

export default useTweets;
