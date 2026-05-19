import React, { useState } from 'react';
import { Client } from './types';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import Customer360 from './components/Customer360';
import ServiceApplication from './components/ServiceApplication';
import AgencyCustomerDetails from './components/AgencyCustomerDetails';
import ServiceApproval from './components/ServiceApproval';
import BasicInfo from './components/BasicInfo';
import CoopInfo from './components/CoopInfo';
import ClaimRecord from './components/ClaimRecord';
import TimelinePage from './components/TimelinePage';
import CustomerTodo from './components/CustomerTodo';
import AllServices from './components/AllServices';
import ServiceOverview from './components/ServiceOverview';

type ViewState = 'HOME' | 'DASHBOARD' | 'CUSTOMER_LIST' | 'CUSTOMER_360' | 'SERVICE_APPLICATION' | 'AGENCY_CUSTOMER_DETAILS' | 'SERVICE_APPROVAL' | 'BASIC_INFO' | 'COOP_INFO' | 'CLAIM_RECORD' | 'TIMELINE_PAGE' | 'CUSTOMER_TODO' | 'ALL_SERVICES' | 'SERVICE_OVERVIEW';

type OverviewTab = '发放服务' | '使用服务' | '未使用的' | '有评价的';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [customer360Source, setCustomer360Source] = useState<ViewState>('HOME');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [globalToast, setGlobalToast] = useState<string | null>(null);
  const [serviceOverviewTab, setServiceOverviewTab] = useState<OverviewTab>('发放服务');

  const showToast = (message: string) => {
    setGlobalToast(message);
    setTimeout(() => {
      setGlobalToast(null);
    }, 2000);
  };

  const handleNavigateToRenewal = () => {
    setCurrentView('DASHBOARD');
  };

  const handleNavigateToCustomerList = () => {
    setCurrentView('CUSTOMER_LIST');
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setCustomer360Source(currentView);
    setCurrentView('CUSTOMER_360');
  };

  const handleApplyService = (client: Client) => {
    setSelectedClient(client);
    setCurrentView('SERVICE_APPLICATION');
  };

  const handleNavigateToAgencyCustomerDetails = () => {
    setCurrentView('AGENCY_CUSTOMER_DETAILS');
  };

  const handleBackFromAgencyCustomerDetails = () => {
    setCurrentView('CUSTOMER_360');
  };

  const handleBackFromCustomer360 = () => {
    setCurrentView(customer360Source);
    setSelectedClient(null);
  };

  const handleBackFromServiceApplication = () => {
    setCurrentView('CUSTOMER_360');
  };

  const handleBackToHome = () => {
    setCurrentView('HOME');
  };

  const handleNavigateToApproval = () => {
    setCurrentView('SERVICE_APPROVAL');
  };

  const handleBackFromApproval = () => {
    setCurrentView('HOME');
  };

  const handleNavigateToBasicInfo = () => {
    setCurrentView('BASIC_INFO');
  };

  const handleBackFromBasicInfo = () => {
    setCurrentView('CUSTOMER_360');
  };

  const handleNavigateToCoopInfo = () => {
    setCurrentView('COOP_INFO');
  };

  const handleBackFromCoopInfo = () => {
    setCurrentView('CUSTOMER_360');
  };

  const handleNavigateToClaimRecord = () => {
    setCurrentView('CLAIM_RECORD');
  };

  const handleBackFromClaimRecord = () => {
    setCurrentView('CUSTOMER_360');
  };

  const handleNavigateToTimeline = () => {
    setCurrentView('TIMELINE_PAGE');
  };

  const handleBackFromTimeline = () => {
    setCurrentView('CUSTOMER_360');
  };

  const handleNavigateToTodo = () => {
    setCurrentView('CUSTOMER_TODO');
  };

  const handleBackFromTodo = () => {
    setCurrentView('CUSTOMER_LIST');
  };

  const handleNavigateToAllServices = () => {
    setCurrentView('ALL_SERVICES');
  };

  const handleBackFromAllServices = () => {
    setCurrentView('CUSTOMER_360');
  };

  const handleNavigateToServiceOverview = (tab: OverviewTab) => {
    setServiceOverviewTab(tab);
    setCurrentView('SERVICE_OVERVIEW');
  };

  const handleBackFromServiceOverview = () => {
    setCurrentView('CUSTOMER_360');
  };

  const handleSubmitService = () => {
    setCurrentView('CUSTOMER_360');
    showToast('服务申请已发起，可以在客户档案-服务养客-服务申请tab中查看进度');
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center font-sans text-gray-900">
      <div className="w-full max-w-[430px] bg-gray-50 min-h-screen shadow-2xl relative flex flex-col overflow-hidden">
        {globalToast && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-gray-800/90 text-white text-sm p-4 rounded-xl shadow-2xl text-center animate-fade-in w-10/12 max-w-[320px] backdrop-blur-sm">
            {globalToast}
          </div>
        )}
        {currentView === 'HOME' && (
          <Home
            onNavigateToRenewal={handleNavigateToRenewal}
            onNavigateToCustomer={handleNavigateToCustomerList}
            onNavigateToApproval={handleNavigateToApproval}
          />
        )}
        {currentView === 'DASHBOARD' && (
          <Dashboard
            onSelectClient={handleSelectClient}
            onApplyService={handleApplyService}
            onBack={handleBackToHome}
          />
        )}
        {currentView === 'CUSTOMER_LIST' && (
          <CustomerList
            onSelectClient={handleSelectClient}
            onBack={handleBackToHome}
            onNavigateToTodo={handleNavigateToTodo}
          />
        )}
        {currentView === 'CUSTOMER_360' && selectedClient && (
          <Customer360
            client={selectedClient}
            onBack={handleBackFromCustomer360}
            onApplyService={handleApplyService}
            onNavigateToAgencyCustomerDetails={handleNavigateToAgencyCustomerDetails}
            onNavigateToApproval={handleNavigateToApproval}
            onNavigateToBasicInfo={handleNavigateToBasicInfo}
            onNavigateToCoopInfo={handleNavigateToCoopInfo}
            onNavigateToClaimRecord={handleNavigateToClaimRecord}
            onNavigateToTimeline={handleNavigateToTimeline}
            onNavigateToAllServices={handleNavigateToAllServices}
            onNavigateToServiceOverview={handleNavigateToServiceOverview}
          />
        )}
        {currentView === 'SERVICE_APPLICATION' && selectedClient && (
          <ServiceApplication
            client={selectedClient}
            onBack={handleBackFromServiceApplication}
            onSubmit={handleSubmitService}
          />
        )}
        {currentView === 'AGENCY_CUSTOMER_DETAILS' && (
          <AgencyCustomerDetails onBack={handleBackFromAgencyCustomerDetails} />
        )}
        {currentView === 'SERVICE_APPROVAL' && (
          <ServiceApproval onBack={handleBackFromApproval} onSubmit={handleBackFromApproval} />
        )}
        {currentView === 'BASIC_INFO' && selectedClient && (
          <BasicInfo client={selectedClient} onBack={handleBackFromBasicInfo} />
        )}
        {currentView === 'COOP_INFO' && selectedClient && (
          <CoopInfo client={selectedClient} onBack={handleBackFromCoopInfo} />
        )}
        {currentView === 'CLAIM_RECORD' && selectedClient && (
          <ClaimRecord client={selectedClient} onBack={handleBackFromClaimRecord} />
        )}
        {currentView === 'TIMELINE_PAGE' && selectedClient && (
          <TimelinePage client={selectedClient} onBack={handleBackFromTimeline} />
        )}
        {currentView === 'CUSTOMER_TODO' && (
          <CustomerTodo onBack={handleBackFromTodo} />
        )}
        {currentView === 'ALL_SERVICES' && selectedClient && (
          <AllServices client={selectedClient} onBack={handleBackFromAllServices} />
        )}
        {currentView === 'SERVICE_OVERVIEW' && selectedClient && (
          <ServiceOverview
            client={selectedClient}
            onBack={handleBackFromServiceOverview}
            initialTab={serviceOverviewTab}
          />
        )}
      </div>
    </div>
  );
}
