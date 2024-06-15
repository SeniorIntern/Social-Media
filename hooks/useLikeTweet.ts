import { Tweet } from '@/app/types';
import { CACHE_KEY_TWEETS, TOAST_KEY_ANNOUNCE } from '@/constants';
import { apiClient } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useLikeTweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tweetId: string) =>
      apiClient.patch<Tweet>(`/tweets/like/${tweetId}`).then((res) => res.data),
    onSuccess: () => {
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

export default useLikeTweet;
