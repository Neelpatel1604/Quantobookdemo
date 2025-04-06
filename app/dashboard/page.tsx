import Widgets from '@/components/dashboard/Widgets';
import ChartComponent from '@/components/dashboard/ChartComponent';
import DiscrepancyPortal from '@/components/dashboard/DiscrepancyPortal';

export const metadata = {
  title: 'Dashboard | QuantoBooks',
  description: 'Financial insights and discrepancy management for QuantoBooks',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financial Dashboard</h1>
        <div className="text-sm text-gray-500">Last updated: Today at 9:43 AM</div>
      </div>
      
      <Widgets />
      <ChartComponent />
      <DiscrepancyPortal />
    </div>
  );
} 