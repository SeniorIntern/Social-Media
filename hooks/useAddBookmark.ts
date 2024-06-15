import { Bookmark } from '@/app/types';
import { CACHE_KEY_BOOKMARKS, TOAST_KEY_ANNOUNCE } from '@/constants';
import { apiClient } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tweetId: string) =>
      apiClient
        .patch<Bookmark>(`/bookmarks/` + tweetId)
        .then((res) => res.data),
    onSuccess: () => {
      toast.success('Tweet is added to bookmark', { id: TOAST_KEY_ANNOUNCE });
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_BOOKMARKS
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data, { id: TOAST_KEY_ANNOUNCE });
      }
    }
  });
};

export default useAddBookmark;
