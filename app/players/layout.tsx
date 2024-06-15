import { ScrollArea } from '@/components/ui/scroll-area';

import PlayerList from './PlayerList';

export default async function PlayerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex divide-x">
      <ScrollArea
        style={{
          maxHeight: 'calc(100vh - 56px)',
          height: 'calc(100vh - 56px)'
        }}
        className="w-[28%] bg-secondary p-2"
      >
        <div className="my-4 hidden md:block">
          <span className="text-sm text-mutedtext">Friends</span>
          <p className="text-xl font-extrabold">Suggestions</p>
        </div>

        <p className='hidden md:block'>People you may know</p>
        <PlayerList />
      </ScrollArea>

      {children}
    </div>
  );
}
