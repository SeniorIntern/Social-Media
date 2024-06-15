import { getSession } from '@/action';
import { Separator } from '@/components/ui/separator';

import ProfileComponent from './ProfileComponent';
import ProfileInformation from './ProfileInformation';

export default async function Page() {
  const profileObject = await getSession();

  if (profileObject)
    return (
      <div className="grow space-y-6 pb-6">
        <div className="space-y-4 bg-secondary pb-4">
          <ProfileComponent
            showImageDialog={true}
            prop={{ id: profileObject?.payload._id, type: 'user' }}
          />
          <Separator />
        </div>
        <div className="px-24">
          <ProfileInformation userId={profileObject?.payload._id} />
        </div>
      </div>
    );
}
