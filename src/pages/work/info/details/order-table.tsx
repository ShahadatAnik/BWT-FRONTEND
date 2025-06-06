import React from 'react';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import DataTableEntry from '@core/data-table/entry';

import { orderColumnsForDetails } from '../../_config/columns';
import { IInfoTableData, IOrderTableData } from '../../_config/columns/columns.type';

const OrderTable: React.FC<{ data: IInfoTableData }> = ({ data }) => {
	const navigate = useNavigate();

	const pageAccess = useAccess('work__order') as string[];

	const actionTrxAccess = pageAccess.includes('click_trx');

	const handleAgainstTrx = (row: Row<IOrderTableData>) => {
		navigate(`/work/transfer-section/${row.original.info_uuid}/${null}/${row.original.uuid}`);
	};
	const columns = orderColumnsForDetails({ actionTrxAccess, handleAgainstTrx });

	return (
		<DataTableEntry
			title='Order'
			columns={columns}
			data={data?.order_entry || []}
			defaultVisibleColumns={{ created_at: false, updated_at: false, created_by_name: false }}
		/>
	);
};

export default OrderTable;
