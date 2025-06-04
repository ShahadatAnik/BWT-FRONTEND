import { AlertTriangle } from 'lucide-react';
import useProfile from '@/hooks/useProfile';

import { Button } from '@/components/ui/button';

import { getDateTime } from '@/utils';

const ExcludeFromAttendanceReport = () => {
	const { user, profileData, updateProfileData } = useProfile();

	const onSubmit = async () => {
		await updateProfileData.mutateAsync({
			url: `/hr/employee/${user?.employee_uuid}`,
			updatedData: {
				exclude_from_attendance: profileData?.exclude_from_attendance ? false : true,
				updated_at: getDateTime(),
			},
			isOnCloseNeeded: false,
		});
	};
	return (
		<Button
			variant={profileData?.exclude_from_attendance ? 'outline-accent' : 'outline-destructive'}
			onClick={onSubmit}
			className={`h-auto w-full justify-start px-4 py-2`}
		>
			<AlertTriangle className='mr-1 size-4' />
			<span className='text-sm'>
				{profileData?.exclude_from_attendance
					? 'Include in Attendance Report'
					: 'Exclude from Attendance Report'}
			</span>
		</Button>
	);
};

export default ExcludeFromAttendanceReport;

// <Button variant={'outline'} className={`h-auto w-full justify-start px-4 py-2`}>
// 		<AlertTriangle className='mr-1 size-4' />
// 		<span className='text-sm'>Exclude from Attendance Report</span>
// 	</Button>
