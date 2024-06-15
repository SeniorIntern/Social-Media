import PeopleSvg from '@/app/people.svg';
import Image from 'next/image';

export default function Page() {
  return (
    <section className="flex grow items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-28 w-28">
          <Image
            src={PeopleSvg}
            alt="profile image"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <p className="text-xl text-center font-bold text-gray-400">
          Select people&apos;s names to preview their profile.
        </p>
      </div>
    </section>
  );
}
