'use client';

import useConversationStore from '@/app/store/conversationStore';
import { Conversation } from '@/app/types';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';

import UserListItem from './UserListItem';

type Prop = {
  conversations: Conversation[];
  setShowChats: Dispatch<SetStateAction<boolean>>;
  userId: string;
};

const SearchChat = ({ userId, conversations, setShowChats }: Prop) => {
  console.log('mounted');

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [matchedConversations, setMatchedConversations] = useState<
    Conversation[]
  >([]);

  const { conversation, setConversation } = useConversationStore();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const matchingChats = conversations.filter((chat) =>
      chat.members.some((member) =>
        member.username.toLowerCase().includes(term.toLowerCase().trim())
      )
    );

    if (matchingChats.length > 0) {
      setMatchedConversations(matchingChats);
      console.log('Matching Groups:', matchingChats);
    } else {
      console.log('No matching chats found.');
    }
  };

  return (
    <aside className="space-y-4">
      <div className="flex items-center gap-2">
        <MoveLeft
          onClick={() => setShowChats(true)}
          className="cursor-pointer text-mutedtext"
        />
        <Input
          className="w-full rounded-full border-none bg-muted px-4 py-2 text-white"
          placeholder="Search chat"
          value={searchTerm}
          onFocus={() => setShowChats(false)}
          onChange={handleSearch}
        />
      </div>
      <aside>
        {matchedConversations?.map((c) => (
          <Link
            onClick={() => setConversation(c)}
            href={`/chat/${c._id}`}
            className={cn(
              'block cursor-pointer rounded-md p-2',
              conversation?._id === c._id && 'bg-muted'
            )}
            key={c._id}
          >
            <UserListItem
              userData={{
                type: 'conversation',
                data: c,
                userId: userId
              }}
            />
          </Link>
        ))}
      </aside>
    </aside>
  );
};

export default SearchChat;
