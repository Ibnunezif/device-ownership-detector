import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import NotificationCenter from '../../components/ui/NotificationCenter';
import QuickActions from '../../components/ui/QuickActions';
import StatisticsCards from './components/StatisticsCards';
import AdvancedSearchToolbar from './components/AdvancedSearchToolbar';
import BulkOperationsToolbar from './components/BulkOperationsToolbar';
import DeviceTableRow from './components/DeviceTableRow';
import DeviceEditModal from './components/DeviceEditModal';
import DeviceHistoryModal from './components/DeviceHistoryModal';

const DeviceManagementConsole = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingDevice, setEditingDevice] = useState(null);
  const [viewingHistory, setViewingHistory] = useState(null);
  const [savedPresets, setSavedPresets] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'registrationDate', direction: 'desc' });
  const itemsPerPage = 20;

  useEffect(() => {
    const mockDevices = [
    {
      id: 1,
      deviceId: "DEV-2024-001",
      studentName: "Sarah Johnson",
      studentId: "STU-2024-1001",
      studentEmail: "sarah.johnson@university.edu",
      studentPhone: "+1 (555) 123-4567",
      studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1d99ce68c-1763293773878.png",
      studentPhotoAlt: "Professional headshot of young woman with brown hair wearing blue blazer smiling at camera",
      deviceType: "Laptop",
      brand: "Dell",
      model: "XPS 15",
      serialNumber: "DL-XPS15-2024-001",
      color: "Silver",
      processor: "Intel Core i7-12700H",
      ram: "16GB DDR5",
      department: "Computer Science",
      registrationDate: new Date('2024-09-15'),
      lastVerification: new Date('2025-12-17T08:30:00'),
      status: "active",
      totalScans: 156,
      lastLocation: "Main Gate",
      syncStatus: "synced"
    },
    {
      id: 2,
      deviceId: "DEV-2024-002",
      studentName: "Michael Chen",
      studentId: "STU-2024-1002",
      studentEmail: "michael.chen@university.edu",
      studentPhone: "+1 (555) 234-5678",
      studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd15b436-1763300581767.png",
      studentPhotoAlt: "Professional headshot of Asian man with short black hair wearing gray suit and glasses",
      deviceType: "Laptop",
      brand: "HP",
      model: "Pavilion 14",
      serialNumber: "HP-PAV14-2024-002",
      color: "Black",
      processor: "AMD Ryzen 5 5600H",
      ram: "8GB DDR4",
      department: "Engineering",
      registrationDate: new Date('2024-09-18'),
      lastVerification: new Date('2025-12-17T09:15:00'),
      status: "active",
      totalScans: 142,
      lastLocation: "Library Entrance",
      syncStatus: "synced"
    },
    {
      id: 3,
      deviceId: "DEV-2024-003",
      studentName: "Emily Rodriguez",
      studentId: "STU-2024-1003",
      studentEmail: "emily.rodriguez@university.edu",
      studentPhone: "+1 (555) 345-6789",
      studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1975607e9-1763295500639.png",
      studentPhotoAlt: "Professional headshot of Hispanic woman with long dark hair wearing white blouse smiling warmly",
      deviceType: "Laptop",
      brand: "Lenovo",
      model: "ThinkPad X1",
      serialNumber: "LN-TPX1-2024-003",
      color: "Black",
      processor: "Intel Core i5-1235U",
      ram: "16GB DDR4",
      department: "Business",
      registrationDate: new Date('2024-09-20'),
      lastVerification: new Date('2025-12-16T16:45:00'),
      status: "active",
      totalScans: 128,
      lastLocation: "East Gate",
      syncStatus: "synced"
    },
    {
      id: 4,
      deviceId: "DEV-2024-004",
      studentName: "James Wilson",
      studentId: "STU-2024-1004",
      studentEmail: "james.wilson@university.edu",
      studentPhone: "+1 (555) 456-7890",
      studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_18d854688-1763295573707.png",
      studentPhotoAlt: "Professional headshot of African American man with short hair wearing navy blue suit and tie",
      deviceType: "Desktop",
      brand: "Dell",
      model: "OptiPlex 7090",
      serialNumber: "DL-OPT7090-2024-004",
      color: "Black",
      processor: "Intel Core i7-11700",
      ram: "32GB DDR4",
      department: "Computer Science",
      registrationDate: new Date('2024-09-22'),
      lastVerification: new Date('2025-12-15T14:20:00'),
      status: "inactive",
      totalScans: 45,
      lastLocation: "Lab Building",
      syncStatus: "pending"
    },
    {
      id: 5,
      deviceId: "DEV-2024-005",
      studentName: "Sophia Martinez",
      studentId: "STU-2024-1005",
      studentEmail: "sophia.martinez@university.edu",
      studentPhone: "+1 (555) 567-8901",
      studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1194a8e94-1763301813569.png",
      studentPhotoAlt: "Professional headshot of young woman with curly brown hair wearing red blazer with confident expression",
      deviceType: "Laptop",
      brand: "Apple",
      model: "MacBook Pro 14",
      serialNumber: "AP-MBP14-2024-005",
      color: "Space Gray",
      processor: "Apple M2 Pro",
      ram: "16GB Unified",
      department: "Arts",
      registrationDate: new Date('2024-09-25'),
      lastVerification: new Date('2025-12-17T07:50:00'),
      status: "active",
      totalScans: 189,
      lastLocation: "Main Gate",
      syncStatus: "synced"
    },
    {
      id: 6,
      deviceId: "DEV-2024-006",
      studentName: "David Kim",
      studentId: "STU-2024-1006",
      studentEmail: "david.kim@university.edu",
      studentPhone: "+1 (555) 678-9012",
      studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe8a4833-1763295664840.png",
      studentPhotoAlt: "Professional headshot of Asian man with neat black hair wearing charcoal suit with friendly smile",
      deviceType: "Laptop",
      brand: "Asus",
      model: "ROG Zephyrus G14",
      serialNumber: "AS-ROGG14-2024-006",
      color: "White",
      processor: "AMD Ryzen 9 6900HS",
      ram: "32GB DDR5",
      department: "Engineering",
      registrationDate: new Date('2024-09-28'),
      lastVerification: new Date('2025-12-10T11:30:00'),
      status: "lost",
      totalScans: 98,
      lastLocation: "Sports Complex",
      syncStatus: "synced"
    },
    {
      id: 7,
      deviceId: "DEV-2024-007",
      studentName: "Olivia Brown",
      studentId: "STU-2024-1007",
      studentEmail: "olivia.brown@university.edu",
      studentPhone: "+1 (555) 789-0123",
      studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1908ed01a-1763297596119.png",
      studentPhotoAlt: "Professional headshot of woman with blonde hair in elegant bun wearing cream colored blazer",
      deviceType: "Tablet",
      brand: "Apple",
      model: "iPad Pro 12.9",
      serialNumber: "AP-IPADPRO-2024-007",
      color: "Silver",
      processor: "Apple M2",
      ram: "8GB Unified",
      department: "Arts",
      registrationDate: new Date('2024-10-01'),
      lastVerification: new Date('2025-12-17T10:05:00'),
      status: "active",
      totalScans: 167,
      lastLocation: "Library Entrance",
      syncStatus: "synced"
    },
    {
      id: 8,
      deviceId: "DEV-2024-008",
      studentName: "Ethan Taylor",
      studentId: "STU-2024-1008",
      studentEmail: "ethan.taylor@university.edu",
      studentPhone: "+1 (555) 890-1234",
      studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1219eacec-1763294869102.png",
      studentPhotoAlt: "Professional headshot of young man with brown hair wearing casual blue shirt with relaxed demeanor",
      deviceType: "Laptop",
      brand: "Microsoft",
      model: "Surface Laptop 5",
      serialNumber: "MS-SL5-2024-008",
      color: "Platinum",
      processor: "Intel Core i7-1255U",
      ram: "16GB LPDDR5",
      department: "Business",
      registrationDate: new Date('2024-10-05'),
      lastVerification: new Date('2025-12-05T09:40:00'),
      status: "stolen",
      totalScans: 76,
      lastLocation: "Parking Lot B",
      syncStatus: "synced"
    },
    {
      id: 9,
      deviceId: "DEV-2024-009",
      studentName: "Ava Anderson",
      studentId: "STU-2024-1009",
      studentEmail: "ava.anderson@university.edu",
      studentPhone: "+1 (555) 901-2345",
      studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee564002-1763294447537.png",
      studentPhotoAlt: "Professional headshot of woman with red hair wearing green blazer with bright smile",
      deviceType: "Laptop",
      brand: "Acer",
      model: "Swift 3",
      serialNumber: "AC-SW3-2024-009",
      color: "Silver",
      processor: "Intel Core i5-1240P",
      ram: "8GB LPDDR4X",
      department: "Sciences",
      registrationDate: new Date('2024-10-08'),
      lastVerification: new Date('2025-12-17T08:15:00'),
      status: "active",
      totalScans: 134,
      lastLocation: "Science Building",
      syncStatus: "synced"
    },
    {
      id: 10,
      deviceId: "DEV-2024-010",
      studentName: "Noah Garcia",
      studentId: "STU-2024-1010",
      studentEmail: "noah.garcia@university.edu",
      studentPhone: "+1 (555) 012-3456",
      studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_17d627986-1763298853387.png",
      studentPhotoAlt: "Professional headshot of Hispanic man with short dark hair wearing black suit with confident expression",
      deviceType: "Laptop",
      brand: "HP",
      model: "Envy 13",
      serialNumber: "HP-ENV13-2024-010",
      color: "Natural Silver",
      processor: "Intel Core i7-1165G7",
      ram: "16GB DDR4",
      department: "Engineering",
      registrationDate: new Date('2024-10-12'),
      lastVerification: new Date('2025-12-17T09:30:00'),
      status: "active",
      totalScans: 145,
      lastLocation: "East Gate",
      syncStatus: "synced"
    }];


    setDevices(mockDevices);
    setFilteredDevices(mockDevices);
  }, []);

  const statistics = {
    total: devices?.length,
    active: devices?.filter((d) => d?.status === 'active')?.length,
    inactive: devices?.filter((d) => d?.status === 'inactive')?.length,
    lost: devices?.filter((d) => d?.status === 'lost')?.length,
    stolen: devices?.filter((d) => d?.status === 'stolen')?.length,
    synced: devices?.filter((d) => d?.syncStatus === 'synced')?.length
  };

  const handleSearch = (query) => {
    if (!query?.trim()) {
      setFilteredDevices(devices);
      return;
    }

    const lowercaseQuery = query?.toLowerCase();
    let filtered = devices?.filter((device) =>
    device?.deviceId?.toLowerCase()?.includes(lowercaseQuery) ||
    device?.serialNumber?.toLowerCase()?.includes(lowercaseQuery) ||
    device?.studentName?.toLowerCase()?.includes(lowercaseQuery) ||
    device?.studentId?.toLowerCase()?.includes(lowercaseQuery)
    );
    setFilteredDevices(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...devices];

    if (filters?.deviceType) {
      filtered = filtered?.filter((d) => d?.deviceType?.toLowerCase() === filters?.deviceType?.toLowerCase());
    }
    if (filters?.status) {
      filtered = filtered?.filter((d) => d?.status === filters?.status);
    }
    if (filters?.department) {
      filtered = filtered?.filter((d) => d?.department === filters?.department);
    }
    if (filters?.dateFrom) {
      filtered = filtered?.filter((d) => new Date(d.registrationDate) >= new Date(filters.dateFrom));
    }
    if (filters?.dateTo) {
      filtered = filtered?.filter((d) => new Date(d.registrationDate) <= new Date(filters.dateTo));
    }

    setFilteredDevices(filtered);
    setCurrentPage(1);
  };

  const handleSavePreset = (preset) => {
    setSavedPresets([...savedPresets, preset]);
  };

  const handleSelectDevice = (deviceId, isSelected) => {
    if (isSelected) {
      setSelectedDevices([...selectedDevices, deviceId]);
    } else {
      setSelectedDevices(selectedDevices?.filter((id) => id !== deviceId));
    }
  };

  const handleSelectAll = () => {
    const currentPageDevices = getCurrentPageDevices();
    const currentPageIds = currentPageDevices?.map((d) => d?.id);
    setSelectedDevices([...new Set([...selectedDevices, ...currentPageIds])]);
  };

  const handleDeselectAll = () => {
    setSelectedDevices([]);
  };

  const handleBulkStatusChange = (newStatus) => {
    const updatedDevices = devices?.map((device) =>
    selectedDevices?.includes(device?.id) ? { ...device, status: newStatus } : device
    );
    setDevices(updatedDevices);
    setFilteredDevices(updatedDevices);
    setSelectedDevices([]);
  };

  const handleBulkDepartmentTransfer = () => {
    alert('Department transfer functionality would open a modal to select new department');
  };

  const handleBulkExport = (type) => {
    if (type === 'selected') {
      alert(`Exporting ${selectedDevices?.length} selected devices`);
    } else {
      alert(`Exporting all ${Math.min(filteredDevices?.length, 1000)} devices`);
    }
  };

  const handleEditDevice = (device) => {
    setEditingDevice(device);
  };

  const handleSaveDevice = (updatedDevice) => {
    const updatedDevices = devices?.map((d) =>
    d?.id === updatedDevice?.id ? updatedDevice : d
    );
    setDevices(updatedDevices);
    setFilteredDevices(updatedDevices);
  };

  const handleViewHistory = (device) => {
    setViewingHistory(device);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredDevices]?.sort((a, b) => {
      if (a?.[key] < b?.[key]) return direction === 'asc' ? -1 : 1;
      if (a?.[key] > b?.[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredDevices(sorted);
  };

  const getCurrentPageDevices = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredDevices?.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredDevices?.length / itemsPerPage);

  return (
    <>
      <Helmet>
        <title>Device Management Console - Smart PC Tracker</title>
        <meta name="description" content="Comprehensive device lifecycle management interface for administrators to maintain accurate device records and monitor campus security assets" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <RoleBasedSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />


        <div className={`transition-all duration-200 ${isSidebarCollapsed ? 'lg:ml-sidebar-collapsed' : 'lg:ml-sidebar-width'}`}>
          <header className="sticky top-0 z-30 bg-card border-b border-border">
            <div className="flex items-center justify-between px-4 lg:px-6 py-4">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Device Management Console</h1>
                <p className="text-sm text-muted-foreground mt-1">Comprehensive device lifecycle management and monitoring</p>
              </div>
              <div className="flex items-center gap-2">
                <QuickActions context="management" />
                <NotificationCenter />
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-6 space-y-6">
            <StatisticsCards stats={statistics} />

            <AdvancedSearchToolbar
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onSavePreset={handleSavePreset}
              savedPresets={savedPresets} />


            <BulkOperationsToolbar
              selectedCount={selectedDevices?.length}
              onBulkStatusChange={handleBulkStatusChange}
              onBulkDepartmentTransfer={handleBulkDepartmentTransfer}
              onBulkExport={handleBulkExport}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll} />


            <div className="bg-card border border-border rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedDevices?.length === getCurrentPageDevices()?.length && getCurrentPageDevices()?.length > 0}
                          onChange={(e) => e?.target?.checked ? handleSelectAll() : handleDeselectAll()}
                          className="w-4 h-4 rounded border-border text-accent focus:ring-2 focus:ring-accent focus:ring-offset-0"
                          aria-label="Select all devices on page" />

                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Details
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors duration-200" onClick={() => handleSort('deviceId')}>
                        <div className="flex items-center gap-1">
                          Device ID
                          <Icon name={sortConfig?.key === 'deviceId' ? sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown' : 'ChevronsUpDown'} size={14} />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors duration-200" onClick={() => handleSort('studentName')}>
                        <div className="flex items-center gap-1">
                          Student Owner
                          <Icon name={sortConfig?.key === 'studentName' ? sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown' : 'ChevronsUpDown'} size={14} />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Device Info
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors duration-200" onClick={() => handleSort('registrationDate')}>
                        <div className="flex items-center gap-1">
                          Registration
                          <Icon name={sortConfig?.key === 'registrationDate' ? sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown' : 'ChevronsUpDown'} size={14} />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors duration-200" onClick={() => handleSort('lastVerification')}>
                        <div className="flex items-center gap-1">
                          Last Verification
                          <Icon name={sortConfig?.key === 'lastVerification' ? sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown' : 'ChevronsUpDown'} size={14} />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentPageDevices()?.map((device) =>
                    <DeviceTableRow
                      key={device?.id}
                      device={device}
                      onEdit={handleEditDevice}
                      onViewHistory={handleViewHistory}
                      onStatusChange={handleEditDevice}
                      isSelected={selectedDevices?.includes(device?.id)}
                      onSelect={handleSelectDevice} />

                    )}
                  </tbody>
                </table>
              </div>

              {filteredDevices?.length === 0 &&
              <div className="flex flex-col items-center justify-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground opacity-50 mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">No devices found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              }

              {filteredDevices?.length > 0 &&
              <div className="flex items-center justify-between px-4 py-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredDevices?.length)} of {filteredDevices?.length} devices
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    iconName="ChevronLeft">

                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-md text-sm font-medium transition-colors duration-200 ${
                          currentPage === pageNum ?
                          'bg-accent text-accent-foreground' :
                          'text-muted-foreground hover:bg-muted hover:text-foreground'}`
                          }>

                            {pageNum}
                          </button>);

                    })}
                    </div>
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    iconName="ChevronRight"
                    iconPosition="right">

                      Next
                    </Button>
                  </div>
                </div>
              }
            </div>
          </main>
        </div>
      </div>
      <DeviceEditModal
        device={editingDevice}
        isOpen={!!editingDevice}
        onClose={() => setEditingDevice(null)}
        onSave={handleSaveDevice} />

      <DeviceHistoryModal
        device={viewingHistory}
        isOpen={!!viewingHistory}
        onClose={() => setViewingHistory(null)} />

    </>);

};

export default DeviceManagementConsole;