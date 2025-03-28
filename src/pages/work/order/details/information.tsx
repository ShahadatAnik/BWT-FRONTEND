import React from 'react';

import StatusButton from '@/components/buttons/status';
import { LinkOnly } from '@/components/others/link';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';
import { Switch } from '@/components/ui/switch';

import { formatDateTable } from '@/utils/formatDate';

import { IOrderTableData } from '../../_config/columns/columns.type';

const Information: React.FC<{ data: IOrderTableData; updateData: any }> = ({ data, updateData }) => {
	const renderGeneralItems = (): ITableListItems => {
		return [
			{
				label: 'ID',
				value: data.order_id,
			},
			{
				label: 'Info ID',
				value: (
					<LinkOnly
						uri={`/work/info/details/${data?.info_uuid}/order/details/${data?.uuid}`}
						title={data?.info_id as string}
					/>
				),
			},
			{ label: 'User Name', value: data.user_name },
			{ label: 'User ID', value: data.user_id },
			{
				label: 'Phone No',
				value: data?.user_phone,
			},
			{
				label: 'Created At',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Updated At',
				value: formatDateTable(data.updated_at),
			},
			{ label: 'Remarks', value: data.remarks },
		];
	};
	const renderProductItems = (): ITableListItems => {
		return [
			{ label: 'Brand', value: data.brand_name },
			{ label: 'Model', value: data.model_name },
			{
				label: 'Size',
				value: data.size_name,
			},
			{
				label: 'Quantity',
				value: data.quantity,
			},
			{ label: 'Serial', value: data.serial_no },
		];
	};
	const renderProblemItems = (): ITableListItems => {
		return [
			{
				label: 'Problems',
				value: (
					<div className='flex flex-wrap gap-1'>
						{(data.problems_name as string[])?.map((item, index) => (
							<span key={index} className='rounded-[10px] bg-accent px-2 py-1 capitalize text-white'>
								{item.replace(/_/g, ' ')}
							</span>
						))}
					</div>
				),
			},
			{ label: 'Statement', value: data.problem_statement },
		];
	};

	const renderStatusItems = (): ITableListItems => {
		return [
			{
				label: 'Received',
				value: <StatusButton value={data.is_product_received as boolean} />,
			},
			{
				label: 'Diagnosis Need',
				value: <StatusButton value={data.is_diagnosis_needed as boolean} />,
			},
			{
				label: 'Transfer For QC',
				value: <Switch checked={data?.is_transferred_for_qc} onCheckedChange={() => handelQCStatusChange()} />,
			},
			{
				label: 'Ready For Delivery',
				value: (
					<Switch
						checked={data?.is_ready_for_delivery}
						onCheckedChange={() => handelDeliveryStatusChange()}
					/>
				),
			},

			{
				label: 'Receiving Date',
				value: formatDateTable(data.received_date),
			},
			{
				label: 'Accessories',
				value: (
					<div className='flex flex-wrap gap-1'>
						{(data.accessories as string[])?.map((item, index) => (
							<span key={index} className='rounded-[10px] bg-accent px-2 py-1 capitalize text-white'>
								{item.replace(/_/g, ' ')}
							</span>
						))}
					</div>
				),
			},
		];
	};

	const renderLocationItems = (): ITableListItems => {
		return [
			{
				label: 'Warehouse',
				value: data.warehouse_name,
			},
			{
				label: 'Rack',
				value: data.rack_name,
			},
			{
				label: 'Floor',
				value: data.floor_name,
			},
			{
				label: 'Box',
				value: data.box_name,
			},
		];
	};
	const renderDiagnosisItems = (): ITableListItems => {
		return [
			{
				label: 'Diagnosis ID',
				value: data?.diagnosis?.diagnosis_id,
			},
			{
				label: 'Problem',
				value: (
					<div className='flex flex-wrap gap-1'>
						{(data?.diagnosis?.problems_name as string[])?.map((item, index) => (
							<span key={index} className='rounded-[10px] bg-accent px-2 py-1 capitalize text-white'>
								{item.replace(/_/g, ' ')}
							</span>
						))}
					</div>
				),
			},
			{
				label: 'Internal Problem Statement',
				value: data.diagnosis?.problem_statement,
			},
			{
				label: 'Customer Problem Statement',
				value: data.diagnosis?.customer_problem_statement,
			},
			{
				label: 'Proposed Cost',
				value: data.diagnosis?.proposed_cost,
			},
			{
				label: 'Customer FeedBack',
				value: data.diagnosis?.customer_remarks,
			},
			{
				label: 'Proceed to Repair',
				value: <StatusButton value={data.diagnosis?.is_proceed_to_repair as boolean} />,
			},
			{
				label: 'Status Update Date',
				value: data.diagnosis?.status_update_date && formatDateTable(data.diagnosis?.status_update_date),
			},
		];
	};
	const handelQCStatusChange = async () => {
		await updateData.mutateAsync({
			url: `/work/order/${data?.uuid}`,
			updatedData: {
				is_transferred_for_qc: !data?.is_transferred_for_qc,
			},
			isOnCloseNeeded: false,
		});
	};
	const handelDeliveryStatusChange = async () => {
		await updateData.mutateAsync({
			url: `/work/order/${data?.uuid}`,
			updatedData: {
				is_ready_for_delivery: !data?.is_ready_for_delivery,
			},
			isOnCloseNeeded: false,
		});
	};
	return (
		<>
			<SectionContainer title={'Order Details'}>
				<div className='flex w-full flex-col gap-y-4 md:flex-row md:gap-y-0 md:space-x-4'>
					<TableList title='General' className='flex-1' items={renderGeneralItems()} />
					<TableList title='Product' className='flex-1' items={renderProductItems()} />
					<TableList title='Problem' className='flex-1' items={renderProblemItems()} />
					<TableList title='Status' className='flex-1' items={renderStatusItems()} />
					<TableList title='Location' className='flex-1' items={renderLocationItems()} />
				</div>
			</SectionContainer>
			{data?.is_diagnosis_need && (
				<SectionContainer title={'Diagnosis'}>
					<TableList items={renderDiagnosisItems()} />
				</SectionContainer>
			)}
		</>
	);
};

export default Information;
