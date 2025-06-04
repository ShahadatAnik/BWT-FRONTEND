import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { cn } from '@/lib/utils';

interface SidebarNavigationProps {
	employeeName: string;
	employeeImage?: string;
	sidebarItems: { label: string }[];
	currentTab: string;
	handleTabClick: (label: string) => void;
}

export function SidebarNavigation({
	employeeName,
	employeeImage,
	sidebarItems,
	currentTab,
	handleTabClick,
}: SidebarNavigationProps) {
	return (
		<div className='flex flex-col overflow-auto lg:h-full lg:w-80'>
			<Card className='mb-4 bg-white p-8'>
				<div className='flex flex-col items-center space-y-4'>
					<Avatar className='h-24 w-24'>
						<AvatarImage src={employeeImage || '/placeholder.svg'} alt={employeeName} />
						<AvatarFallback className='bg-accent text-lg text-white'>
							{employeeName
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</AvatarFallback>
					</Avatar>
				</div>
			</Card>

			<nav className='flex-1'>
				{sidebarItems.map((item) => (
					<Button
						key={item.label}
						variant={currentTab === item.label ? 'default' : 'ghost'}
						className={cn(
							`h-auto w-full justify-start px-4 py-2.5 text-left uppercase`,
							currentTab === item.label
								? 'bg-accent text-white hover:bg-accent/90'
								: 'text-gray-600 hover:bg-gray-100'
						)}
						onClick={() => handleTabClick(item.label)}
					>
						<span className='text-xs font-medium'>{item.label}</span>
					</Button>
				))}
			</nav>
		</div>
	);
}
