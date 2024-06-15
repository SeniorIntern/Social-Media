import { Conversation } from '@/app/types';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Store {
  conversation: null | Conversation;
  setConversation: (conversation: Conversation) => void;
  reset: () => void;
}

export const useConversationStore = create(
  persist<Store>(
    (set, get) => ({
      conversation: null,
      setConversation: (conversation: Conversation) =>
        set({ conversation: conversation }),
      reset: () => set({ conversation: null })
    }),
    {
      name: 'conversation-store' // name of the item in the storage
    }
  )
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('conversationStore', useConversationStore);
}

export default useConversationStore;
