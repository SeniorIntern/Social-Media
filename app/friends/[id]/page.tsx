import ProfileComponent from '@/app/profile/ProfileComponent';
import ProfileInformation from '@/app/profile/ProfileInformation';
import { Separator } from '@/components/ui/separator';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 pb-6">
      <div className="space-y-4 bg-secondary pb-4">
        <ProfileComponent
          showImageDialog={false}
          prop={{ id: params.id, type: 'friend' }}
        />
        <Separator />
      </div>
      <div className="px-24">
        <ProfileInformation hideDialog={true} userId={params.id} />
      </div>
    </div>
  );
}
