'use client';

import { Tweet } from '@/app/types';
import { Button } from '@/components/ui/button';
import isLikedAlready from '@/helpers/isLikedAlready';
import { useAddBookmark, useLikeTweet, useMe } from '@/hooks';
import { Bookmark, Heart, Repeat2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { format } from 'timeago.js';

import TweetCommentDialog from './TweetCommentDialog';
import TweetDelete from './TweetDelete';

type Props = {
  tweet: Tweet;
};

const TweetCard = ({ tweet }: Props) => {
  const { data: user } = useMe();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const likeMutation = useLikeTweet();
  const bookmarkMutation = useAddBookmark();

  // @ts-ignore
  const userId = tweet.userId._id || tweet.userId;

  return (
    <article className="flex p-4">
      <div className="relative hidden h-10 w-10 lg:block">
        <Image
          src={tweet.userProfileImage}
          alt="User Profile picture"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-full"
        />
      </div>

      <div className="grow px-2">
        <div className="flex justify-between">
          <div className="space-x-1">
            <Link
              href={userId === user?._id ? '/profile' : `players/${userId}`}
              className="font-extrabold"
            >
              {tweet.username}
            </Link>
            <span className="text-sm text-gray-400">
              {`@${tweet.username.toLowerCase()}`}
            </span>
            <span className="text-mutedtext">.</span>
            <span className="text-sm text-gray-400">
              {format(tweet.createdAt)}
            </span>
          </div>

          {user?._id === tweet.userId && (
            <TweetDelete
              userId={tweet.userId}
              tweetId={tweet._id}
              openDeleteDialog={openDeleteDialog}
              setOpenDeleteDialog={setOpenDeleteDialog}
            />
          )}
        </div>

        <div className="space-y-4">
          <p className="">{tweet.tweetContent}</p>
          {tweet.attachmentUrls.length > 0 &&
            tweet.attachmentUrls.map((attachment, index) => (
              <div key={index} className="relative h-60 w-full">
                <Image
                  src={attachment}
                  alt="Tweet attachment"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-md"
                />
              </div>
            ))}
        </div>

        {user && (
          <div className="mt-2 flex items-center justify-between">
            <TweetCommentDialog userId={user._id} tweet={tweet} />

            <Button variant={null} className="inline-flex gap-1 text-mutedtext">
              <Repeat2 size={20} />
              <span>0</span>
            </Button>

            <Button
              onClick={() => likeMutation.mutate(tweet._id)}
              disabled={
                likeMutation.isPending || isLikedAlready(tweet.likes, user._id)
              }
              variant={null}
              className="inline-flex gap-1 text-mutedtext"
            >
              {isLikedAlready(tweet.likes, user._id) ? (
                <Heart size={20} fill="#F9197F" color="#F9197F" />
              ) : (
                <Heart size={20} />
              )}
              <span>{tweet.likes.length}</span>
            </Button>

            <Button
              onClick={() => bookmarkMutation.mutate(tweet._id)}
              variant={null}
              className="inline-flex gap-1 text-mutedtext"
            >
              <Bookmark size={20} />
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};

export default TweetCard;
