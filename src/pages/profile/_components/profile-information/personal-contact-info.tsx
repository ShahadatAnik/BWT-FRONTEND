import { useEffect } from 'react';
import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { getDateTime } from '@/utils';

import { IEmployeeDetails } from '../../config/types';
import { IPersonalContactInfo, PERSONAL_CONTACT_INFO_NULL, PERSONAL_CONTACT_INFO_SCHEMA } from './_config/schema';

export function PersonalContactInfo({
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
	const form = useRHF(PERSONAL_CONTACT_INFO_SCHEMA, PERSONAL_CONTACT_INFO_NULL);

	useEffect(() => {
		if (data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	async function onSubmit(values: IPersonalContactInfo) {
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
				<div className='grid w-full grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4'>
					<FormField
						name='father_name'
						control={form.control}
						render={(props) => <CoreForm.Input label={`Father's Name`} {...props} />}
					/>
					<FormField
						control={form.control}
						name='mother_name'
						render={(props) => <CoreForm.Input label={`Mother's Name`} {...props} />}
					/>
					<FormField
						name='blood_group'
						control={form.control}
						render={(props) => <CoreForm.Input {...props} />}
					/>

					<FormField
						control={form.control}
						name='dob'
						render={(props) => <CoreForm.DatePicker label='Date of Birth' {...props} />}
					/>

					<FormField
						control={form.control}
						name='national_id'
						render={(props) => <CoreForm.Input label='National ID' {...props} />}
					/>

					<FormField
						control={form.control}
						name='office_phone'
						render={(props) => <CoreForm.Input label='Office Phone' {...props} />}
					/>

					<FormField
						control={form.control}
						name='home_phone'
						render={(props) => <CoreForm.Input label='Home Phone' {...props} />}
					/>
					<FormField
						control={form.control}
						name='personal_phone'
						render={(props) => <CoreForm.Input label='Personal Phone' {...props} />}
					/>
				</div>
			</CoreForm.AddEditWrapper>
		</div>
	);
}
