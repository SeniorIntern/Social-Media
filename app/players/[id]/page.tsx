'use client';

import ProfileComponent from '@/app/profile/ProfileComponent';
import ProfileInformation from '@/app/profile/ProfileInformation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFriends } from '@/hooks';
import { useRouter } from 'next/navigation';

import PlayerPageSkeleton from './PlayerPageSkeleton';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { data: friends, isLoading, error } = useFriends();
  if (isLoading) return <PlayerPageSkeleton />;
  if (error) return <p>{error.message}</p>;

  let isPlayerAlsoFriend = false;

  const checkIfPlayerIsAlsoFriend = () => {
    if (friends) {
      for (let friend of friends) {
        if (friend._id === params.id) {
          isPlayerAlsoFriend = true;
          return; // Exit the function once a match is found
        }
      }
    }
  };

  checkIfPlayerIsAlsoFriend();
  isPlayerAlsoFriend && router.push(`/friends/${params.id}`);

  return (
    <ScrollArea
      className="w-[72%] overflow-y-scroll"
      style={{ maxHeight: 'calc(100vh - 56px)' }}
    >
      <div className="space-y-6">
        <div className="bg-secondary">
          <ProfileComponent
            showImageDialog={false}
            prop={{ id: params.id, type: 'param' }}
          />
        </div>
        <ProfileInformation hideDialog={true} userId={params.id} />
      </div>
    </ScrollArea>
  );
}
