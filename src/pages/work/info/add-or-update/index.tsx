import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IInfoTableData } from '../../_config/columns/columns.type';
import { useWorkInfo, useWorkInfoByUUID } from '../../_config/query';
import { IInfo, INFO_NULL, INFO_SCHEMA } from '../../_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { url: infoUrl, updateData, postData, deleteData } = useWorkInfo();

	const { data, invalidateQuery: invalidateTestDetails } = useWorkInfoByUUID<IInfoTableData>(uuid as string);

	const form = useRHF(INFO_SCHEMA, INFO_NULL);
	const isProductReceived = form.watch('is_product_received');
	const isNewCustomer = form.watch('is_new_customer');
	const isBusinessTypeCompany = form.watch('business_type') === 'company' && isNewCustomer;

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'order_entry',
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset({
				...data,
				order_entry: Array.isArray(data.order_entry)
					? data.order_entry
					: data.order_entry
						? [data.order_entry]
						: [],
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: IInfo) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */
		if (isUpdate) {
			const infoData = {
				...values,
				...(isNewCustomer && { user_uuid: nanoid() }),
				...(!isBusinessTypeCompany && { department_uuid: null, designation_uuid: null }),
				updated_at: getDateTime(),
			};
			if ('order_entry' in infoData) {
				delete (infoData as { order_entry?: any })['order_entry'];
			}

			const info_promise = await updateData.mutateAsync({
				url: `${infoUrl}/${uuid}`,
				updatedData: infoData,
				isOnCloseNeeded: false,
			});

			const order_entry_promise = values.order_entry.map((item) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						info_uuid: uuid,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/work/order',
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `/work/order/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				await Promise.all([info_promise, ...order_entry_promise])
					.then(() => form.reset(INFO_NULL))
					.then(() => {
						invalidateTestDetails(); // TODO: Update invalidate query
						navigate(`/work/info/details/${uuid}`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		const info_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create purchase description

		const infoData = {
			...values,
			...(isNewCustomer && { user_uuid: nanoid() }),
			...(!isBusinessTypeCompany && { department_uuid: null, designation_uuid: null }),
			uuid: info_uuid,
			created_at,
			created_by,
		};

		// delete purchase field from data to be sent

		if ('order_entry' in infoData) {
			delete (infoData as { order_entry?: any })['order_entry'];
		}

		const info_promise = await postData.mutateAsync({
			url: infoUrl,
			newData: infoData,
			isOnCloseNeeded: false,
		});

		// Create purchase entries
		const order_entry_entries = [...values.order_entry].map((item) => ({
			...item,
			info_uuid: info_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const order_entry_entries_promise = order_entry_entries.map((item) =>
			postData.mutateAsync({
				url: '/work/order',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
			// TODO: Update promises name ⬇️
			await Promise.all([info_promise, ...order_entry_entries_promise])
				.then(() => form.reset(INFO_NULL))
				.then(() => {
					invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/work/info/details/${info_uuid}`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const handleAdd = () => {
		append({
			is_diagnosis_need: false,
			model_uuid: '',
			size_uuid: '',
			quantity: 0,
			serial_no: '',
			problems_uuid: [],
			problem_statement: '',
			accessories: [],
			warehouse_uuid: null,
			rack_uuid: null,
			floor_uuid: null,
			box_uuid: null,
			remarks: null,
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		const modelName: string = String(form.getValues('order_entry')[index].model_id);
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: modelName,
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		const field = form.watch('order_entry')[index];
		append({
			is_diagnosis_need: field.is_diagnosis_need,
			model_uuid: field.model_uuid,
			size_uuid: field.size_uuid,
			serial_no: field.serial_no,
			quantity: field.quantity,
			problems_uuid: field.problems_uuid,
			problem_statement: field.problem_statement,
			accessories: field.accessories,
			warehouse_uuid: field.warehouse_uuid,
			rack_uuid: field.rack_uuid,
			floor_uuid: field.floor_uuid,
			box_uuid: field.box_uuid,
			remarks: field.remarks,
		});
	};

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Order Entry' : ' Add Order Entry'}
			form={form}
			onSubmit={onSubmit}
		>
			<Header />
			<CoreForm.DynamicFields
				title='Entry'
				form={form}
				fieldName='order_entry'
				fieldDefs={useGenerateFieldDefs({
					copy: handleCopy,
					remove: handleRemove,
					watch: form.watch,
					isProductReceived: isProductReceived,
				})}
				handleAdd={handleAdd}
				fields={fields}
			/>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/work/order`,
						deleteData,
						onClose: () => {
							form.setValue(
								'order_entry',
								form.getValues('order_entry').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
