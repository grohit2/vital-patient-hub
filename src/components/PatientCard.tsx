
import React from 'react';
import { Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age: number;
    sex: string;
    stage: string;
    stageColor: string;
    lastUpdate: string;
    updateCount: number;
    hasUpdates: boolean;
    avatar: string;
  };
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white">
      <CardContent className="p-3 md:p-4">
        {/* Color indicator strip */}
        <div className={`h-1 -mx-3 md:-mx-4 -mt-3 md:-mt-4 mb-3 md:mb-4 ${patient.stageColor} rounded-t-lg`} />
        
        <div className="space-y-3">
          {/* Header with name and stage */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate text-sm md:text-base">
                {patient.name}
              </h3>
              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600 mt-1">
                <User className="h-3 w-3" />
                <span>{patient.sex}, {patient.age}y</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Update count badge */}
              {patient.hasUpdates && patient.updateCount > 0 && (
                <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {patient.updateCount}
                </div>
              )}
              
              <Badge 
                className={`${patient.stageColor} text-white text-xs font-medium`}
              >
                {patient.stage}
              </Badge>
            </div>
          </div>
          
          {/* Last update */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>Updated {patient.lastUpdate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
