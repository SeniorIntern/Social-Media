import { getSession } from '@/action';

import ConversationList from './ConversationList';

export default async function ChatLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const profileObject = await getSession();
  const userId = profileObject?.payload._id;

  if (profileObject)
    return (
      <div className="flex divide-x bg-secondary">
        {userId && <ConversationList userId={userId} />}
        {children}
      </div>
    );
}
