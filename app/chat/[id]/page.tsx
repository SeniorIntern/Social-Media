import { getSession } from '@/action';
import { redirect } from 'next/navigation';

import ConversationHeader from './ConversationHeader';
import MessageContainer from './MessageContainer';
import MessageForm from './MessageForm';
import UserInfo from './UserInfo';

export default async function Page({ params }: { params: { id: string } }) {
  const conversationId = params.id;

  const profileObject = await getSession();
  if (!profileObject) redirect('/login');

  return (
    <>
      <section className="flex grow flex-col">
        <ConversationHeader conversationId={conversationId} />
        <MessageContainer
          sender={profileObject?.payload._id}
          conversationId={conversationId}
        />
        <MessageForm
          sender={profileObject?.payload._id}
          conversationId={params.id}
        />
      </section>

      <section className="hidden w-[24%] space-y-4 p-4 md:block">
        <UserInfo conversationId={params.id} />
      </section>
    </>
  );
}
