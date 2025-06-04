import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { useNavigate } from 'react-router-dom';

import { CustomDatePicker } from '@/components/buttons/CustomDatePicker';

import { PageInfo } from '@/utils';

import { monthlyDetailsColumns } from '../_config/columns';
import { IMonthlyDetailsTableData } from '../_config/columns/columns.type';
import { usePayrollMonthlyDetails } from '../_config/query';

const ManualEntry = () => {
	const navigate = useNavigate();
	const [date, setDate] = useState<Date>(new Date());

	const { data, isLoading, url, refetch } = usePayrollMonthlyDetails<IMonthlyDetailsTableData[]>(
		date.getFullYear(),
		date.getMonth() + 1
	);

	const pageInfo = useMemo(() => new PageInfo('Payroll/Monthly Details', url, 'payroll__monthly_details'), [url]);

	const handleRedirect = (row: IMonthlyDetailsTableData) => {
		navigate(`/payroll/monthly-employee-details/${row.employee_uuid}/${date.getFullYear()}/${date.getMonth() + 1}`);
	};

	// Table Columns
	const columns = monthlyDetailsColumns({ handleRedirect });

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<div className='flex flex-col gap-8'>
				<TableProvider
					title={pageInfo.getTitle()}
					columns={columns}
					data={data ?? []}
					isLoading={isLoading}
					handleRefetch={refetch}
					toolbarOptions={[
						'advance-filter',
						'all-filter',
						'export-csv',
						'export-pdf',
						'faceted-filter',
						'other',
						'refresh',
						'view',
					]}
					otherToolBarComponents={
						<CustomDatePicker
							showMonthYear={true}
							onChange={(date) => {
								setDate(date);
							}}
						/>
					}
				/>
			</div>
		</PageProvider>
	);
};

export default ManualEntry;
