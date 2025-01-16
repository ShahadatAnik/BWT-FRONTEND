import { useFormContext } from 'react-hook-form';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherPurchase } from '@/lib/common-queries/other';

import { IPurchaseReturn } from '../../_config/schema';

const Header = () => {
	const form = useFormContext<IPurchaseReturn>();
	const { data: purchaseOptions } = useOtherPurchase<IFormSelectOption[]>();

	return (
		<CoreForm.Section title={`Information`}>
			<FormField
				control={form.control}
				name='purchase_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Purchase'
						placeholder='Select Purchase'
						options={purchaseOptions!}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</CoreForm.Section>
	);
};

export default Header;
