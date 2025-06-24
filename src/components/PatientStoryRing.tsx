
import React from 'react';
import { Link } from 'react-router-dom';

interface PatientStoryRingProps {
  patient: {
    id: string;
    name: string;
    hasUpdates: boolean;
    updateCount: number;
    avatar: string;
  };
}

const PatientStoryRing: React.FC<PatientStoryRingProps> = ({ patient }) => {
  const initials = patient.name.split(' ').map(n => n[0]).join('').substring(0, 2);
  
  return (
    <Link to={`/patients/${patient.id}`} className="flex-shrink-0">
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          {/* Story ring */}
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full p-0.5 ${
            patient.hasUpdates 
              ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' 
              : 'bg-gray-300'
          }`}>
            <div className="w-full h-full rounded-full bg-white p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-xs md:text-sm">
                {initials}
              </div>
            </div>
          </div>
          
          {/* Update count */}
          {patient.hasUpdates && patient.updateCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold">
              {patient.updateCount}
            </div>
          )}
        </div>
        
        <span className="text-xs text-gray-700 text-center max-w-12 md:max-w-16 truncate">
          {patient.name.split(' ')[0]}
        </span>
      </div>
    </Link>
  );
};

export default PatientStoryRing;
