import { Skeleton } from '@/components/ui/skeleton';

export const ProfileInformationSkeleton = () => {
  return (
    <>
      <section className="flex gap-4 px-6">
        <div className="grow space-y-4">
          <div className="h-fit space-y-4 rounded-md bg-secondary p-4">
            <p className="text-xl font-bold">Intro</p>
            <Skeleton className="h-4 w-40" />
            <div className="flex flex-col space-y-4">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>

        <div className="w-[58%] space-y-4">
          <div className="h-fit space-y-4 rounded-md bg-secondary p-4">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">About</p>
            </div>
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
      </section>
    </>
  );
};
