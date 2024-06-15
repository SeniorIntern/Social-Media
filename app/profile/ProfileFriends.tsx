import { PLACEHOLDER_PROFILE_IMAGE } from '@/constants';
import { usePlayerFriends } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  userId: string;
  hideDialog: boolean;
};

export const ProfileFriends = ({ hideDialog, userId }: Props) => {
  const { data: friends, isLoading, error } = usePlayerFriends(userId);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="mb-4 h-fit space-y-4 rounded-md bg-secondary p-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Friends</p>
        {!hideDialog && (
          <Link href={'/chat'} className="text-primary">
            See all friends
          </Link>
        )}
      </div>
      <span className="text-mutedtext">{friends?.length} friends</span>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-3">
        {friends?.map((friend) => (
          <div key={friend._id}>
            <div
              key={friend._id}
              className="relative h-20 w-20 md:h-28 md:w-28"
            >
              <Image
                src={friend.profileImage || PLACEHOLDER_PROFILE_IMAGE}
                alt="profile image"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-md"
              />
            </div>
            <Link
              href={`/friends/${friend._id}`}
              className="text-xs font-semibold"
            >
              {friend.username}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
