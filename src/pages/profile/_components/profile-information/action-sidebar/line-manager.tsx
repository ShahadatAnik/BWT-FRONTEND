import { UserCheck, UserX } from 'lucide-react';
import useProfile from '@/hooks/useProfile';

import { Button } from '@/components/ui/button';

import { getDateTime } from '@/utils';

const LineManager = () => {
	const { user, profileData, updateProfileData } = useProfile();

	const onSubmit = async () => {
		await updateProfileData.mutateAsync({
			url: `/hr/employee/${user?.employee_uuid}`,
			updatedData: {
				is_line_manager: profileData?.is_line_manager ? false : true,
				updated_at: getDateTime(),
			},
			isOnCloseNeeded: false,
		});
	};
	return (
		<Button
			variant={profileData?.is_line_manager ? 'outline-destructive' : 'outline-accent'}
			onClick={onSubmit}
			className={`h-auto w-full justify-start px-4 py-2`}
		>
			{profileData?.is_line_manager ? <UserX className='mr-1 size-4' /> : <UserCheck className='mr-1 size-4' />}
			<span className='text-sm'>
				{profileData?.is_line_manager ? 'Remove Line Manager' : 'Set as Line Manager'}
			</span>
		</Button>
	);
};

export default LineManager;
