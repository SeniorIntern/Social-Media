import { Payload } from '@/app/types';
import {
  Bell,
  Bookmark,
  CircleEllipsis,
  Home,
  Mail,
  Search,
  User,
  Users,
  X
} from 'lucide-react';
import Link from 'next/link';

import TweetAsideControl from './TweetAsideControl';
import TweetDialogForm from './TweetDialogForm';

type Props = {
  user: Payload;
};

const TweetAside = ({ user }: Props) => {
  const tweetAsideOptions = [
    { icon: <Home />, option: 'Home', href: '/tweets' },
    { icon: <Search />, option: 'Explore', href: '/tweets' },
    { icon: <Bell />, option: 'Notifications', href: '/tweets' },
    { icon: <Mail />, option: 'Messages', href: '/chat' },
    { icon: <Bookmark />, option: 'Bookmarks', href: '/tweets/bookmarks' },
    { icon: <Users />, option: 'Communities', href: '/players' },
    { icon: <X />, option: 'Premium', href: '/tweets' },
    { icon: <User />, option: 'Profile', href: '/profile' },
    { icon: <CircleEllipsis />, option: 'More', href: '/tweets' }
  ];

  return (
    <aside className="flex w-[22%] flex-col justify-between px-3 py-2">
      <div className="space-y-2">
        <nav className="flex flex-col px-2 items-end lg:items-start">
          {tweetAsideOptions.map((o, index) => (
            <Link
              key={index}
              href={o.href}
              className="flex w-fit items-center gap-4 rounded-full p-3 pr-8 text-xl hover:bg-secondary/70"
            >
              {o.icon}
              <span className="hidden md:block">{o.option}</span>
            </Link>
          ))}
        </nav>
        <TweetDialogForm />
      </div>

      <TweetAsideControl user={user} />
    </aside>
  );
};

export default TweetAside;
