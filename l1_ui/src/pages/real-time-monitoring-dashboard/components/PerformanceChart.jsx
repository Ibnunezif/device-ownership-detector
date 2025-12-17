import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('1h');
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const points = timeRange === '1h' ? 12 : timeRange === '6h' ? 24 : 48;
      const interval = timeRange === '1h' ? 5 : timeRange === '6h' ? 15 : 30;

      return Array.from({ length: points }, (_, i) => {
        const time = new Date(now - (points - i - 1) * interval * 60000);
        return {
          time: time?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          scans: Math.floor(Math.random() * 30) + 40,
          verifications: Math.floor(Math.random() * 25) + 35,
          alerts: Math.floor(Math.random() * 5) + 1
        };
      });
    };

    setData(generateData());

    const interval = setInterval(() => {
      setData(generateData());
    }, 30000);

    return () => clearInterval(interval);
  }, [timeRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-md shadow-modal p-3">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <span className="text-muted-foreground capitalize">{entry?.name}:</span>
              <span className="font-medium text-foreground data-text">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(14, 165, 233)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(14, 165, 233)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorVerifications" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(5, 150, 105)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(5, 150, 105)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis dataKey="time" stroke="rgb(148, 163, 184)" style={{ fontSize: '12px' }} />
            <YAxis stroke="rgb(148, 163, 184)" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="scans" stroke="rgb(14, 165, 233)" fill="url(#colorScans)" />
            <Area type="monotone" dataKey="verifications" stroke="rgb(5, 150, 105)" fill="url(#colorVerifications)" />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis dataKey="time" stroke="rgb(148, 163, 184)" style={{ fontSize: '12px' }} />
            <YAxis stroke="rgb(148, 163, 184)" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="scans" fill="rgb(14, 165, 233)" />
            <Bar dataKey="verifications" fill="rgb(5, 150, 105)" />
            <Bar dataKey="alerts" fill="rgb(220, 38, 38)" />
          </BarChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis dataKey="time" stroke="rgb(148, 163, 184)" style={{ fontSize: '12px' }} />
            <YAxis stroke="rgb(148, 163, 184)" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="scans" stroke="rgb(14, 165, 233)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="verifications" stroke="rgb(5, 150, 105)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="alerts" stroke="rgb(220, 38, 38)" strokeWidth={2} dot={false} />
          </LineChart>
        );
    }
  };

  return (
    <div className="card-elevated bg-card">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10 text-accent">
            <Icon name="TrendingUp" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Performance Metrics</h2>
            <p className="text-sm text-muted-foreground">Real-time activity trends</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted rounded-md p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200 ${
                chartType === 'line' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="TrendingUp" size={14} className="inline mr-1" />
              Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200 ${
                chartType === 'area' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Activity" size={14} className="inline mr-1" />
              Area
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200 ${
                chartType === 'bar' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="BarChart3" size={14} className="inline mr-1" />
              Bar
            </button>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-2 text-sm rounded-md border border-border bg-background text-foreground focus-ring"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
          </select>
        </div>
      </div>
      <div className="p-6">
        <div className="w-full h-80" aria-label="Performance metrics chart">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;