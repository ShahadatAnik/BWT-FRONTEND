import { useState } from 'react';
import useProfile from '@/hooks/useProfile';

import { sidebarItems } from './_config/sidebar-items';
import { ActionsSidebar } from './action-sidebar';
import { AddressInformation } from './address-information';
import { ApproverInformation } from './approver-information';
import { ChangePassword } from './change-password';
import Content from './content';
import { EducationHistory } from './education-history';
import { EmployeeDocuments } from './employee-documents';
import { EmploymentHistory } from './employment-history';
import { GeneralInformation } from './general-information';
import { NotificationSettings } from './notification-settings';
import { PersonalContactInfo } from './personal-contact-info';
import { SidebarNavigation } from './sidebar-navigation';

const ProfileInformation = () => {
	const [currentTab, setCurrentTab] = useState(sidebarItems[0].label);

	const handleTabClick = (label: string) => {
		setCurrentTab(label);
	};

	const { profileData, updateProfileData, isLoading } = useProfile();

	if (isLoading) return <div>Loading...</div>;

	if (!profileData) return <div>Something went wrong</div>;

	return (
		<div className='grid h-full grid-cols-1 gap-4 lg:grid-cols-5'>
			<div className='flex h-full flex-col gap-4 lg:col-span-4 lg:flex-row lg:overflow-hidden'>
				<SidebarNavigation
					sidebarItems={sidebarItems}
					currentTab={currentTab}
					handleTabClick={handleTabClick}
					employeeName={profileData.employee_name}
				/>
				<Content title={currentTab}>
					{currentTab === 'General Information' && (
						<GeneralInformation data={profileData} updateData={updateProfileData} />
					)}
					{currentTab === 'Approver Information' && (
						<ApproverInformation data={profileData} updateData={updateProfileData} />
					)}
					{currentTab === 'Personal & Contact Info' && (
						<PersonalContactInfo data={profileData} updateData={updateProfileData} />
					)}
					{currentTab === 'Address' && <AddressInformation employee_id={profileData.uuid} />}
					{currentTab === 'Change Password' && <ChangePassword />}
					{currentTab === 'Employment History' && <EmploymentHistory employee_id={profileData.uuid} />}
					{currentTab === 'Education History' && <EducationHistory employee_id={profileData.uuid} />}
					{currentTab === 'Employee Documents' && <EmployeeDocuments employee_id={profileData.uuid} />}
					{currentTab === 'Notification Settings' && <NotificationSettings />}
				</Content>
			</div>
			<ActionsSidebar />
		</div>
	);
};

export default ProfileInformation;
