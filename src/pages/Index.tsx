
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PatientCard from '@/components/PatientCard';
import PatientStoryRing from '@/components/PatientStoryRing';

const Index = () => {
  // Mock patient data
  const patients = [
    {
      id: "1",
      name: "Maheshwari S.",
      age: 63,
      sex: "F",
      stage: "POD-3",
      stageColor: "bg-orange-500",
      lastUpdate: "2 hours ago",
      updateCount: 3,
      hasUpdates: true,
      avatar: "/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png"
    },
    {
      id: "2", 
      name: "Rajesh Kumar",
      age: 45,
      sex: "M",
      stage: "Pre-Op",
      stageColor: "bg-blue-500",
      lastUpdate: "1 hour ago",
      updateCount: 1,
      hasUpdates: true,
      avatar: "/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png"
    },
    {
      id: "3",
      name: "Priya Sharma",
      age: 34,
      sex: "F", 
      stage: "Post-Op",
      stageColor: "bg-green-500",
      lastUpdate: "30 mins ago",
      updateCount: 2,
      hasUpdates: true,
      avatar: "/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png"
    },
    {
      id: "4",
      name: "Amit Patel",
      age: 52,
      sex: "M",
      stage: "ICU",
      stageColor: "bg-red-500",
      lastUpdate: "5 mins ago",
      updateCount: 5,
      hasUpdates: true,
      avatar: "/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png"
    },
    {
      id: "5",
      name: "Sunita Devi",
      age: 58,
      sex: "F",
      stage: "Ward",
      stageColor: "bg-purple-500", 
      lastUpdate: "1 day ago",
      updateCount: 0,
      hasUpdates: false,
      avatar: "/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search patients..."
                className="pl-10 w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Patient
            </Button>
          </div>
        </div>
      </div>

      {/* Patient Stories - Instagram Style */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="flex-shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
                <span className="text-xs text-gray-600">Add Story</span>
              </div>
            </div>
            
            {patients.map((patient) => (
              <PatientStoryRing
                key={patient.id}
                patient={patient}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Patient Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {patients.map((patient) => (
            <Link key={patient.id} to={`/patients/${patient.id}`}>
              <PatientCard patient={patient} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
