import { UserCheck, UserX } from 'lucide-react';
import useProfile from '@/hooks/useProfile';

import { Button } from '@/components/ui/button';

import { getDateTime } from '@/utils';

const EmployeeStatus = () => {
	const { user, profileData, updateProfileData } = useProfile();

	const onSubmit = async () => {
		await updateProfileData.mutateAsync({
			url: `/hr/employee/${user?.employee_uuid}`,
			updatedData: {
				status: profileData?.status ? false : true,
				updated_at: getDateTime(),
			},
			isOnCloseNeeded: false,
		});
	};
	return (
		<Button
			variant={profileData?.status ? 'outline-destructive' : 'outline-accent'}
			onClick={onSubmit}
			className={`h-auto w-full justify-start px-4 py-2`}
		>
			{profileData?.status ? <UserX className='mr-1 size-4' /> : <UserCheck className='mr-1 size-4' />}
			<span className='text-sm'>
				{profileData?.status ? 'Make Employee Status Inactive' : 'Make Employee Status Active'}
			</span>
		</Button>
	);
};

export default EmployeeStatus;
