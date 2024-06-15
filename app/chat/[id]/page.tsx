import { getSession } from '@/action';
import { redirect } from 'next/navigation';

import ConversationHeader from './ConversationHeader';
import MessageContainer from './MessageContainer';
import MessageForm from './MessageForm';
import UserInfo from './UserInfo';

export default async function Page({ params }: { params: { id: string } }) {
  const profileObject = await getSession();
  if (!profileObject) redirect('/login');

  return (
    <>
      <section className="flex grow flex-col">
        <ConversationHeader userId={profileObject?.payload._id} />
        <MessageContainer
          sender={profileObject?.payload._id}
          conversationId={params.id}
        />

        <div className="mt-auto flex h-[var(--bar-height)] items-center space-x-2 px-2 py-4">
          <MessageForm
            sender={profileObject?.payload._id}
            conversationId={params.id}
          />
        </div>
      </section>

      <section className="w-[24%] hidden md:block space-y-4 p-4">
        <UserInfo conversationId={params.id} />
      </section>
    </>
  );
}
