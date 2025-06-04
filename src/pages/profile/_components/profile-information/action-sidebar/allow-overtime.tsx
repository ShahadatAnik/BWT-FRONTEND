import { Clock } from 'lucide-react';
import useProfile from '@/hooks/useProfile';

import { Button } from '@/components/ui/button';

import { getDateTime } from '@/utils';

const AllowOvertime = () => {
	const { user, profileData, updateProfileData } = useProfile();

	const onSubmit = async () => {
		await updateProfileData.mutateAsync({
			url: `/hr/employee/${user?.employee_uuid}`,
			updatedData: {
				allow_over_time: profileData?.allow_over_time ? false : true,
				updated_at: getDateTime(),
			},
			isOnCloseNeeded: false,
		});
	};
	return (
		<Button
			variant={profileData?.allow_over_time ? 'outline-destructive' : 'outline-accent'}
			onClick={onSubmit}
			className={`h-auto w-full justify-start px-4 py-2`}
		>
			<Clock className='mr-1 size-4' />
			<span className='text-sm'>{profileData?.allow_over_time ? 'Disallowed Overtime' : 'Allow Overtime'}</span>
		</Button>
	);
};

export default AllowOvertime;
