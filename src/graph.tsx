// NumberGraph.tsx
import React, { FC, useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

interface NumberGraphProps {
  numbers: number[];
}

const NumberGraph: FC<NumberGraphProps> = ({ numbers }) => {
  // Transform the numbers array into a format suitable for react-google-charts
  const chartData = [['Index', 'Number'], ...numbers.map((num, index) => [index, num])];

  const [isRefresh, setIsRefresh] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsRefresh(!isRefresh)
    }, 1000)

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData}
        options={{
          title: 'Number Graph',
          hAxis: {
            title: 'Index',
          },
          vAxis: {
            title: 'Number',
          },
        }}
      />
    </div>
  );
};

export default NumberGraph;
