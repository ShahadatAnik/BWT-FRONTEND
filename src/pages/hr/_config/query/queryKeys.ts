import { IPaginationQuery } from '@/types';

export const hrQK = {
	all: () => ['admin'],

	//* department
	department: () => [...hrQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...hrQK.department(), uuid],

	//* designation
	designation: () => [...hrQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...hrQK.designation(), uuid],

	//* employee
	employees: (query?: string) => [...hrQK.all(), 'employees', query],
	employeesByUUID: (uuid: string) => [...hrQK.employees(), uuid],

	//* employee history
	employeeHistory: () => [...hrQK.all(), 'employee-history'],
	employeeHistoryByUUID: (uuid: string) => [...hrQK.employeeHistory(), uuid],
	employeeHistoryByEmployeeUUID: (uuid: string) => [...hrQK.employeeHistory(), 'employee', uuid],

	//* employee education
	employeeEducation: () => [...hrQK.all(), 'employee-education'],
	employeeEducationByUUID: (uuid: string) => [...hrQK.employeeEducation(), uuid],
	employeeEducationByEmployeeUUID: (uuid: string) => [...hrQK.employeeEducation(), 'employee', uuid],

	//* employee address
	employeeAddress: () => [...hrQK.all(), 'employee-address'],
	employeeAddressByUUID: (uuid: string) => [...hrQK.employeeAddress(), uuid],
	employeeAddressByEmployeeUUID: (uuid: string) => [...hrQK.employeeAddress(), 'employee', uuid],

	//* employee document
	employeeDocuments: () => [...hrQK.all(), 'employee-document'],
	employeeDocumentsByUUID: (uuid: string) => [...hrQK.employeeDocuments(), uuid],
	employeeDocumentsByEmployeeUUID: (uuid: string) => [...hrQK.employeeDocuments(), 'employee', uuid],

	// * Device Permission
	devicePermission: (query?: string) => [...hrQK.all(), 'device-permission', query],
	devicePermissionByUUID: (uuid: string) => [...hrQK.devicePermission(), uuid],
	deviceAllocation: (uuid?: string) => [...hrQK.all(), 'allocation', uuid],

	//* Punch log
	punchLog: (query?: string) => [...hrQK.all(), 'punch-log', query],
	applyLeaveLog: (query?: string) => [...hrQK.all(), 'apply-leave-log', query],
	manualEntryLog: (query?: string) => [...hrQK.all(), 'manual-entry-log', query],
	punchLateByEmployeeUUID: (uuid: string) => [...hrQK.all(), 'punch-late', 'by-employee', uuid],

	//* user
	userDefault: () => [...hrQK.all(), 'user'],
	user: (query: string) => [...hrQK.userDefault(), 'users', query],
	userByUUID: (uuid: string) => [...hrQK.userDefault(), uuid],
	userCanAccess: (uuid: string) => [...hrQK.userDefault(), 'can-access', uuid],
	userWithAccess: () => [...hrQK.userDefault(), 'users-with-access'],
	userPassword: (uuid: string) => [...hrQK.userDefault(), 'password', uuid],

	//* field visit
	manualEntry: (type?: string) => [...hrQK.all(), 'manual-entry', type],
	manualEntry2: (pagination: IPaginationQuery) => [...hrQK.all(), 'manual-entry-2', ...Object.values(pagination)],
	manualEntryByUUID: (uuid: string) => [...hrQK.manualEntry(), uuid],
	manualEntryByEmployeeUUID: (uuid: string) => [...hrQK.manualEntry(), 'by-employee', uuid],
	fieldVisitEmployeeInfoByUUID: (uuid: string, field_visit_uuid: string) => [
		...hrQK.manualEntry(),
		'employee-info',
		uuid,
		field_visit_uuid,
	],

	deviceList: () => [...hrQK.all(), 'device-list'],
	deviceListByUUID: (uuid: string) => [...hrQK.deviceList(), uuid],
};
