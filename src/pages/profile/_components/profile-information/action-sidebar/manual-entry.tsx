import { useState } from 'react';
import { useHrManualEntry } from '@/pages/hr/_config/query';
import { IManualEntry, MANUAL_ENTRY_NULL, MANUAL_ENTRY_SCHEMA } from '@/pages/hr/_config/schema';
import { status } from '@/pages/hr/field-visit/utils';
import { addDays, isBefore } from 'date-fns';
import { Edit } from 'lucide-react';
import useProfile from '@/hooks/useProfile';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherDeviceList } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { cn } from '@/lib/utils';
import { getDateTime } from '@/utils';

const ManualEntry = () => {
	const [open, setOpen] = useState(false);
	const { user, profileData } = useProfile();
	const { data, postData, url } = useHrManualEntry<IManualEntry>();

	const form = useRHF(MANUAL_ENTRY_SCHEMA, { ...MANUAL_ENTRY_NULL, employee_uuid: profileData?.uuid });

	const { data: deviceList } = useOtherDeviceList<IFormSelectOption[]>();
	const disabled = data?.approval === 'approved' || data?.approval === 'rejected' ? true : false;

	const onClose = () => {
		form.reset({
			...MANUAL_ENTRY_NULL,
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
				<Edit className='mr-1 size-4' />
				<span className='text-sm'>Manual Entry</span>
			</Button>
			<AddModal open={open} setOpen={onClose} title={'Add Manual Entry'} form={form} onSubmit={onSubmit}>
				{form.watch('type') === 'field_visit' && (
					<FormField
						control={form.control}
						name='area'
						render={(props) => <CoreForm.Input disabled={disabled} {...props} />}
					/>
				)}
				<FormField
					control={form.control}
					name='approval'
					render={(props) => (
						<CoreForm.ReactSelect label='Status' isDisabled={disabled} options={status || []} {...props} />
					)}
				/>
				<FormField
					control={form.control}
					name='type'
					render={(props) => (
						<CoreForm.ReactSelect
							options={[
								{
									label: 'Manual Entry',
									value: 'manual_entry',
								},
								{
									label: 'Field Visit',
									value: 'field_visit',
								},
								{
									label: 'Missing Punch',
									value: 'missing_punch',
								},
							]}
							isDisabled={disabled}
							{...props}
						/>
					)}
				/>
				{form.watch('type') === 'missing_punch' && (
					<FormField
						control={form.control}
						name='device_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Select Device'
								isDisabled={disabled}
								options={deviceList || []}
								{...props}
							/>
						)}
					/>
				)}

				<div
					className={cn('grid grid-cols-2 gap-4', { 'grid-cols-1': form.watch('type') === 'missing_punch' })}
				>
					{form.watch('type') !== 'missing_punch' && (
						<FormField
							control={form.control}
							name='entry_time'
							render={(props) => <CoreForm.DateTimePicker disabled={disabled} {...props} />}
						/>
					)}
					<FormField
						control={form.control}
						name='exit_time'
						render={(props) => (
							<CoreForm.DateTimePicker
								calendarProps={{
									disabled: (date) => {
										const entryDate = new Date(form.watch('entry_time') as string);
										return isBefore(date, addDays(entryDate, -1));
									},
								}}
								disabled={disabled}
								{...props}
							/>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='reason'
					disabled={disabled}
					render={(props) => <CoreForm.Textarea {...props} />}
				/>
			</AddModal>
		</>
	);
};

export default ManualEntry;
