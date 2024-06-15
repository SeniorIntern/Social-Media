'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { CACHE_KEY_TWEETS, TOAST_KEY_ANNOUNCE } from '@/constants';
import { apiClient } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

type Props = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>;
  tweetId: string;
  userId: string;
};

const TweetDelete = ({
  openDeleteDialog,
  userId,
  tweetId,
  setOpenDeleteDialog
}: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (tweetId: string) =>
      apiClient.delete('/tweets/' + tweetId).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_TWEETS
      });
      queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_TWEETS, userId]
      });
      setOpenDeleteDialog(false);
      toast.success('Tweet is deleted', { id: TOAST_KEY_ANNOUNCE });
    },
    onError: (err) => {
      toast.error(err.message, { id: TOAST_KEY_ANNOUNCE });
    }
  });

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogTrigger>
        <Trash2 color="red" size={18} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            tweet.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            disabled={mutation.isPending}
            type="button"
            onClick={() => mutation.mutate(tweetId)}
            variant="destructive"
          >
            Confirm
          </Button>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default TweetDelete;
