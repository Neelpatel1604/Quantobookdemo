'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Discrepancy {
  id: number;
  date: string;
  amount: number;
  status: 'Pending' | 'Resolved' | 'Under Review';
}

export default function DiscrepancyPortal() {
  // Placeholder data (would be fetched from API in a real app)
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([
    { id: 1, date: '2023-04-01', amount: 150.75, status: 'Pending' },
    { id: 2, date: '2023-04-02', amount: 75.50, status: 'Resolved' },
    { id: 3, date: '2023-04-05', amount: 210.25, status: 'Under Review' },
  ]);

  const resolveDiscrepancy = (id: number) => {
    setDiscrepancies(discrepancies.map(d => 
      d.id === id ? { ...d, status: 'Resolved' } : d
    ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Discrepancy Portal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {discrepancies.map((d) => (
                <tr key={d.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{d.date}</td>
                  <td className="p-2">{formatCurrency(d.amount)}</td>
                  <td className="p-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      d.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      d.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="p-2">
                    {d.status !== 'Resolved' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => resolveDiscrepancy(d.id)}
                      >
                        Resolve
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 