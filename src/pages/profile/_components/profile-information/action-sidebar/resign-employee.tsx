import { UserCheck, UserMinus } from 'lucide-react';
import useProfile from '@/hooks/useProfile';

import { Button } from '@/components/ui/button';

import { getDateTime } from '@/utils';

const ResignEmployee = () => {
	const { user, profileData, updateProfileData } = useProfile();

	const onSubmit = async () => {
		await updateProfileData.mutateAsync({
			url: `/hr/employee/${user?.employee_uuid}`,
			updatedData: {
				is_resign: profileData?.is_resign ? false : true,
				updated_at: getDateTime(),
			},
			isOnCloseNeeded: false,
		});
	};
	return (
		<Button
			variant={profileData?.is_resign ? 'outline-accent' : 'outline-destructive'}
			onClick={onSubmit}
			className={`h-auto w-full justify-start px-4 py-2`}
		>
			{profileData?.is_resign ? <UserCheck className='mr-1 size-4' /> : <UserMinus className='mr-1 size-4' />}
			<span className='text-sm'>{profileData?.is_resign ? 'Rehire Employee' : 'Resign Employee'}</span>
		</Button>
	);
};

export default ResignEmployee;
