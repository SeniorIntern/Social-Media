import { SocketPaylod } from '@/app/types';
import { cn } from '@/lib/utils';
import ModalImage from 'react-modal-image';
import { format } from 'timeago.js';

type Props = {
  chats: SocketPaylod[];
  sender: string;
};

export const RealtimeMessages = ({ chats, sender }: Props) => {
  return (
    <div className="flex flex-col-reverse space-y-8">
      {chats.map((message, index) => (
        <div
          key={index}
          className={cn(
            'my-1 flex flex-col items-start space-y-2',
            message.sender == sender && 'items-end'
          )}
        >
          {message.attachmentUrls.length !== 0 && (
            <div className="flex flex-col gap-2">
              {message.attachmentUrls.map((a, i) => (
                <div key={i} className="relative h-36 w-36">
                  <ModalImage
                    small={a}
                    large={a}
                    alt=""
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {message.text && (
            <p className="w-fit rounded-2xl bg-primary px-4 py-1">
              {message.text}
            </p>
          )}

          <p className="text-sm text-gray-400">{format(message.updatedAt)}</p>
        </div>
      ))}
    </div>
  );
};
