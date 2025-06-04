import { useState } from 'react';
import { useHrManualEntry, useHrPunchLateByEmployeeUUID } from '@/pages/hr/_config/query';
import { IManualEntry, MANUAL_ENTRY_NULL, MANUAL_ENTRY_SCHEMA } from '@/pages/hr/_config/schema';
import { IPunchLateLog } from '@/pages/profile/config/types';
import { Clock } from 'lucide-react';
import useProfile from '@/hooks/useProfile';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import { formatDate } from '@/utils/formatDate';

const ApplyForLateApproval = () => {
	const [open, setOpen] = useState(false);
	const { user, profileData } = useProfile();
	const { postData, url } = useHrManualEntry<IManualEntry>();

	const { data: punchData } = useHrPunchLateByEmployeeUUID<IPunchLateLog[]>(profileData?.uuid as string);

	const options: IFormSelectOption[] =
		punchData?.map((item) => ({ label: formatDate(new Date(item.punch_time)), value: item.punch_time })) ?? [];

	const form = useRHF(MANUAL_ENTRY_SCHEMA, {
		...MANUAL_ENTRY_NULL,
		type: 'late_application',
		employee_uuid: profileData?.uuid,
	});

	const onClose = () => {
		form.reset({
			...MANUAL_ENTRY_NULL,
			type: 'late_application',
			employee_uuid: profileData?.uuid,
		});
		setOpen((prev) => !prev);
	};

	// Submit handler
	async function onSubmit(values: IManualEntry) {
		postData.mutateAsync({
			url,
			newData: {
				...values,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			},
			onClose,
		});
	}

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant={'outline'}
				className={`h-auto w-full justify-start px-4 py-2`}
			>
				<Clock className='mr-1 size-4' />
				<span className='text-sm'>Apply for Late Approval</span>
			</Button>
			<AddModal open={open} setOpen={onClose} title={'Apply for Late Approval'} form={form} onSubmit={onSubmit}>
				<FormField
					control={form.control}
					name='entry_time'
					render={(props) => <CoreForm.ReactSelect options={options} {...props} />}
				/>
				<FormField control={form.control} name='reason' render={(props) => <CoreForm.Textarea {...props} />} />
			</AddModal>
		</>
	);
};

export default ApplyForLateApproval;
