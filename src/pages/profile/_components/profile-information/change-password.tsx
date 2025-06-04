'use client';

import { useHrPassword } from '@/pages/hr/_config/query';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { getDateTime } from '@/utils';

import { useHrUsersByUUID } from '../../config/query';
import { CHANGE_PASSWORD_NULL, CHANGE_PASSWORD_SCHEMA, IChangePassword } from './_config/schema';

export function ChangePassword() {
	const { user } = useAuth();
	const form = useRHF(CHANGE_PASSWORD_SCHEMA, CHANGE_PASSWORD_NULL);

	const { updateData } = useHrUsersByUUID(user?.uuid as string);

	async function onSubmit(values: IChangePassword) {
		// UPDATE ITEM
		await updateData.mutateAsync({
			url: `/hr/user/password/${user?.uuid}`,
			updatedData: {
				pass: values.pass,
				current_pass: values.current_pass,
				updated_at: getDateTime(),
			},
			isOnCloseNeeded: false,
		});

		form.reset(CHANGE_PASSWORD_NULL);
	}

	return (
		<div className='p-2.5 lg:p-4'>
			<CoreForm.AddEditWrapper form={form} onSubmit={onSubmit}>
				<FormField
					name='current_pass'
					control={form.control}
					render={(props) => <CoreForm.Input type='password' label='Current Password' {...props} />}
				/>
				<FormField
					control={form.control}
					name='pass'
					render={(props) => <CoreForm.Input type='password' label='New Password' {...props} />}
				/>
				<FormField
					name='confirm_pass'
					control={form.control}
					render={(props) => <CoreForm.Input type='password' label='Confirm Password' {...props} />}
				/>
			</CoreForm.AddEditWrapper>
		</div>
	);
}
