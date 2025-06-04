import { useEffect } from 'react';
import { addDays, isBefore } from 'date-fns';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherDeviceList, useOtherEmployees } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { cn } from '@/lib/utils';
import { getDateTime } from '@/utils';

import { IManualEntryTableData } from '../_config/columns/columns.type';
import { useHrManualEntryByUUID, useHrUsers } from '../_config/query';
import { IManualEntry, MANUAL_ENTRY_NULL, MANUAL_ENTRY_SCHEMA } from '../_config/schema';
import { IAddOrUpdateProps } from '../_config/types';
import { status } from '../field-visit/utils';

const AddOrUpdate: React.FC<IAddOrUpdateProps<IManualEntryTableData>> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { invalidateQuery: invalidateUserQuery } = useHrUsers();
	const { data } = useHrManualEntryByUUID<IManualEntry>(updatedData?.uuid as string);
	const { data: employees } = useOtherEmployees<IFormSelectOption[]>();

	const form = useRHF(MANUAL_ENTRY_SCHEMA, MANUAL_ENTRY_NULL);

	const { data: deviceList } = useOtherDeviceList<IFormSelectOption[]>();
	const disabled = data?.approval === 'approved' || data?.approval === 'rejected' ? true : false;

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(MANUAL_ENTRY_NULL);
		invalidateUserQuery();
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IManualEntry) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
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
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Manual Entry' : 'Add Manual Entry'}
			form={form}
			onSubmit={onSubmit}
		>
			{form.watch('type') === 'field_visit' && (
				<FormField
					control={form.control}
					name='area'
					render={(props) => <CoreForm.Input disabled={disabled} {...props} />}
				/>
			)}
			<FormField
				control={form.control}
				name='employee_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Employee' options={employees || []} isDisabled={disabled} {...props} />
				)}
			/>
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

			<div className={cn('grid grid-cols-2 gap-4', { 'grid-cols-1': form.watch('type') === 'missing_punch' })}>
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
	);
};

export default AddOrUpdate;
