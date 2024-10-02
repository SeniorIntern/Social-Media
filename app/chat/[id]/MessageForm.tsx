'use client';

import useSocket from '@/app/store/socketStore';
import { FileWithPreview, Message } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { CACHE_KEY_CONVERSATIONS, TOAST_KEY_ANNOUNCE } from '@/constants';
import apiClient from '@/services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import EmojiPicker from 'emoji-picker-react';
import { Image as Img, SendHorizontal, SmilePlus } from 'lucide-react';
import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

type Props = {
  sender: string;
  conversationId: string;
};

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const MessageForm = ({ conversationId, sender }: Props) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { socket } = useSocket();
  const messageRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      apiClient.post<Message>('/messages', formData).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_CONVERSATIONS, conversationId]
      });

      queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_CONVERSATIONS, sender]
      });

      socket.emit('send', {
        ...{
          conversationId,
          sender,
          text: messageRef.current?.value,
          attachmentUrls: data.attachmentUrls
        },
        updatedAt: Date.now()
      });

      // clear text from input. clear after emitting socket's event
      if (messageRef.current?.value) {
        messageRef.current.value = '';
      }
    },
    onError: (err) => {
      toast.error(err.message, { id: TOAST_KEY_ANNOUNCE });
    }
  });

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  };

  const accept: Accept = {
    'image/png': [],
    'image/jpeg': []
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (messageRef.current?.value.trim() || acceptedFiles.length) {
      const formData = new FormData();
      // Iterate over the acceptedFiles array and append each file to the FormData object
      acceptedFiles.forEach((file) => {
        formData.append('attachmentUrls', file, file.name);
      });
      acceptedFiles.length = 0;

      formData.append('conversationId', conversationId);
      formData.append('sender', sender);

      if (messageRef.current?.value.trim()) {
        formData.append('text', messageRef.current.value);
      }

      try {
        // clear files from input
        setFiles([]);

        mutation.mutate(formData);
      } catch (err: unknown) {
        if (err instanceof Error)
          toast.error(err.message, { id: TOAST_KEY_ANNOUNCE });
      }
    }
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="relative mt-auto flex max-h-fit grow flex-col px-1 py-2">
      <div className="absolute -top-[105%] flex space-x-2 bg-secondary px-2">
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

      <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
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
            <Img color="#0084FF" className="cursor-pointer" />
          </label>
        </div>

        <Popover>
          <PopoverTrigger>
            <SmilePlus color="#0084FF" />
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0" align="start">
            <EmojiPicker
              onEmojiClick={(foo) => {
                if (messageRef.current) messageRef.current.value += foo.emoji;
              }}
            />
          </PopoverContent>
        </Popover>

        <Input
          ref={messageRef}
          className={classNames(
            'w-full rounded-3xl border-none bg-muted px-4 py-2',
            { 'text-mutedtext': mutation.isPending }
          )}
          placeholder="Aa"
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {mutation.isPending ? (
                <Spinner />
              ) : (
                <Button
                  disabled={mutation.isPending}
                  variant="ghost"
                  className="-rotate-90 p-0"
                >
                  <SendHorizontal color="#0084FF" className="font-bold" />
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Send Message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </div>
  );
};

export default MessageForm;
