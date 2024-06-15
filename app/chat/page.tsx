'use client';

import useConversationStore from '@/app/store/conversationStore';
import { MessageCircleMore } from 'lucide-react';
import { useEffect } from 'react';

export default function Page() {
  const { reset } = useConversationStore();

  useEffect(() => {
    reset();

    return () => reset();
  }, [reset]);

  console.log('mounted');

  return (
    <section className="flex grow items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <MessageCircleMore size={140} color="#0084FF" />
        <p className="text-xl font-bold text-gray-400">No chats selected</p>
      </div>
    </section>
  );
}
