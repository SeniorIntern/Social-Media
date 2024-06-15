'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { UsersRound } from 'lucide-react';
import { useState } from 'react';

import { ChatCreateGroupForm } from './ChatCreateGroupForm';

type Props = {
  userId: string;
};

const ChatCreateGroupDialog = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <UsersRound size={20} />
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Create Chat Group</DialogTitle>

          <DialogDescription>
            Add members to include in the Chat Group;
          </DialogDescription>
        </DialogHeader>

        <ChatCreateGroupForm closeDialog={closeDialog} userId={userId} />

      </DialogContent>
    </Dialog>
  );
};

export default ChatCreateGroupDialog;
