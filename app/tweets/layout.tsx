import { getSession } from '@/action';

import TweetAside from './TweetAside';

export default async function TweetLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const profileObject = await getSession();
  const user = profileObject?.payload;

  return (
    <div className="flex divide-x bg-black">
      {user && <TweetAside user={user} />}
      {children}
      <div className="hidden w-[31%] md:block"></div>
    </div>
  );
}
