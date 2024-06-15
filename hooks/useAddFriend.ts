import { Player } from '@/app/types';
import {
  CACHE_KEY_FRIENDS,
  CACHE_KEY_PLAYER_FRIENDS,
  TOAST_KEY_ANNOUNCE
} from '@/constants';
import { apiClient } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useAddFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: string) =>
      apiClient.patch<Player>(`/Users`, { friendId }).then((res) => res.data),
    onSuccess: () => {
      toast.success('Friend Added', { id: TOAST_KEY_ANNOUNCE });
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_FRIENDS
      });
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_PLAYER_FRIENDS
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data, { id: TOAST_KEY_ANNOUNCE });
      }
    }
  });
};

export default useAddFriend;
