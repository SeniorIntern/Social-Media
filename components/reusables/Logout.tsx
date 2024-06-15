'use server';

import { logout } from '@/action';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';

const Logout = async () => {
  return (
    <form
      action={async () => {
        'use server';
        await logout();
        redirect('/login');
      }}
      className="inline-flex w-full gap-2 p-0"
    >
      <LogOut color="white" size={34} className="rounded-full bg-muted p-2" />
      <button className="w-full text-left font-semibold text-white">
        Logout
      </button>
    </form>
  );
};

export default Logout;
