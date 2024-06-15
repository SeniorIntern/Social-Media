'use client';

import { Button } from '@/components/ui/button';
import { PLACEHOLDER_PROFILE_IMAGE } from '@/constants';
import { useAddFriend, usePlayer } from '@/hooks';
import { Camera, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import FriendSuggestions from './FriendSuggestions';
import ImageUploadDialog from './ImageUploadDialog';
import ProfileEditDialog from './ProfileEditDialog';
import ProfileComponentSkeleton from './ProfileComponentSkeleton';

type Props = {
  prop: {
    id: string;
    type: 'param' | 'user' | 'friend';
  };
  showImageDialog: boolean;
};

const ProfileComponent = ({ prop, showImageDialog }: Props) => {
  const router = useRouter();

  const mutation = useAddFriend();

  const { data: user, isLoading, error } = usePlayer(prop.id);
  if (isLoading) return <ProfileComponentSkeleton />;
  if (error) return <p>{error.message}</p>;

  return (
    <section className="grow px-24">
      <div className="relative">
        {user && (
          <div className="relative h-96 w-full">
            <Image
              src={
                user?.coverImage ? user.coverImage : PLACEHOLDER_PROFILE_IMAGE
              }
              alt="User cover photo"
              sizes="300px"
              fill
              className="rounded-b-md"
              style={{
                objectFit: 'cover'
              }}
            />
          </div>
        )}
        <div className="absolute bottom-2 right-8">
          {showImageDialog && user && (
            <ImageUploadDialog
              title="Drop/Upload cover photo"
              type="cover"
              userId={user._id}
            >
              <Button className="inline-flex gap-1 rounded-md bg-white font-semibold text-black shadow-inner hover:bg-white">
                <Camera color="white" fill="black" size={24} />
                Edit cover photo
              </Button>
            </ImageUploadDialog>
          )}
        </div>
      </div>
      <div className="flex h-36 justify-between p-4">
        <div className="relative flex items-center gap-4">
          <div className="relative hidden self-end md:block lg:h-44 lg:w-44">
            <Image
              src={
                user?.profileImage
                  ? user.profileImage
                  : PLACEHOLDER_PROFILE_IMAGE
              }
              alt="User profile image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full border-4 border-background"
            />
          </div>

          <div className="self-center">
            <p className="text-3xl font-semibold">{user?.username}</p>
            <p className="text-gray-400">{user?.friends?.length} friends</p>
          </div>
          <div className="absolute bottom-2 left-32 border-0">
            {showImageDialog && user && (
              <ImageUploadDialog
                title="Drop/Upload profile picture"
                type="profile"
                userId={user._id}
              >
                <Button variant={null}>
                  <Camera
                    className="rounded-full border bg-gray-600 p-1"
                    color="gray"
                    fill="white"
                    size={34}
                  />
                </Button>
              </ImageUploadDialog>
            )}
          </div>
        </div>

        <div className="self-center">
          {prop.type === 'param' && (
            <Button
              onClick={() => {
                mutation.mutate(prop.id);
                router.push('/players');
              }}
              className="inline-flex space-x-2 rounded-md px-4"
            >
              <UserPlus />
              <span className="hidden md:block">Add Friend</span>
            </Button>
          )}
          {prop.type === 'user' && user && <ProfileEditDialog user={user} />}
        </div>
      </div>

      {prop.type === 'user' && (
        <article className="rounded-md border border-gray-700 p-4">
          <div className="flex justify-between py-2">
            <p>People You May know</p>
            <Link href="/players" className="text-blue-600">
              See all
            </Link>
          </div>
          <FriendSuggestions />
        </article>
      )}
    </section>
  );
};

export default ProfileComponent;
