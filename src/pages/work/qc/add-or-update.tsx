import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

// import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import '@/lib/common-queries/other';

import { IFormSelectOption } from '@/components/core/form/types';

import { useOtherProblem } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { IDiagnosisTableData, IOrderTableData } from '../_config/columns/columns.type';
import { useWorkDiagnosis, useWorkOrderByUUID } from '../_config/query';
import { ORDER_NULL, ORDER_SCHEMA } from '../_config/schema';
import { IOrderAddOrUpdateProps } from '../_config/types';
import { orderFields } from '../order/utill';
import Information from './information';

const AddOrUpdate: React.FC<IOrderAddOrUpdateProps> = ({
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	imagePostData,
	imageUpdateData,
}) => {
	const isUpdate = !!updatedData;
	const { user } = useAuth();
	const { data } = useWorkOrderByUUID<IOrderTableData>(updatedData?.uuid as string);
	const { invalidateQuery: invalidateDiagnosis } = useWorkDiagnosis<IDiagnosisTableData[]>();
	const { data: problemOption } = useOtherProblem<IFormSelectOption[]>('employee');

	const form = useRHF(ORDER_SCHEMA, ORDER_NULL);

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ORDER_NULL);
		invalidateDiagnosis();
		setOpen(false);
	};

	// Submit handler
	async function onSubmit(values: IOrderTableData) {
		const payload = {
			...values,
		};
		const formData = Formdata({
			...payload,
			updated_at: getDateTime(),
		});
		orderFields.forEach((field) => {
			if (
				payload[field as keyof typeof values] == null ||
				payload[field as keyof typeof values] === 0 ||
				payload[field as keyof typeof values] === '' ||
				payload[field as keyof typeof values] === undefined ||
				(Array.isArray(payload[field as keyof typeof values]) &&
					(payload[field as keyof typeof values] as unknown[]).length === 0)
			) {
				formData.delete(field);
			}
		});
		if (isUpdate) {
			await imageUpdateData.mutateAsync({
				url: `/work/order/${updatedData?.uuid}`,
				updatedData: formData,
				onClose,
			});
		} else {
			orderFields.forEach((field) => {
				if (
					payload[field as keyof typeof values] == null ||
					payload[field as keyof typeof values] === 0 ||
					payload[field as keyof typeof values] === '' ||
					payload[field as keyof typeof values] === undefined ||
					(Array.isArray(payload[field as keyof typeof values]) &&
						(payload[field as keyof typeof values] as unknown[]).length === 0)
				) {
					formData.delete(field);
				}
			});
			const formData = Formdata({
				...payload,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			});
			await imagePostData.mutateAsync({
				url: '/work/order',
				newData: formData,
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? `Update ${updatedData?.order_id} Order` : 'Add New Order'}
			form={form}
			isSmall={true}
			onSubmit={onSubmit}
		>
			<Information data={(data || []) as IOrderTableData} />
			<div className='flex justify-end gap-2'>
				<FormField
					control={form.control}
					name='is_ready_for_delivery'
					render={(props) => <CoreForm.Checkbox label='Ready for Delivery' {...props} />}
				/>
				<FormField
					control={form.control}
					name='is_transferred_for_qc'
					render={(props) => <CoreForm.Checkbox label='Transfer QC' {...props} />}
				/>
			</div>
			<FormField
				control={form.control}
				name='qc_problems_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						isMulti
						label='Problems'
						options={problemOption!}
						placeholder='Select Problems'
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='qc_problem_statement'
				render={(props) => <CoreForm.Textarea label='Problem Statement' {...props} />}
			/>

			<FormField
				control={form.control}
				name='remarks'
				render={(props) => <CoreForm.Textarea label='Remarks' {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
