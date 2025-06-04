import { IPaginationQuery } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addQueryParams from '@/utils/addQueryParams';

import { hrQK } from './queryKeys';

// * User

export const useHrUsers = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: hrQK.user(query || ''),
		url: `/hr/user?${query}`,
	});

export const useHrUsersByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.userByUUID(uuid),
		url: `/hr/user/${uuid}`,
		enabled: !!uuid,
	});

export const useHrCanAccess = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.userCanAccess(uuid),
		url: `/hr/user/can-access/${uuid}`,
		enabled: !!uuid,
	});

export const useHrPassword = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.userPassword(uuid),
		url: `/hr/user/password/${uuid}`,
		enabled: !!uuid,
	});

// * Employee
export const useHrEmployees = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: hrQK.employees(query),
		url: query ? `/hr/employee?${query}` : `/hr/employee`,
	});

// * Employee History
export const useHrEmployeeHistory = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.employeeHistory(),
		url: '/hr/employee-history',
	});

export const useHrEmployeeHistoryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeeHistoryByUUID(uuid),
		url: `/hr/employee-history/${uuid}`,
		enabled: !!uuid,
	});

export const useHrEmployeeHistoryByEmployeeUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeeHistoryByEmployeeUUID(uuid),
		url: `/hr/employee-history/by/${uuid}`,
		enabled: !!uuid,
	});

// * Employee Education
export const useHrEmployeeEducation = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.employeeEducation(),
		url: '/hr/employee-education',
	});

export const useHrEmployeeEducationByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeeEducationByUUID(uuid),
		url: `/hr/employee-education/${uuid}`,
		enabled: !!uuid,
	});

export const useHrEmployeeEducationByEmployeeUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeeEducationByEmployeeUUID(uuid),
		url: `/hr/employee-education/by/${uuid}`,
		enabled: !!uuid,
	});

// * Employee Address
export const useHrEmployeeAddress = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.employeeAddress(),
		url: '/hr/employee-address',
	});

export const useHrEmployeeAddressByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeeAddressByUUID(uuid),
		url: `/hr/employee-address/${uuid}`,
		enabled: !!uuid,
	});

export const useHrEmployeeAddressByEmployeeUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeeAddressByEmployeeUUID(uuid),
		url: `/hr/employee-address/by/${uuid}`,
		enabled: !!uuid,
	});

// * Employee Documents
export const useHrEmployeeDocuments = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.employeeDocuments(),
		url: '/hr/employee-document',
	});

export const useHrEmployeeDocumentsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeeDocumentsByUUID(uuid),
		url: `/hr/employee-document/${uuid}`,
		enabled: !!uuid,
	});

export const useHrEmployeeDocumentsByEmployeeUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeeDocumentsByEmployeeUUID(uuid),
		url: `/hr/employee-document/by/${uuid}`,
		enabled: !!uuid,
	});

// * Device permission
export const useDevicePermission = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: hrQK.devicePermission(query),
		url: query ? `/hr/device-permission?${query}` : `/hr/device-permission`,
	});

// * Device Allocare
export const useHrDeviceAllocation = <T>(uuid?: string) =>
	useTQuery<T>({
		queryKey: hrQK.deviceAllocation(uuid),
		url: `/hr/device-permission-for-employee/by/${uuid}`,
	});

// ? LOGS
// * Punch log
export const useHrPunchLogs = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: hrQK.punchLog(query),
		url: query ? `/hr/punch-log?${query}` : '/hr/punch-log',
	});

// * Apply leave log
export const useHrApplyLeaveLog = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: hrQK.applyLeaveLog(query),
		url: query ? `/hr/apply-leave?${query}` : '/hr/apply-leave',
	});

// * Manual entry log
export const useHrManualEntryLog = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: hrQK.manualEntryLog(query),
		url: query ? `/hr/manual-entry?${query}` : '/hr/manual-entry',
	});

export const useHrEmployeesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeesByUUID(uuid),
		url: `/hr/employee/${uuid}`,
		enabled: !!uuid,
	});

// * Department
export const useHrDepartments = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.department(),
		url: '/hr/department',
	});

export const useHrDesignationByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.designationByUUID(uuid),
		url: `/hr/designation/${uuid}`,
		enabled: !!uuid,
	});

// * Designation
export const useHrDesignations = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.designation(),
		url: '/hr/designation',
	});

export const useHrDepartmentsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.departmentByUUID(uuid),
		url: `/hr/department/${uuid}`,
		enabled: !!uuid,
	});

export const useHrUsersWithAccess = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.userWithAccess(),
		url: '/other/hr/users-can-access/value/label',
	});

export const useHrManualEntry = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: hrQK.manualEntry(query),
		url: query ? `/hr/manual-entry?${query}` : '/hr/manual-entry',
		enabled: query ? !!query : true,
	});

export const useHrManualEntry2 = <T>(pagination: IPaginationQuery) =>
	useTQuery<T>({
		queryKey: hrQK.manualEntry2(pagination),
		url: addQueryParams('/hr/v2/manual-entry/by/pagination', pagination),
	});

export const useHrManualEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.manualEntryByUUID(uuid),
		url: `/hr/manual-entry/${uuid}`,
		enabled: !!uuid,
	});

export const useHrManualEntryByEmployeeUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.manualEntryByEmployeeUUID(uuid),
		url: `/hr/manual-entry/by/${uuid}`,
		enabled: !!uuid,
	});

export const useHrEmployeeFieldVisitInfoByUUID = <T>(uuid: string, field_visit_uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.fieldVisitEmployeeInfoByUUID(uuid, field_visit_uuid),
		url: `/hr/manual-entry-details/by/${uuid}?field_visit_uuid=${field_visit_uuid}`,
		enabled: !!uuid,
	});

export const useHrDeviceList = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.deviceList(),
		url: '/hr/device-list',
	});
export const useHrDeviceListByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.deviceListByUUID(uuid),
		url: `/hr/device-list/${uuid}`,
		enabled: !!uuid,
	});

export const useHrPunchLateByEmployeeUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.punchLateByEmployeeUUID(uuid),
		url: `/hr/punch-late-log/by/${uuid}`,
		enabled: !!uuid,
	});
