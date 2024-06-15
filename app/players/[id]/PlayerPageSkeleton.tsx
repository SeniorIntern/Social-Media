import ProfileComponentSkeleton from '@/app/profile/ProfileComponentSkeleton';
import { ProfileInformationSkeleton } from '@/app/profile/ProfileInformationSkeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

const PlayerPageSkeleton = () => {
  return (
    <ScrollArea
      className="w-[72%] overflow-y-scroll"
      style={{ maxHeight: 'calc(100vh - 56px)' }}
    >
      <div className="space-y-6">
        <div className="bg-secondary">
          <ProfileComponentSkeleton />
        </div>
        <ProfileInformationSkeleton />
      </div>
    </ScrollArea>
  );
};

export default PlayerPageSkeleton;
