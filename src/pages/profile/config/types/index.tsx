import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
	IDepartmentTableData,
	IDesignationTableData,
	IPageAssign,
	IResetPassword,
	IUserTableData,
} from '../columns/columns.type';

//* user

export interface IUserAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IUserTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
	postData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	updateData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

export interface IPageAssignProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IPageAssign | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IPageAssign | null>>;
	updateData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

export interface IResetPasswordProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IResetPassword | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IResetPassword | null>>;
	updateData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}
//* department
export interface IDepartmentAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IDepartmentTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
	postData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	updateData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

//* designation
export interface IDesignationAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IDesignationTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
	postData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	updateData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

export type IEmployeeDetails = {
	uuid: string;
	id: number;
	gender: 'male' | 'female' | 'other';
	user_uuid: string;
	employee_name: string;
	email: string;
	start_date: string;
	workplace_uuid: string;
	workplace_name: string;
	rfid: string;
	sub_department_uuid: string;
	sub_department_name: string;
	primary_display_text: string;
	secondary_display_text: string;
	configuration_uuid: string;
	employment_type_uuid: string;
	employment_type_name: string;
	end_date: string;
	shift_group_uuid: string;
	shift_group_name: string;
	line_manager_uuid: string;
	hr_manager_uuid: string;
	is_admin: boolean;
	is_hr: boolean;
	is_line_manager: boolean;
	is_resign: boolean;
	allow_over_time: boolean;
	exclude_from_attendance: boolean;
	status: boolean;
	created_by: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
	remarks: string | null;
	designation_uuid: string;
	designation_name: string;
	department_uuid: string;
	department_name: string;
	employee_id: string;
	leave_policy_uuid: string;
	leave_policy_name: string;
	report_position: string;
	first_leave_approver_uuid: string | null;
	first_leave_approver_name: string | null;
	second_leave_approver_uuid: string | null;
	second_leave_approver_name: string | null;
	first_late_approver_uuid: string | null;
	first_late_approver_name: string | null;
	second_late_approver_uuid: string | null;
	second_late_approver_name: string | null;
	first_manual_entry_approver_uuid: string | null;
	first_manual_entry_approver_name: string | null;
	second_manual_entry_approver_uuid: string | null;
	second_manual_entry_approver_name: string | null;
	father_name: string | null;
	mother_name: string | null;
	blood_group: string | null;
	dob: string | null;
	national_id: string | null;
	office_phone: string | null;
	home_phone: string | null;
	personal_phone: string | null;
	employee_address: any[];
	employee_document: any[];
	employee_education: any[];
	employee_history: any[];
};

export type IPunchLateLog = {
	uuid: string;
	employee_uuid: string;
	device_list_uuid: string;
	punch_type: string;
	punch_time: string;
};
