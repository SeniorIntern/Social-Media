import { Player } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TOAST_KEY_ANNOUNCE } from '@/constants';
import { usePlayerFriends } from '@/hooks';
import { apiClient } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import UserListItem from './UserListItem';

const formSchema = z.object({
  members: z
    .array(z.string())
    .min(1, { message: 'Group should have at least 1 members' }),
  isGroup: z.boolean().default(true),
  groupName: z
    .string()
    .min(2, {
      message: 'Goup name must be at least 2 characters.'
    })
    .max(40, { message: 'Goup name must be between 2-40 characters.' }),
  groupAdmin: z.string()
});

type Props = {
  closeDialog: () => void;
  userId: string;
};

export const ChatCreateGroupForm = ({ closeDialog, userId }: Props) => {
  const { data: friends, isLoading, error } = usePlayerFriends(userId);

  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<Player[] | undefined>();

  const handleAdd = (playerId: string) => {
    setGroupMembers((prev) => [...prev, playerId]);
  };

  const handleRemove = (playerId: string) => {
    setGroupMembers((prev) => prev.filter((p) => p !== playerId));
  };

  const handleSearch = (input: string) => {
    const results = friends?.filter((friend) =>
      friend.username.includes(input)
    );
    setSearchResult(results);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      members: [userId],
      isGroup: true,
      groupName: '',
      groupAdmin: userId
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.members = values.members.concat(groupMembers);

    try {
      const { members, isGroup, groupName, groupAdmin } = values;

      const payload = {
        members,
        isGroup,
        groupInfo: {
          groupName,
          groupAdmin
        }
      };
      console.log('payload===', values);

      const res = await apiClient.post('/conversations', payload);
      toast.success('Group is created', { id: TOAST_KEY_ANNOUNCE });

      setGroupMembers([]);
    } catch (err: unknown) {
      console.log('error===', err);
      toast.success('Group failed to create', { id: TOAST_KEY_ANNOUNCE });

      setGroupMembers([]);
    } finally {
      closeDialog();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="groupName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input placeholder="Aa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="plain" type="submit" className="w-full">
          Create
        </Button>
      </form>

      <div className="flex flex-col gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">Search for friend</Label>
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            id="username"
            placeholder="John Smith"
          />
        </div>

        <ScrollArea className="h-[300px] w-full rounded-md py-2">
          <div className="space-y-2">
            <span className="text-sm text-mutedtext">Search Results:</span>
            <div className="flex flex-col gap-2">
              {searchResult &&
                searchResult.length > 0 &&
                searchResult.map((friend, i) => (
                  <div className="flex items-center justify-between" key={i}>
                    <UserListItem userData={{ type: 'player', data: friend }} />
                    {groupMembers.includes(friend._id) ? (
                      <Button
                        onClick={() => handleRemove(friend._id)}
                        className="px-6"
                        variant="destructive"
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAdd(friend._id)}
                        className="px-6"
                      >
                        Add
                      </Button>
                    )}
                  </div>
                ))}
            </div>

            <div className="flex flex-col gap-2">
              {!searchResult &&
                friends &&
                friends.map((friend) => (
                  <div
                    className="flex items-center justify-between"
                    key={friend._id}
                  >
                    <UserListItem userData={{ type: 'player', data: friend }} />
                    {groupMembers.includes(friend._id) ? (
                      <Button
                        onClick={() => handleRemove(friend._id)}
                        className="px-6"
                        variant="destructive"
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAdd(friend._id)}
                        className="px-6"
                      >
                        Add
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </Form>
  );
};
