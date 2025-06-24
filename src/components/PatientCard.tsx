
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
      <CardContent className="p-4">
        {/* Color indicator strip */}
        <div className={`h-1 -mx-4 -mt-4 mb-4 ${patient.stageColor} rounded-t-lg`} />
        
        <div className="flex items-start gap-3">
          {/* Avatar with update ring */}
          <div className="relative flex-shrink-0">
            <div className={`w-12 h-12 rounded-full p-0.5 ${
              patient.hasUpdates 
                ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' 
                : 'bg-gray-200'
            }`}>
              <img
                src={patient.avatar}
                alt={patient.name}
                className="w-full h-full rounded-full object-cover bg-white p-0.5"
              />
            </div>
            
            {/* Update count badge */}
            {patient.hasUpdates && patient.updateCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {patient.updateCount}
              </div>
            )}
          </div>
          
          {/* Patient info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 truncate">
                {patient.name}
              </h3>
              <Badge 
                className={`${patient.stageColor} text-white text-xs font-medium`}
              >
                {patient.stage}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
              <User className="h-3 w-3" />
              <span>{patient.sex}, {patient.age}y</span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Updated {patient.lastUpdate}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
