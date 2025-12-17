import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import NotificationCenter from '../../components/ui/NotificationCenter';
import QuickActions from '../../components/ui/QuickActions';
import MetricCard from './components/MetricCard';
import LiveScanningFeed from './components/LiveScanningFeed';
import AlertPanel from './components/AlertPanel';
import SystemHealthWidget from './components/SystemHealthWidget';
import PerformanceChart from './components/PerformanceChart';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RealTimeMonitoringDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const keyMetrics = [
    {
      title: 'Active Scans/Hour',
      value: '247',
      unit: 'scans',
      trend: 'up',
      trendValue: '+12%',
      icon: 'Scan',
      status: 'success'
    },
    {
      title: 'System Uptime',
      value: '99.8',
      unit: '%',
      trend: 'neutral',
      trendValue: '0%',
      icon: 'Activity',
      status: 'success'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      unit: 'items',
      trend: 'down',
      trendValue: '-5%',
      icon: 'Clock',
      status: 'warning'
    },
    {
      title: 'Active Alerts',
      value: '4',
      unit: 'alerts',
      trend: 'up',
      trendValue: '+2',
      icon: 'AlertTriangle',
      status: 'error'
    }
  ];

  const handleExportReport = () => {
    console.log('Exporting monitoring report...');
  };

  const handleRefreshDashboard = () => {
    console.log('Refreshing dashboard data...');
  };

  return (
    <>
      <Helmet>
        <title>Real-time Monitoring Dashboard - Smart PC Tracker</title>
        <meta
          name="description"
          content="Comprehensive operational command center for campus security monitoring with live scanning activity, system health indicators, and performance metrics"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <RoleBasedSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <div
          className={`transition-all duration-200 ${
            isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
          }`}
        >
          <header className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Real-time Monitoring</h1>
                  <p className="text-sm text-muted-foreground">
                    {currentTime?.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}{' '}
                    | {currentTime?.toLocaleTimeString('en-US')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <QuickActions context="management" />
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={handleRefreshDashboard}
                >
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  onClick={handleExportReport}
                >
                  Export
                </Button>
                <NotificationCenter />
              </div>
            </div>
          </header>

          <main className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-success/10 text-success text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span>All Systems Operational</span>
                </div>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    autoRefresh
                      ? 'bg-accent/10 text-accent' :'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon name={autoRefresh ? 'Pause' : 'Play'} size={16} />
                  <span>Auto-refresh {autoRefresh ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDashboardLayout('default')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    dashboardLayout === 'default' ?'bg-accent text-accent-foreground' :'text-muted-foreground hover:bg-muted'
                  }`}
                  title="Default Layout"
                >
                  <Icon name="LayoutGrid" size={20} />
                </button>
                <button
                  onClick={() => setDashboardLayout('compact')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    dashboardLayout === 'compact' ?'bg-accent text-accent-foreground' :'text-muted-foreground hover:bg-muted'
                  }`}
                  title="Compact Layout"
                >
                  <Icon name="LayoutList" size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyMetrics?.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <LiveScanningFeed />
                <PerformanceChart />
              </div>

              <div className="space-y-6">
                <AlertPanel />
                <SystemHealthWidget />
              </div>
            </div>

            <div className="card-elevated bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Icon name="MapPin" size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Location Overview</h2>
                    <p className="text-sm text-muted-foreground">Scanner status by location</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Main Gate A', scans: 89, status: 'online' },
                  { name: 'Main Gate B', scans: 76, status: 'online' },
                  { name: 'Main Gate C', scans: 0, status: 'offline' },
                  { name: 'Library Entrance', scans: 54, status: 'online' },
                  { name: 'Engineering Block', scans: 43, status: 'online' },
                  { name: 'Student Center', scans: 38, status: 'online' }
                ]?.map((location, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-foreground">{location?.name}</h3>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          location?.status === 'online' ? 'bg-success' : 'bg-error'
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Scans today</span>
                      <span className="text-lg font-bold text-foreground data-text">
                        {location?.scans}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default RealTimeMonitoringDashboard;