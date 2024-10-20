import ReactPaginate from 'react-paginate';

import { buttonVariants } from '@/components/ui/button';

interface IPaginatedProps {
	initialPage: number;
	totalPages: number;
	onChange: (page: number) => void;
	currentPage: number;
}

function PaginateButtons({
	totalPages,
	onChange,
	currentPage,
}: IPaginatedProps) {
	const handlePageClick = (event: any) => {
		onChange(event.selected);
	};

	return (
		<ReactPaginate
			forcePage={currentPage}
			pageLinkClassName={buttonVariants({
				variant: 'gradient',
				size: 'icon',
			})}
			activeLinkClassName={buttonVariants({
				variant: 'gradient-accent',
				size: 'icon',
			})}
			previousClassName='hidden'
			nextClassName='hidden'
			containerClassName='flex gap-1.5 items-stretch'
			breakLabel='...'
			onPageChange={handlePageClick}
			pageRangeDisplayed={2}
			pageCount={totalPages}
			renderOnZeroPageCount={null}
		/>
	);
}

export default PaginateButtons;
