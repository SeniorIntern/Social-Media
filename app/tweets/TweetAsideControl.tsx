import { Payload } from '@/app/types';
import { UserAvatar } from '@/components/reusables/UserAvatar';
import UserNav from '@/components/reusables/UserNav';
import { Ellipsis } from 'lucide-react';

type Props = {
  user: Payload;
};

const TweetAsideControl = ({ user }: Props) => {
  console.log('user=== ', user);

  return (
    <div className="rounded-full hover:bg-secondary/70 md:p-2">
      <UserNav triggerClassNames={'w-full'} contentClassNames={'min-w-60'}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <UserAvatar hideName={true} userId={user._id} />
            <div className="hidden lg:block">
              <p className="font-semibold">{user.username}</p>
              <p className="text-mutedtext/60">
                @{user.username.toLowerCase()}
              </p>
            </div>
          </div>
          <Ellipsis className="hidden text-mutedtext lg:block" size={22} />
        </div>
      </UserNav>
    </div>
  );
};

export default TweetAsideControl;
