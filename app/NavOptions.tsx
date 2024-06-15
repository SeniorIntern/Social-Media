'use client';

import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

const NavOptions = () => {
  const path = usePathname();

  const options = [
    { option: 'Chat', href: '/chat' },
    { option: 'Tweets', href: '/tweets' },
    { option: 'Players', href: '/players' }
  ];

  return (
    <div className='px-4'>
      <div className="hidden items-center space-x-12 md:flex">
        <Link href="/">
          <span className="text-3xl font-extrabold">XC</span>
        </Link>
        {options.map((o, index) => (
          <Link
            key={index}
            href={o.href}
            className={cn(path === o.href && 'font-semibold text-primary')}
          >
            {o.option}
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left mb-6">
                <Link href="/" className="text-3xl font-extrabold">
                  XC
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4">
              {options.map((o, index) => (
                <Link
                  key={index}
                  href={o.href}
                  className={cn(
                    path === o.href && 'font-semibold text-primary'
                  )}
                >
                  {o.option}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavOptions;
