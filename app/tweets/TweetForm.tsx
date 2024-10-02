'use client';

import { FileWithPreview, Tweet } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  CACHE_KEY_TWEETS,
  PLACEHOLDER_PROFILE_IMAGE,
  TOAST_KEY_ANNOUNCE
} from '@/constants';
import { useMe } from '@/hooks';
import { apiClient } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EmojiPicker from 'emoji-picker-react';
import { Image as Img, SmilePlus } from 'lucide-react';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

type Props = {
  closeDialog?: () => void;
};

const TweetForm = ({ closeDialog }: Props) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { data: user } = useMe();
  const [tweet, setTweet] = useState('');

  const queryClient = useQueryClient();

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const accept: Accept = {
    'image/png': [],
    'image/jpeg': []
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      apiClient.post<Tweet>('/tweets', formData).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_TWEETS
      });
    },
    onError: (err) => {
      toast.error(err.message, { id: TOAST_KEY_ANNOUNCE });
    }
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tweet.trim() || acceptedFiles.length !== 0) {
      const formData = new FormData();
      // Iterate over the acceptedFiles array and append each file to the FormData object
      acceptedFiles.forEach((file) => {
        formData.append('attachmentUrls', file, file.name);
      });

      // clear fields
      acceptedFiles.length = 0;
      setTweet('');

      formData.append('tweetContent', tweet);

      try {
        mutation.mutate(formData);
        closeDialog && closeDialog();
        setFiles([]);
      } catch (err: unknown) {
        if (err instanceof Error)
          toast.error(err.message, { id: TOAST_KEY_ANNOUNCE });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <div className="relative h-10 w-10">
        <Image
          src={user?.profileImage || PLACEHOLDER_PROFILE_IMAGE}
          alt="profile image"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-full"
        />
      </div>

      <div className="flex grow flex-col">
        <Input
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          className="w-full border-none bg-transparent px-0 py-4 text-xl text-muted text-white caret-white"
          placeholder="What is happening?!"
        />

        <div className="flex space-x-2">
          {files.map((file, idx) => (
            <Image
              key={idx}
              width={40}
              height={40}
              src={file.preview}
              alt="image attachment"
              className="rounded-md"
            />
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex items-end gap-4">
            <div {...getRootProps()} className="flex items-center">
              <input
                {...getInputProps()}
                type="file"
                id="attachments"
                accept="image/*"
                multiple
                size={2}
                className="hidden"
              />
              <label htmlFor="attachments">
                <Img color="#0084FF" size={18} className="cursor-pointer" />
              </label>
            </div>

            <Popover>
              <PopoverTrigger>
                <SmilePlus color="#0084FF" size={18} />
              </PopoverTrigger>
              <PopoverContent className="w-fit p-0" align="start">
                <EmojiPicker
                  onEmojiClick={(foo) => {
                    setTweet((val) => val + foo.emoji);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            variant="cyan"
            className="rounded-3xl font-semibold"
            disabled={tweet.trim() === '' && acceptedFiles.length == 0}
          >
            Post
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
