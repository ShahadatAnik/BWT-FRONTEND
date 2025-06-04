import { IDevicePermissionTableData, IEmployeeTableData } from '@/pages/hr/_config/columns/columns.type';
import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import { LinkOnly } from '@/components/others/link';
import { Button } from '@/components/ui/button';
import DateTime from '@/components/ui/date-time';

export const employeeColumns = ({
	handleDevices,
}: {
	handleDevices: (row: Row<any>) => void;
}): ColumnDef<IEmployeeTableData>[] => {
	return [
		{
			accessorKey: 'status',
			header: 'Status',
			enableColumnFilter: false,
			cell: (info) => <StatusButton value={info.getValue() as boolean} />,
		},
		{
			accessorKey: 'employee_id',
			header: 'ID',
			cell: (info) => <LinkOnly title={info.getValue<string>()} uri={`/profile/${info.row.original.uuid}`} />,
		},
		{
			accessorKey: 'employee_name',
			header: 'Name',
			enableColumnFilter: false,
			cell: ({ cell, row }) => (
				<div>
					<p>{cell.getValue<string>() || 'N/A'}</p>
					<span>
						{row.original.designation_name && row.original.designation_name + ', '}
						{row.original.department_name && row.original.department_name}
					</span>
				</div>
			),
		},

		{
			accessorKey: 'email',
			header: 'Email',
		},

		{
			accessorKey: 'shift_group_name',
			header: 'Shift',
		},
		{
			accessorKey: 'employment_type_name',
			header: 'Employment Type',
		},
		{
			accessorKey: 'workplace_name',
			header: 'Workplace',
		},
		{
			accessorKey: 'device',
			header: 'Device',
			enableColumnFilter: false,
			cell: (info) => (
				<Button size={'xs'} onClick={() => handleDevices(info.row)}>
					Assign Device
				</Button>
			),
		},
	];
};

export const employeeDeviceColumn = (): ColumnDef<IDevicePermissionTableData>[] => [
	{
		accessorKey: 'device_list_name',
		header: 'Device Name',
	},
	{
		accessorKey: 'permission_type',
		header: 'Permission',
	},
	{
		accessorKey: 'temporary_from_date',
		header: 'From',
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'temporary_to_date',
		header: 'To',
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];
