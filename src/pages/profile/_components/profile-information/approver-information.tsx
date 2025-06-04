import { useEffect } from 'react';
import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherUser } from '@/lib/common-queries/other';
import { getDateTime } from '@/utils';

import { IEmployeeDetails } from '../../config/types';
import { APPROVER_NULL, APPROVER_SCHEMA, IApprover } from './_config/schema';

export function ApproverInformation({
	data,
	updateData,
}: {
	data: IEmployeeDetails;
	updateData: UseMutationResult<
		IResponse<IEmployeeDetails>,
		AxiosError<IResponse<IEmployeeDetails>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}) {
	const { data: users, isLoading } = useOtherUser<IFormSelectOption[]>();

	const form = useRHF(APPROVER_SCHEMA, APPROVER_NULL);

	useEffect(() => {
		if (data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	async function onSubmit(values: IApprover) {
		// UPDATE ITEM
		await updateData.mutateAsync({
			url: `/hr/employee/${data?.uuid}`,
			updatedData: {
				...values,
				updated_at: getDateTime(),
			},
			isOnCloseNeeded: false,
		});
	}

	return (
		<div className='p-2.5 lg:p-4'>
			<CoreForm.AddEditWrapper form={form} onSubmit={onSubmit}>
				<div className='grid w-full grid-cols-1 gap-3 lg:gap-4'>
					<FormField
						name='first_leave_approver_uuid'
						control={form.control}
						render={(props) => (
							<CoreForm.ReactSelect
								options={users || []}
								isLoading={isLoading}
								label='First Leave Approver'
								{...props}
							/>
						)}
					/>
					<FormField
						name='second_leave_approver_uuid'
						control={form.control}
						render={(props) => (
							<CoreForm.ReactSelect
								options={users || []}
								isLoading={isLoading}
								label='Second Leave Approver'
								{...props}
							/>
						)}
					/>
					<FormField
						name='first_late_approver_uuid'
						control={form.control}
						render={(props) => (
							<CoreForm.ReactSelect
								options={users || []}
								isLoading={isLoading}
								label='First Late Approver'
								{...props}
							/>
						)}
					/>
					<FormField
						name='second_late_approver_uuid'
						control={form.control}
						render={(props) => (
							<CoreForm.ReactSelect
								options={users || []}
								isLoading={isLoading}
								label='Second Late Approver'
								{...props}
							/>
						)}
					/>
					<FormField
						name='first_manual_entry_approver_uuid'
						control={form.control}
						render={(props) => (
							<CoreForm.ReactSelect
								options={users || []}
								isLoading={isLoading}
								label='First Manual Entry Approver'
								{...props}
							/>
						)}
					/>
					<FormField
						name='second_manual_entry_approver_uuid'
						control={form.control}
						render={(props) => (
							<CoreForm.ReactSelect
								options={users || []}
								isLoading={isLoading}
								label='Second Manual Entry Approver'
								{...props}
							/>
						)}
					/>
				</div>
			</CoreForm.AddEditWrapper>
		</div>
	);
}
