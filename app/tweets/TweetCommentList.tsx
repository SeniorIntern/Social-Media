'use client';

import { useComments } from '@/hooks';
import Image from 'next/image';
import { format } from 'timeago.js';

const TweetCommentList = ({ tweetId }: { tweetId: string }) => {
  const { data: tweet, isLoading, error } = useComments(tweetId);

  return (
    <div className="my-8">
      {tweet && (
        <div className="space-y-4">
          {tweet.comments.map((comment) => (
            <div key={comment._id}>
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10">
                  <Image
                    src={comment.profileImage}
                    alt="User Profile picture"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>

                <div>
                  <p className="space-x-1">
                    <span className="space-x-2">
                      {comment.username}
                      <span className="text-sm text-mutedtext">
                        {` @${comment.username.toLowerCase()}`}
                      </span>
                    </span>
                    <span className="text-mutedtext">.</span>
                    <span className="text-xs text-mutedtext">
                      {format(comment.createdAt)}
                    </span>
                  </p>
                  <p>{comment.commentContent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TweetCommentList;
