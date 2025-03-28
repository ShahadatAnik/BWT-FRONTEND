import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherDepartment, useOtherDesignation, useOtherUserByQuery } from '@/lib/common-queries/other';

import { IInfo } from '../../_config/schema';

const Header = () => {
	const form = useFormContext<IInfo>();

	const { data: userOption } = useOtherUserByQuery<IFormSelectOption[]>('?type=customer');
	const isProductReceived = form.watch('is_product_received');
	const isNewCustomer = form.watch('is_new_customer');
	const isBusinessTypeCompany = form.watch('business_type') === 'company' && isNewCustomer;
	const businessTypeOptions = [
		{ label: 'Individual', value: 'individual' },
		{ label: 'Company', value: 'company' },
	];
	const { data: departmentOption } = useOtherDepartment<IFormSelectOption[]>();
	const { data: designationOption } = useOtherDesignation<IFormSelectOption[]>();

	useEffect(() => {
		if (isNewCustomer) {
			if (!isBusinessTypeCompany) {
				form.resetField('user_uuid');
				form.resetField('department_uuid');
				form.resetField('designation_uuid');
			} else {
				form.resetField('user_uuid');
			}
		} else {
			form.resetField('name');
			form.resetField('phone');
			form.resetField('business_type');
			form.resetField('designation_uuid');
			form.resetField('department_uuid');
		}
	}, [isNewCustomer, form, isBusinessTypeCompany]);

	return (
		<CoreForm.Section
			title={
				<>
					<div className='flex justify-end gap-2'>
						<div>Information</div>
						<FormField
							control={form.control}
							name='is_new_customer'
							render={(props) => (
								<CoreForm.Checkbox label='New Customer' className='float-end bg-white' {...props} />
							)}
						/>
						<FormField
							control={form.control}
							name='is_product_received'
							render={(props) => (
								<CoreForm.Checkbox label='Product Received' className='float-end bg-white' {...props} />
							)}
						/>
						{isProductReceived && (
							<FormField
								control={form.control}
								name='received_date'
								render={(props) => <CoreForm.DatePicker disableLabel={true} {...props} />}
							/>
						)}
					</div>
				</>
			}
		>
			{!isNewCustomer ? (
				<FormField
					control={form.control}
					name='user_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Customer'
							options={userOption || []}
							placeholder='Select Customer'
							{...props}
						/>
					)}
				/>
			) : (
				<div>
					<div>
						<FormField
							control={form.control}
							name='name'
							render={(props) => <CoreForm.Input label='Customer Name' {...props} />}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							name='phone'
							render={(props) => <CoreForm.Input label='Phone Number' {...props} />}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							name='business_type'
							render={(props) => (
								<CoreForm.ReactSelect
									label='Business Type'
									options={businessTypeOptions || []}
									placeholder='Select Business Type'
									{...props}
								/>
							)}
						/>
					</div>
				</div>
			)}

			{isBusinessTypeCompany && (
				<div>
					<div>
						<FormField
							control={form.control}
							name='designation_uuid'
							render={(props) => (
								<CoreForm.ReactSelect
									label='Designation'
									options={designationOption || []}
									placeholder='Select Problems'
									{...props}
								/>
							)}
						/>
					</div>
					<div className='flex-1'>
						<FormField
							control={form.control}
							name='department_uuid'
							render={(props) => (
								<CoreForm.ReactSelect
									label='Department'
									options={departmentOption || []}
									placeholder='Select Accessories'
									{...props}
								/>
							)}
						/>
					</div>
				</div>
			)}
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</CoreForm.Section>
	);
};

export default Header;
