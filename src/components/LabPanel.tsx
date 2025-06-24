
import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LabPanelProps {
  patientId: string;
}

interface LabResult {
  parameter: string;
  latest: number;
  trend: number[];
  units: string;
  normal: string;
  isAbnormal: boolean;
  trendDirection: 'up' | 'down' | 'stable';
}

const LabPanel: React.FC<LabPanelProps> = ({ patientId }) => {
  const labResults: LabResult[] = [
    {
      parameter: 'Hb',
      latest: 8.2,
      trend: [7.9, 8.0, 8.2],
      units: 'g/dL',
      normal: '12-15',
      isAbnormal: true,
      trendDirection: 'up'
    },
    {
      parameter: 'WBC',
      latest: 12.5,
      trend: [15.2, 13.8, 12.5],
      units: '×10³/μL',
      normal: '4-11',
      isAbnormal: true,
      trendDirection: 'down'
    },
    {
      parameter: 'Platelets',
      latest: 180,
      trend: [165, 175, 180],
      units: '×10³/μL',
      normal: '150-450',
      isAbnormal: false,
      trendDirection: 'up'
    },
    {
      parameter: 'Cr',
      latest: 1.8,
      trend: [2.1, 1.9, 1.8],
      units: 'mg/dL',
      normal: '0.6-1.2',
      isAbnormal: true,
      trendDirection: 'down'
    },
    {
      parameter: 'K⁺',
      latest: 3.8,
      trend: [3.5, 3.7, 3.8],
      units: 'mmol/L',
      normal: '3.5-5.0',
      isAbnormal: false,
      trendDirection: 'up'
    },
    {
      parameter: 'RBS',
      latest: 145,
      trend: [160, 152, 145],
      units: 'mg/dL',
      normal: '<140',
      isAbnormal: true,
      trendDirection: 'down'
    }
  ];

  const renderSparkline = (trend: number[]) => {
    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min;
    
    return (
      <svg width="60" height="20" className="inline-block">
        {trend.map((value, index) => {
          const x = (index / (trend.length - 1)) * 50 + 5;
          const y = range > 0 ? 15 - ((value - min) / range) * 10 : 10;
          
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill={index === trend.length - 1 ? "#3B82F6" : "#9CA3AF"}
            />
          );
        })}
        {trend.map((value, index) => {
          if (index === 0) return null;
          
          const x1 = ((index - 1) / (trend.length - 1)) * 50 + 5;
          const y1 = range > 0 ? 15 - ((trend[index - 1] - min) / range) * 10 : 10;
          const x2 = (index / (trend.length - 1)) * 50 + 5;
          const y2 = range > 0 ? 15 - ((value - min) / range) * 10 : 10;
          
          return (
            <line
              key={`line-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#9CA3AF"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-3">
      {labResults.map((lab, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-3 rounded-lg border ${
            lab.isAbnormal ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="font-medium text-gray-900">{lab.parameter}</div>
            {lab.isAbnormal && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className={`font-bold ${
                lab.isAbnormal ? 'text-red-600' : 'text-gray-900'
              }`}>
                {lab.latest} {lab.units}
              </div>
              <div className="text-xs text-gray-500">
                Normal: {lab.normal}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {renderSparkline(lab.trend)}
              {lab.trendDirection === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : lab.trendDirection === 'down' ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <div className="w-4 h-4" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LabPanel;
