'use client';

import { usePlayer } from '@/hooks';

import ProfileAbout from './ProfileAbout';
import { ProfileInformationSkeleton } from './ProfileInformationSkeleton';
import ProfileIntro from './ProfileIntro';

type Props = {
  userId: string;
  hideDialog?: boolean;
};

const ProfileInformation = ({ userId, hideDialog = false }: Props) => {
  const { data: user, isLoading, error } = usePlayer(userId);
  if (isLoading) return <ProfileInformationSkeleton />;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {user && (
        <section className="flex flex-col gap-4 px-6 lg:flex-row">
          <ProfileIntro user={user} hideDialog={hideDialog} />
          <ProfileAbout user={user} hideDialog={hideDialog} />
        </section>
      )}
    </>
  );
};

export default ProfileInformation;
