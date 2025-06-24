
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
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
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-xl font-bold text-gray-900">Patients</h1>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
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
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Patient Stories - Mobile Optimized */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex-shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <Plus className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
                </div>
                <span className="text-xs text-gray-600">Add</span>
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

      {/* Mobile Search */}
      <div className="md:hidden bg-white px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search patients..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Patient Cards - Mobile Optimized */}
      <div className="px-4 py-4 md:px-6 md:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
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
