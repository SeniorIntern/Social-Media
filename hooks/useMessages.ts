import { PaginatedMessage } from '@/app/types';
import { apiClient } from '@/services';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

const useMessages = (id: string, limit: number) => {
  return useInfiniteQuery<PaginatedMessage, Error>({
    queryKey: ['messages', id],
    queryFn: ({ pageParam }) =>
      apiClient
        .get<PaginatedMessage>('/messages/' + id, {
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

export default useMessages;
