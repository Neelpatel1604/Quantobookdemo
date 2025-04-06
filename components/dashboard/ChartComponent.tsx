'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useChartData from '@/hooks/useChartData';
import { formatCurrency } from '@/lib/utils';
import { BarChart3, TrendingUp, CircleDollarSign, ArrowUpCircle } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  LineElement, 
  PointElement, 
  LinearScale, 
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const metricConfig = {
  revenue: {
    title: 'Revenue Trends',
    icon: <CircleDollarSign size={18} className="text-blue-500" />,
    color: 'bg-blue-500'
  },
  expenses: {
    title: 'Expense Trends',
    icon: <TrendingUp size={18} className="text-red-500" />,
    color: 'bg-red-500'
  },
  profit: {
    title: 'Profit Trends',
    icon: <ArrowUpCircle size={18} className="text-green-500" />,
    color: 'bg-green-500'
  }
};

export default function ChartComponent() {
  const { 
    data, 
    loading, 
    selectedMetric,
    setSelectedMetric,
    timeRange,
    setTimeRange
  } = useChartData();
  
  const currentMetric = metricConfig[selectedMetric];
  
  // Calculate summary statistics
  const calculateSummary = () => {
    if (!data || !data.datasets || data.datasets.length === 0) return null;
    
    const values = data.datasets[0].data;
    if (values.length === 0) return null;
    
    const current = values[values.length - 1];
    const previous = values.length > 1 ? values[values.length - 2] : 0;
    const percentChange = previous ? ((current - previous) / previous) * 100 : 0;
    
    return {
      current,
      percentChange
    };
  };
  
  const summary = calculateSummary();

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-2 ${currentMetric.color.replace('500', '100')}`}>
            {currentMetric.icon}
          </div>
          <CardTitle>{currentMetric.title}</CardTitle>
        </div>
        
        <div className="flex gap-2">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <Button 
              size="sm"
              variant={timeRange === 'month' ? 'default' : 'ghost'}
              className="text-xs h-7 px-3"
              onClick={() => setTimeRange('month')}
            >
              3M
            </Button>
            <Button 
              size="sm"
              variant={timeRange === 'quarter' ? 'default' : 'ghost'}
              className="text-xs h-7 px-3"
              onClick={() => setTimeRange('quarter')}
            >
              6M
            </Button>
            <Button 
              size="sm"
              variant={timeRange === 'year' ? 'default' : 'ghost'}
              className="text-xs h-7 px-3"
              onClick={() => setTimeRange('year')}
            >
              1Y
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button 
              size="sm"
              variant={selectedMetric === 'revenue' ? 'default' : 'outline'}
              className="flex items-center gap-1"
              onClick={() => setSelectedMetric('revenue')}
            >
              <CircleDollarSign size={16} />
              Revenue
            </Button>
            <Button 
              size="sm"
              variant={selectedMetric === 'expenses' ? 'default' : 'outline'}
              className="flex items-center gap-1"
              onClick={() => setSelectedMetric('expenses')}
            >
              <TrendingUp size={16} />
              Expenses
            </Button>
            <Button 
              size="sm"
              variant={selectedMetric === 'profit' ? 'default' : 'outline'}
              className="flex items-center gap-1"
              onClick={() => setSelectedMetric('profit')}
            >
              <ArrowUpCircle size={16} />
              Profit
            </Button>
          </div>
          
          {summary && (
            <div className="flex items-center">
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {formatCurrency(summary.current)}
                </div>
                <div className={`text-sm flex items-center ${
                  summary.percentChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {summary.percentChange >= 0 ? '↑' : '↓'} {Math.abs(summary.percentChange).toFixed(1)}%
                  <span className="text-gray-500 ml-1">vs previous</span>
                </div>
              </div>
            </div>
          )}
        </div>
          
        <div className="h-80">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <BarChart3 size={48} className="text-gray-300 mb-2" />
                <div className="text-gray-400">Loading chart data...</div>
              </div>
            </div>
          ) : (
            <Line 
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                          label += ': ';
                        }
                        if (context.parsed.y !== null) {
                          label += formatCurrency(context.parsed.y);
                        }
                        return label;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => formatCurrency(value as number)
                    }
                  }
                }
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
} 