import { permission } from 'process';
import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	FORTUNE_ZIP_EMAIL_PATTERN,
	MANUAL_ENTRY,
	NUMBER_REQUIRED,
	PASSWORD,
	PHONE_NUMBER_REQUIRED,
	STRING,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Department Schema
export const DEPARTMENT_SCHEMA = z.object({
	department: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DEPARTMENT_NULL: Partial<IDepartment> = {
	department: '',
	remarks: null,
};

export type IDepartment = z.infer<typeof DEPARTMENT_SCHEMA>;

//* Designation Schema
export const DESIGNATION_SCHEMA = z.object({
	designation: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DESIGNATION_NULL: Partial<IDesignation> = {
	designation: '',
	remarks: null,
};

export type IDesignation = z.infer<typeof DESIGNATION_SCHEMA>;

//* User Schema
export const USER_SCHEMA = (isUpdate: boolean) => {
	const baseSchema = z.object({
		name: STRING_REQUIRED,
		email: FORTUNE_ZIP_EMAIL_PATTERN,
		user_type: z.enum(['employee', 'customer', 'vendor']),
		business_type: z.enum(['user', 'tv_company', 'corporate']).nullable(),
		price: z.number().min(1).max(5).optional(),
		rating: z.number().min(1).max(5).optional(),
		department_uuid: STRING_NULLABLE,
		designation_uuid: STRING_NULLABLE,
		ext: STRING_NULLABLE,
		phone: PHONE_NUMBER_REQUIRED,
		remarks: STRING_NULLABLE,
	});

	if (isUpdate) {
		return baseSchema
			.extend({
				pass: STRING_OPTIONAL,
				repeatPass: STRING_OPTIONAL,
			})
			.superRefine((data, ctx) => {
				if (data.user_type === 'employee') {
					if (!data.department_uuid)
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Required',
							path: ['department_uuid'],
						});
					if (!data.designation_uuid)
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Required',
							path: ['designation_uuid'],
						});
				}
				if (data?.user_type === 'customer') {
					if (!data?.business_type) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Required',
							path: ['business_type'],
						});
					}
				}
			});
	}

	return baseSchema
		.extend({
			pass: PASSWORD,
			repeatPass: PASSWORD,
		})
		.superRefine((data, ctx) => {
			if (data.pass !== data.repeatPass) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Passwords do not match',
					path: ['repeatPass'],
				});
			}
			if (data.user_type === 'employee') {
				if (!data.department_uuid)
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Required',
						path: ['department_uuid'],
					});
				if (!data.designation_uuid)
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Required',
						path: ['designation_uuid'],
					});
			}
		});
};

export const USER_NULL: Partial<IUser> = {
	name: '',
	email: '',
	department_uuid: null,
	user_type: 'employee',
	business_type: 'user',
	rating: undefined,
	price: undefined,
	designation_uuid: null,
	ext: null,
	phone: '',
	remarks: null,
};

export type IUser = z.infer<ReturnType<typeof USER_SCHEMA>>;
//* User Schema
export const EMPLOYEE_SCHEMA = (isUpdate: boolean) => {
	const baseSchema = z.object({
		name: STRING_REQUIRED,
		email: FORTUNE_ZIP_EMAIL_PATTERN,
		department_uuid: STRING_NULLABLE,
		designation_uuid: STRING_NULLABLE,
		ext: STRING_NULLABLE,
		phone: STRING_REQUIRED.min(11).max(15),
		remarks: STRING_NULLABLE,
	});

	if (isUpdate) {
		return baseSchema.extend({
			pass: STRING_OPTIONAL,
			repeatPass: STRING_OPTIONAL,
		});
	}

	return baseSchema
		.extend({
			pass: PASSWORD,
			repeatPass: PASSWORD,
		})
		.superRefine((data, ctx) => {
			if (data.pass !== data.repeatPass) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Passwords do not match',
					path: ['repeatPass'],
				});
			}
		});
};

export const EMPLOYEE_NULL: Partial<IEmployee> = {
	name: '',
	email: '',
	department_uuid: null,
	designation_uuid: null,
	ext: null,
	phone: '',
	remarks: null,
};

export type IEmployee = z.infer<ReturnType<typeof EMPLOYEE_SCHEMA>>;

//* Reset Password Schema
export const RESET_PASSWORD_SCHEMA = z
	.object({
		pass: PASSWORD,
		repeatPass: PASSWORD,
	})
	.refine((data) => data.pass === data.repeatPass, {
		message: 'Passwords do not match',
		path: ['repeatPass'],
	});

export const RESET_PASSWORD_NULL: Partial<IResetPasswordSchema> = {
	pass: '',
	repeatPass: '',
};

export type IResetPasswordSchema = z.infer<typeof RESET_PASSWORD_SCHEMA>;

//* Manual Entry Schema
export const MANUAL_ENTRY_SCHEMA = z
	.object({
		employee_uuid: STRING_REQUIRED,
		device_uuid: STRING_OPTIONAL,
		entry_time: STRING_NULLABLE,
		exit_time: STRING_NULLABLE,
		approval: z.enum(['approved', 'pending', 'rejected']),
		reason: STRING_REQUIRED,
		area: STRING_NULLABLE,
		type: MANUAL_ENTRY,
	})
	.superRefine((data, ctx) => {
		if (data.type === 'field_visit' || data.type === 'manual_entry') {
			if (!data.entry_time) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['entry_time'],
				});
			}
			if (!data.exit_time) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['exit_time'],
				});
			}
		}

		if (data.type === 'missing_punch') {
			if (!data.device_uuid) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['device_uuid'],
				});
			}

			if (!data.exit_time) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['exit_time'],
				});
			}
		}

		if (data.type === 'late_application') {
			if (!data.entry_time) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['entry_time'],
				});
			}
		}
	});

export const MANUAL_ENTRY_NULL: Partial<IManualEntry> = {
	employee_uuid: '',
	device_uuid: undefined,
	entry_time: null,
	exit_time: null,
	approval: 'pending',
	reason: '',
	area: null,
};

export type IManualEntry = z.infer<typeof MANUAL_ENTRY_SCHEMA>;

//* Device List Schema
export const DEVICE_LIST_SCHEMA = z.object({
	name: STRING_REQUIRED,
	identifier: NUMBER_REQUIRED,
	location: STRING_REQUIRED,
	connection_status: BOOLEAN_REQUIRED,
	phone_number: STRING_NULLABLE,
	description: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const DEVICE_LIST_NULL: Partial<IDeviceList> = {
	name: '',
	location: '',
	connection_status: false,
	phone_number: null,
	description: null,
};

export type IDeviceList = z.infer<typeof DEVICE_LIST_SCHEMA>;

// * Device Allocate Schema
export const DEVICE_ALLOCATE_SCHEMA = z
	.object({
		entry: z.array(
			z.object({
				is_checked: z.boolean(),
				uuid: STRING_OPTIONAL,
				employee_uuid: STRING_OPTIONAL,
				employee_name: STRING_OPTIONAL,
				permission_type: STRING_REQUIRED.default('permanent'),
				temporary_from_date: z.string().nullable(),
				temporary_to_date: z.string().nullable(),
			})
		),
	})
	.superRefine((data, ctx) => {
		data.entry.forEach((item, index) => {
			if (item.permission_type === 'temporary') {
				if (!item.temporary_from_date) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Required',
						path: ['entry', index, 'temporary_from_date'],
					});
				}
				if (!item.temporary_to_date) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Required',
						path: ['entry', index, 'temporary_to_date'],
					});
				}
			}
		});
	});

export const DEVICE_ALLOCATE_NULL: Partial<IDeviceAllocate> = {
	entry: [
		{
			is_checked: false,
			uuid: '',
			employee_uuid: '',
			employee_name: '',
			permission_type: 'permanent',
			temporary_from_date: null,
			temporary_to_date: null,
		},
	],
};

export type IDeviceAllocate = z.infer<typeof DEVICE_ALLOCATE_SCHEMA>;
