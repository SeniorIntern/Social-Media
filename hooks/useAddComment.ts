import { Tweet } from '@/app/types';
import {
  CACHE_KEY_COMMENTS,
  CACHE_KEY_TWEETS,
  TOAST_KEY_ANNOUNCE
} from '@/constants';
import { apiClient } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useAddComment = () => {
  const queryClient = useQueryClient();

  type payload = {
    tweetId: string;
    commentContent: string;
  };

  return useMutation({
    mutationFn: (data: payload) =>
      apiClient
        .patch<Tweet>(`/tweets/comment/${data.tweetId}`, {
          commentContent: data.commentContent
        })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_COMMENTS
      });
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_TWEETS
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data, { id: TOAST_KEY_ANNOUNCE });
      }
    }
  });
};

export default useAddComment;
