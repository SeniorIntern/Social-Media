import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, UsersRound } from 'lucide-react';

const ConversationListSkeleton = () => {
  return (
    <ScrollArea
      style={{
        maxHeight: 'calc(100vh - 56px)',
        height: 'calc(100vh - 56px)'
      }}
      className="w-[28%] bg-secondary p-2"
    >
      <aside>
        <div className="space-y-4 p-4">
          <div className="hidden items-center justify-between md:flex">
            <p className="text-xl font-bold">Chats</p>
            <UsersRound size={20} />
          </div>

          <Input
            className="hidden w-full rounded-full border-none bg-muted px-4 py-2 text-white md:block"
            placeholder="Search chat"
          />
          <Search className="text-mutedtext md:hidden" />
        </div>

        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </aside>
    </ScrollArea>
  );
};

export default ConversationListSkeleton;
