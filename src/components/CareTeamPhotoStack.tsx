
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeamMember {
  role: string;
  name: string;
  avatar: string;
  initials: string;
  department: string;
  contact: string;
}

interface CareTeamPhotoStackProps {
  teamMembers: TeamMember[];
  onDetailsClick: () => void;
}

const CareTeamPhotoStack: React.FC<CareTeamPhotoStackProps> = ({ teamMembers, onDetailsClick }) => {
  const displayMembers = teamMembers.slice(0, 3);
  const remainingCount = teamMembers.length - 3;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {displayMembers.map((member, index) => (
          <Avatar 
            key={index} 
            className={`h-8 w-8 border-2 border-white ${index > 0 ? '-ml-2' : ''}`}
            style={{ zIndex: displayMembers.length - index }}
          >
            <AvatarImage src={member.avatar} />
            <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
          </Avatar>
        ))}
        {remainingCount > 0 && (
          <div className="h-8 w-8 -ml-2 bg-gray-600 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs font-medium">+{remainingCount}</span>
          </div>
        )}
      </div>
      
      <button 
        onClick={onDetailsClick}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <MoreHorizontal className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  );
};

export default CareTeamPhotoStack;
