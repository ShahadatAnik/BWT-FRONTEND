import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Content: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
	return (
		<Card className='h-full flex-1 overflow-auto'>
			<CardHeader className='border-b border-gray-200 px-3 py-2 lg:px-4 lg:py-3'>
				<CardTitle className='text-base font-semibold text-foreground lg:text-lg'>{title}</CardTitle>
			</CardHeader>
			<CardContent className='p-0'>{children}</CardContent>
		</Card>
	);
};

export default Content;
