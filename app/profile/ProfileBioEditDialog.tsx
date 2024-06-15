'use client';

import { PlayerIntro } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useState } from 'react';

import ProfileBioForm from './ProfileBioForm';

type Props = {
  userIntro: PlayerIntro;
  userId: string;
};

const ProfileBioEditDialog = ({ userIntro, userId }: Props) => {
  console.log('mounted');

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="muted" className="w-full">
          Edit Bio
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Fill your information
          </DialogTitle>
        </DialogHeader>
        <ProfileBioForm
          userId={userId}
          userIntro={userIntro}
          openBioDialog={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileBioEditDialog;
