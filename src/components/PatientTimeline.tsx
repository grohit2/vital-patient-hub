
import React from 'react';

interface TimelineSegment {
  label: string;
  start: string;
  end: string;
  color: string;
}

interface PatientTimelineProps {
  segments: TimelineSegment[];
}

const PatientTimeline: React.FC<PatientTimelineProps> = ({ segments }) => {
  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = end === 'now' ? new Date() : new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
      {segments.map((segment, index) => {
        const duration = calculateDuration(segment.start, segment.end);
        const isLast = index === segments.length - 1;
        
        return (
          <React.Fragment key={index}>
            <div 
              className="relative group"
              style={{ backgroundColor: segment.color }}
            >
              <div className="px-3 py-2 rounded-lg text-white text-sm font-medium">
                {segment.label}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {new Date(segment.start).toLocaleDateString()} - {segment.end === 'now' ? 'Now' : new Date(segment.end).toLocaleDateString()}
                <br />
                {duration} day{duration !== 1 ? 's' : ''}
              </div>
            </div>
            
            {!isLast && (
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-gray-300"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PatientTimeline;
