import { getSession } from '@/action';
import Logout from '@/components/reusables/Logout';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode } from 'react';

import { UserAvatar } from './UserAvatar';

type Props = {
  children: ReactNode;
  triggerClassNames?: string;
  contentClassNames?: string;
};

const UserNav = async ({
  children,
  triggerClassNames,
  contentClassNames
}: Props) => {
  const profileObject = await getSession();
  const userId = profileObject?.payload._id;

  if (userId)
    return (
      <DropdownMenu dir="ltr">
        <DropdownMenuTrigger className={triggerClassNames}>
          {children}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className={cn('min-w-80 border-none bg-secondary', contentClassNames)}
        >
          <>
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer space-x-2 py-3">
                <UserAvatar userId={userId} />
              </DropdownMenuItem>
            </Link>
            <Separator />
            <DropdownMenuItem className="cursor-pointer space-x-2 py-3">
              <Logout />
            </DropdownMenuItem>
          </>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  else
    return (
      <Button asChild className="w-fit" variant="outline">
        <Link href="/login">Login</Link>
      </Button>
    );
};

export default UserNav;
