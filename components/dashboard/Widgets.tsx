'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useWidgets from '@/hooks/useWidgets';

export default function Widgets() {
  const { data, loading } = useWidgets();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${data.revenue}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${data.expenses}</p>
        </CardContent>
      </Card>
    </div>
  );
} 