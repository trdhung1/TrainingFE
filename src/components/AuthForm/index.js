import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthForm() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-3xl mx-auto">
      <Tabs
        selectedIndex={activeTab}
        onSelect={(index) => setActiveTab(index)}
        className="mb-8 w-[500px]"
        selectedTabClassName='rounded-none'
      >
        <TabList className="flex w-[500px]">
          <Tab
            className={`${
              activeTab === 0 ? ' bg-gray-200 border-b-2 border-blue-500' : 'bg-white hover:bg-gray-50'
            } text-gray-700 py-4 px-6 font-medium focus:outline-none flex-1`}
          >
            Sign In
          </Tab>
          <Tab
            className={`${
              activeTab === 1 ? 'bg-gray-200 border-b-2 border-blue-500' : 'bg-white hover:bg-gray-50'
            } text-gray-700 py-4 px-6 font-medium focus:outline-none flex-1`}
          >
            Sign Up
          </Tab>
        </TabList>
        <TabPanel className="w-full">
          <LoginForm />
        </TabPanel>
        <TabPanel className="w-full">
          <RegisterForm />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default AuthForm;
