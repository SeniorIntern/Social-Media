import { Bookmark } from '@/app/types';
import { CACHE_KEY_BOOKMARKS } from '@/constants';
import { bookmarkService } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useBookmarks = (userId: string) => {
  return useQuery<Bookmark, Error>({
    queryKey: CACHE_KEY_BOOKMARKS,
    queryFn: () => bookmarkService.getById(userId)
  });
};

export default useBookmarks;
