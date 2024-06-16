import { getSession } from '@/action';
import NavOptions from '@/app/NavOptions';
import { UserAvatar } from '@/components/reusables/UserAvatar';
import UserNav from '@/components/reusables/UserNav';

const Header = async () => {
  const profileObject = await getSession();
  const userId = profileObject?.payload._id;

  return (
    <nav className="flex h-[var(--bar-height)] items-center justify-between border-b bg-secondary py-2 px-8">
      <NavOptions />
      <UserNav>
        {userId ? (
          <UserAvatar hideName={true} userId={userId} />
        ) : (
          <span>Login</span>
        )}
      </UserNav>
    </nav>
  );
};

export default Header;
