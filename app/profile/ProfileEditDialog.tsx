'use client';

import { Player } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PLACEHOLDER_PROFILE_IMAGE } from '@/constants';
import { Pencil } from 'lucide-react';
import Image from 'next/image';

import ImageUploadDialog from './ImageUploadDialog';
import ProfileIntro from './ProfileIntro';

type Props = {
  user: Player;
};

const ProfileEditDialog = ({ user }: Props) => {
  console.log('mounted');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-md bg-primary p-2 px-4 text-white">
          <Pencil size={18} />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md border-none">
        <ScrollArea type="scroll" style={{ maxHeight: 'calc(100vh - 168px)' }}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-white">
              Edit Profile
            </DialogTitle>
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">Profile picture</span>
                  {user && (
                    <ImageUploadDialog
                      userId={user._id}
                      title="Drop/Upload profile picture"
                      type="profile"
                    >
                      <span className="cursor-pointer">Edit</span>
                    </ImageUploadDialog>
                  )}
                </div>

                <div className="relative mx-auto h-44 w-44">
                  <Image
                    src={user?.profileImage || PLACEHOLDER_PROFILE_IMAGE}
                    alt="profile image"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">Cover image</span>
                  {user && (
                    <ImageUploadDialog
                      title="Drop/Upload cover photo"
                      type="cover"
                      userId={user._id}
                    >
                      <span className="cursor-pointer">Edit</span>
                    </ImageUploadDialog>
                  )}
                </div>
                <div className="relative mx-auto h-44 w-3/4">
                  <Image
                    src={user?.coverImage || PLACEHOLDER_PROFILE_IMAGE}
                    alt="cover photo"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                </div>
              </div>
              {user && <ProfileIntro user={user} />}
            </div>
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
