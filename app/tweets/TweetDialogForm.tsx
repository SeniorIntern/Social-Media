'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import { useState } from 'react';

import TweetForm from './TweetForm';

const TweetDialogForm = () => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="cyan" className="w-[96%] rounded-full py-6 font-bold">
          Post
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[20%] bg-black p-0">
        <DialogHeader className="p-0"></DialogHeader>
        <TweetForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default TweetDialogForm;
