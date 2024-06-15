'use client';

import { useMe } from '@/hooks';

import BookmarkContainerSkeleton from './BookmarkContainerSkeleton';
import BookmarksContainer from './BookmarksContainer';

export default function Page() {
  const { data: user, isLoading, error } = useMe();
  if (isLoading) return <BookmarkContainerSkeleton />;

  return <>{user && <BookmarksContainer userId={user._id} />}</>;
}
