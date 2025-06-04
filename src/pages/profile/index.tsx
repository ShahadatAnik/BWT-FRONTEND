import { useEffect } from 'react';
import { ProfileProvider } from '@/context';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfilePage = () => {
	useEffect(() => {
		document.title = 'Profile';
	}, []);

	return (
		<ProfileProvider>
			{({ navigationItems, currentTab, handleTabClick }) => (
				<Tabs value={currentTab} className='flex h-auto w-full flex-col overflow-hidden lg:h-full'>
					<TabsList className='flex h-auto w-full flex-wrap justify-start space-x-0 overflow-hidden rounded-b-none rounded-t-md bg-primary p-0 lg:h-10'>
						{navigationItems.map((item) => (
							<TabsTrigger
								onClick={() => handleTabClick(item.title)}
								key={item.title}
								value={item.title}
								className='data-[state=active]:bg-gradient-accent h-full rounded-none bg-transparent text-sm font-medium text-white last:border-r-0 hover:bg-white/10 data-[state=active]:text-white'
							>
								{item.title}
							</TabsTrigger>
						))}
					</TabsList>
					{navigationItems.map((item) => (
						<TabsContent
							key={item.title}
							value={item.title}
							className='mt-0 rounded-b-md border border-t-0 bg-white p-2 shadow-sm lg:flex-1 lg:overflow-hidden lg:p-4'
						>
							{item.content}
						</TabsContent>
					))}
				</Tabs>
			)}
		</ProfileProvider>
	);
};

export default ProfilePage;
