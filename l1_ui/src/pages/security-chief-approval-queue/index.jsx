import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import NotificationCenter from '../../components/ui/NotificationCenter';
import QuickActions from '../../components/ui/QuickActions';
import ApprovalQueueTable from './components/ApprovalQueueTable';
import DetailPanel from './components/DetailPanel';
import FilterPanel from './components/FilterPanel';
import BulkActionsBar from './components/BulkActionsBar';
import PerformanceMetrics from './components/PerformanceMetrics';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';

const SecurityChiefApprovalQueue = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegistrationIds, setSelectedRegistrationIds] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [sortConfig, setSortConfig] = useState({ column: 'submitted', direction: 'desc' });
  const [filters, setFilters] = useState({
    department: 'all',
    deviceType: 'all',
    riskLevel: 'all',
    status: 'all',
    dateRange: 'last7days',
    dateFrom: '',
    dateTo: '',
    slaBreachOnly: false,
    highValueOnly: false,
    flaggedOnly: false
  });

  const mockRegistrations = [
  {
    id: 'REG001',
    registrationId: 'PC-2025-001234',
    studentName: 'Sarah Johnson',
    studentId: 'CS2021045',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1228d9324-1763295791913.png",
    studentPhotoAlt: 'Professional headshot of young woman with brown hair wearing blue blazer',
    email: 'sarah.johnson@university.edu',
    department: 'Computer Science',
    year: '3rd Year',
    deviceBrand: 'Dell',
    deviceModel: 'XPS 15',
    serialNumber: 'DL-XPS-2024-8765',
    deviceType: 'Laptop',
    devicePhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1c410f9f3-1765654512131.png",
    devicePhotoAlt: 'Silver Dell XPS 15 laptop with black keyboard on white desk',
    submittedAt: new Date(Date.now() - 1800000),
    riskLevel: 'high',
    status: 'urgent',
    slaStatus: 'breach',
    riskFactors: [
    'High-value device ($1,500+)',
    'Student has previous lost device report',
    'Incomplete documentation'],

    approvalHistory: [
    {
      action: 'submitted',
      by: 'Sarah Johnson',
      timestamp: new Date(Date.now() - 1800000),
      notes: 'Initial registration submission'
    }]

  },
  {
    id: 'REG002',
    registrationId: 'PC-2025-001235',
    studentName: 'Michael Chen',
    studentId: 'EE2022089',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_13a48293d-1763296098326.png",
    studentPhotoAlt: 'Professional headshot of Asian man with short black hair wearing gray suit',
    email: 'michael.chen@university.edu',
    department: 'Electrical Engineering',
    year: '2nd Year',
    deviceBrand: 'HP',
    deviceModel: 'Pavilion 14',
    serialNumber: 'HP-PAV-2024-5432',
    deviceType: 'Laptop',
    devicePhoto: "https://images.unsplash.com/photo-1637329163742-edd934dde152",
    devicePhotoAlt: 'Black HP Pavilion laptop with silver logo on wooden table',
    submittedAt: new Date(Date.now() - 3600000),
    riskLevel: 'low',
    status: 'normal',
    slaStatus: 'within',
    riskFactors: [],
    approvalHistory: [
    {
      action: 'submitted',
      by: 'Michael Chen',
      timestamp: new Date(Date.now() - 3600000),
      notes: 'Complete documentation provided'
    }]

  },
  {
    id: 'REG003',
    registrationId: 'PC-2025-001236',
    studentName: 'Emily Rodriguez',
    studentId: 'ME2020156',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_162a57531-1763296100992.png",
    studentPhotoAlt: 'Professional headshot of Hispanic woman with long dark hair wearing white blouse',
    email: 'emily.rodriguez@university.edu',
    department: 'Mechanical Engineering',
    year: '4th Year',
    deviceBrand: 'Lenovo',
    deviceModel: 'ThinkPad X1',
    serialNumber: 'LN-TPX1-2024-9876',
    deviceType: 'Laptop',
    devicePhoto: "https://images.unsplash.com/photo-1497171090531-fa6297066879",
    devicePhotoAlt: 'Black Lenovo ThinkPad X1 laptop with red trackpoint on office desk',
    submittedAt: new Date(Date.now() - 7200000),
    riskLevel: 'medium',
    status: 'flagged',
    slaStatus: 'within',
    riskFactors: [
    'Device serial number verification pending',
    'Student changed department recently'],

    approvalHistory: [
    {
      action: 'submitted',
      by: 'Emily Rodriguez',
      timestamp: new Date(Date.now() - 7200000),
      notes: 'Awaiting serial number verification'
    }]

  },
  {
    id: 'REG004',
    registrationId: 'PC-2025-001237',
    studentName: 'David Kim',
    studentId: 'CS2023078',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_106ff1ea7-1763296098043.png",
    studentPhotoAlt: 'Professional headshot of young Asian man with glasses wearing navy blue shirt',
    email: 'david.kim@university.edu',
    department: 'Computer Science',
    year: '1st Year',
    deviceBrand: 'Apple',
    deviceModel: 'MacBook Pro 14',
    serialNumber: 'AP-MBP-2024-3456',
    deviceType: 'Laptop',
    devicePhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_194f5d6d1-1764681494747.png",
    devicePhotoAlt: 'Space gray Apple MacBook Pro with glowing Apple logo on dark background',
    submittedAt: new Date(Date.now() - 10800000),
    riskLevel: 'low',
    status: 'normal',
    slaStatus: 'within',
    riskFactors: [],
    approvalHistory: [
    {
      action: 'submitted',
      by: 'David Kim',
      timestamp: new Date(Date.now() - 10800000),
      notes: 'All documentation complete'
    }]

  },
  {
    id: 'REG005',
    registrationId: 'PC-2025-001238',
    studentName: 'Jessica Martinez',
    studentId: 'BA2021134',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1194a8e94-1763301813569.png",
    studentPhotoAlt: 'Professional headshot of young woman with curly brown hair wearing red blazer',
    email: 'jessica.martinez@university.edu',
    department: 'Business Administration',
    year: '3rd Year',
    deviceBrand: 'Asus',
    deviceModel: 'ZenBook 14',
    serialNumber: 'AS-ZB14-2024-7890',
    deviceType: 'Laptop',
    devicePhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1705a0922-1764826415904.png",
    devicePhotoAlt: 'Silver Asus ZenBook laptop with blue screen on white desk with coffee cup',
    submittedAt: new Date(Date.now() - 14400000),
    riskLevel: 'medium',
    status: 'normal',
    slaStatus: 'within',
    riskFactors: [
    'Device purchased from third-party vendor'],

    approvalHistory: [
    {
      action: 'submitted',
      by: 'Jessica Martinez',
      timestamp: new Date(Date.now() - 14400000),
      notes: 'Purchase receipt attached'
    }]

  }];


  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [filteredRegistrations, setFilteredRegistrations] = useState(mockRegistrations);

  const performanceMetrics = {
    pendingCount: registrations?.length,
    avgProcessingTime: '12m',
    approvedToday: 47,
    slaCompliance: 94
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.key === '?') {
        setShowShortcuts(true);
      }
      if (e?.key === 'Escape') {
        setSelectedRegistration(null);
        setShowShortcuts(false);
      }
      if ((e?.ctrlKey || e?.metaKey) && e?.key === 'f') {
        e?.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    let filtered = [...registrations];

    if (searchQuery) {
      filtered = filtered?.filter((reg) =>
      reg?.studentName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      reg?.studentId?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      reg?.registrationId?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      reg?.deviceBrand?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      reg?.serialNumber?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    if (filters?.department !== 'all') {
      filtered = filtered?.filter((reg) => reg?.department?.toLowerCase()?.replace(/\s+/g, '-') === filters?.department);
    }

    if (filters?.deviceType !== 'all') {
      filtered = filtered?.filter((reg) => reg?.deviceType?.toLowerCase() === filters?.deviceType);
    }

    if (filters?.riskLevel !== 'all') {
      filtered = filtered?.filter((reg) => reg?.riskLevel === filters?.riskLevel);
    }

    if (filters?.status !== 'all') {
      filtered = filtered?.filter((reg) => reg?.status === filters?.status);
    }

    if (filters?.slaBreachOnly) {
      filtered = filtered?.filter((reg) => reg?.slaStatus === 'breach');
    }

    if (filters?.flaggedOnly) {
      filtered = filtered?.filter((reg) => reg?.status === 'flagged');
    }

    filtered?.sort((a, b) => {
      const aValue = sortConfig?.column === 'submitted' ? a?.submittedAt :
      sortConfig?.column === 'student' ? a?.studentName :
      sortConfig?.column === 'device' ? `${a?.deviceBrand} ${a?.deviceModel}` :
      sortConfig?.column === 'department' ? a?.department :
      sortConfig?.column === 'risk' ? a?.riskLevel : '';

      const bValue = sortConfig?.column === 'submitted' ? b?.submittedAt :
      sortConfig?.column === 'student' ? b?.studentName :
      sortConfig?.column === 'device' ? `${b?.deviceBrand} ${b?.deviceModel}` :
      sortConfig?.column === 'department' ? b?.department :
      sortConfig?.column === 'risk' ? b?.riskLevel : '';

      if (sortConfig?.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredRegistrations(filtered);
  }, [searchQuery, filters, registrations, sortConfig]);

  const handleSort = (column) => {
    setSortConfig((prev) => ({
      column,
      direction: prev?.column === column && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    console.log('Filters applied:', filters);
  };

  const handleResetFilters = () => {
    setFilters({
      department: 'all',
      deviceType: 'all',
      riskLevel: 'all',
      status: 'all',
      dateRange: 'last7days',
      dateFrom: '',
      dateTo: '',
      slaBreachOnly: false,
      highValueOnly: false,
      flaggedOnly: false
    });
  };

  const handleSavePreset = (name, filterConfig) => {
    console.log('Saving preset:', name, filterConfig);
  };

  const handleViewDetails = (registration) => {
    setSelectedRegistration(registration);
  };

  const handleApprove = (ids) => {
    console.log('Approving registrations:', ids);
    setRegistrations((prev) => prev?.filter((reg) => !ids?.includes(reg?.id)));
    setSelectedRegistrationIds([]);
    setSelectedRegistration(null);
  };

  const handleReject = (ids) => {
    console.log('Rejecting registrations:', ids);
    setRegistrations((prev) => prev?.filter((reg) => !ids?.includes(reg?.id)));
    setSelectedRegistrationIds([]);
    setSelectedRegistration(null);
  };

  const handleRegenerateId = (id) => {
    console.log('Regenerating ID for:', id);
  };

  const handleExport = () => {
    console.log('Exporting approval queue data');
  };

  return (
    <>
      <Helmet>
        <title>Approval Queue - Smart PC Tracker</title>
        <meta name="description" content="Security Chief approval queue for device registrations with bulk processing and advanced filtering capabilities" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <RoleBasedSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />


        <div
          className={`transition-all duration-200 ${
          isSidebarCollapsed ? 'lg:ml-sidebar-collapsed' : 'lg:ml-sidebar-width'}`
          }>

          <header className="sticky top-0 z-30 bg-card border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-xl font-bold text-foreground">Approval Queue</h1>
                  <p className="text-sm text-muted-foreground">
                    Review and process device registrations
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <QuickActions context="approval" />
                <Button
                  variant="outline"
                  iconName="Download"
                  onClick={handleExport}>

                  Export
                </Button>
                <Button
                  variant="ghost"
                  iconName="Keyboard"
                  onClick={() => setShowShortcuts(true)}
                  aria-label="Show keyboard shortcuts" />

                <NotificationCenter />
              </div>
            </div>
          </header>

          <main className="p-6 space-y-6">
            <PerformanceMetrics metrics={performanceMetrics} />

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  id="search-input"
                  type="search"
                  placeholder="Search by student name, ID, registration ID, device, or serial number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full" />

              </div>
              <Button
                variant="outline"
                iconName="Filter"
                onClick={() => document.getElementById('filter-panel')?.scrollIntoView({ behavior: 'smooth' })}>

                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <ApprovalQueueTable
                  registrations={filteredRegistrations}
                  selectedIds={selectedRegistrationIds}
                  onSelectionChange={setSelectedRegistrationIds}
                  onViewDetails={handleViewDetails}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  sortConfig={sortConfig}
                  onSort={handleSort} />

              </div>

              <div className="lg:col-span-4 space-y-6">
                <div id="filter-panel">
                  <FilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={handleApplyFilters}
                    onResetFilters={handleResetFilters}
                    onSavePreset={handleSavePreset} />

                </div>

                <DetailPanel
                  registration={selectedRegistration}
                  onClose={() => setSelectedRegistration(null)}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onRegenerateId={handleRegenerateId} />

              </div>
            </div>
          </main>
        </div>

        <BulkActionsBar
          selectedCount={selectedRegistrationIds?.length}
          onApproveSelected={() => handleApprove(selectedRegistrationIds)}
          onRejectSelected={() => handleReject(selectedRegistrationIds)}
          onClearSelection={() => setSelectedRegistrationIds([])} />


        <KeyboardShortcutsModal
          isOpen={showShortcuts}
          onClose={() => setShowShortcuts(false)} />

      </div>
    </>);

};

export default SecurityChiefApprovalQueue;