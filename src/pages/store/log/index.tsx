import { useEffect } from 'react';

import InternalTransfer from './internal-transfer';
import Purchase from './purchase';
import PurchaseReturn from './purchase-return';

const Log = () => {
	useEffect(() => {
		document.title = 'Store Log';
	}, []);
	return (
		<div>
			<InternalTransfer />
			<hr className='border-secondary-content my-6 border-2 border-dashed' />
			<Purchase />
			<hr className='border-secondary-content my-6 border-2 border-dashed' />
			<PurchaseReturn />
		</div>
	);
};
export default Log;
