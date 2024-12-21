'use client'

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from 'recharts';

interface ChartProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

export function Chart({ data }: ChartProps) {
  // Aggregate and transform data into the format Recharts expects
  const aggregatedData = Object.entries(
    data.reduce((acc, item) => {
      const date = item.date;
      acc[date] = (acc[date] || 0) + item.revenue;
      return acc;
    }, {} as Record<string, number>)
  ).map(([date, revenue]) => ({
    date,
    revenue: Number(revenue.toFixed(2)) // Format to 2 decimal places
  }));

  // Sort data by date
  const sortedData = [...aggregatedData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Calculate the domain for YAxis
  const maxRevenue = Math.max(...sortedData.map(item => item.revenue));
  const yAxisDomain = [0, Math.ceil(maxRevenue * 1.1)]; // Add 10% padding

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={sortedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(date) => {
            return new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });
          }}
        />
        <YAxis 
          domain={yAxisDomain}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip 
          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
          labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ fill: '#8884d8', r: 4 }}
          activeDot={{ r: 8 }}
          name="Revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}