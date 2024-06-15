import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  imgSrc: string;
  imgClassName?: string;
  imgAlt: string;
};

export default function Img({ imgSrc, imgAlt, imgClassName }: Props) {
  return (
    <div className={cn('relative h-14 w-14', imgClassName)}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        fill
        style={{ objectFit: 'cover' }}
        className={cn('rounded-full')}
      />
    </div>
  );
}
