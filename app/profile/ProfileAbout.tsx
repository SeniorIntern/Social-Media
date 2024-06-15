'use client';

import { Player } from '@/app/types';
import { useState } from 'react';

import ProfileAboutEditDialog from './ProfileAboutEditDialog';
import { ProfileTweets } from './ProfileTweets';

type Props = {
  user: Player;
  hideDialog?: boolean;
};

const ProfileAbout = ({ user, hideDialog = false }: Props) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  console.log('mounted');

  return (
    <div className="w-full space-y-4 lg:w-[58%]">
      <div className="h-fit space-y-4 rounded-md bg-secondary p-4">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">About</p>
          {user && !hideDialog && (
            <ProfileAboutEditDialog about={user?.about} id={user?._id} />
          )}
        </div>
        {user?.about && (
          <p>
            {user?.about?.substring(
              0,
              showMore ? undefined : user.about.length / 2
            )}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => setShowMore((val) => !val)}
            >
              {showMore ? ' See less' : '...See more'}
            </span>
          </p>
        )}
      </div>
      <ProfileTweets userId={user._id} />
    </div>
  );
};

export default ProfileAbout;
