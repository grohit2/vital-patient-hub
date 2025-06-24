
import React from 'react';
import { Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface CareTeamProps {
  patientId: string;
}

const CareTeam: React.FC<CareTeamProps> = ({ patientId }) => {
  const teamMembers = [
    {
      role: 'Primary Surgeon',
      name: 'Dr. Giri S.',
      avatar: '/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png',
      initials: 'GS',
      department: 'Surgery',
      contact: '+91-9876543210'
    },
    {
      role: 'Resident',
      name: 'Dr. Sharma R.',
      avatar: '/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png',
      initials: 'SR',
      department: 'Surgery',
      contact: '+91-9876543211'
    },
    {
      role: 'Primary Nurse',
      name: 'RN Lakshmi P.',
      avatar: '/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png',
      initials: 'LP',
      department: 'Ward 3A',
      contact: '+91-9876543212'
    },
    {
      role: 'Physiotherapist',
      name: 'PT Rajesh K.',
      avatar: '/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png',
      initials: 'RK',
      department: 'Rehab',
      contact: '+91-9876543213'
    }
  ];

  return (
    <div className="space-y-4">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={member.avatar} />
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-gray-900">{member.name}</h4>
              <Badge variant="outline" className="text-xs">
                {member.role}
              </Badge>
            </div>
            <div className="text-sm text-gray-600">
              {member.department}
            </div>
          </div>
          
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        variant="outline"
        className="w-full justify-center gap-2 text-gray-600 hover:text-gray-900 border-dashed"
      >
        <Plus className="h-4 w-4" />
        Add Team Member
      </Button>
    </div>
  );
};

export default CareTeam;
