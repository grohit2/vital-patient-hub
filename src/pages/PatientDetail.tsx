
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, QrCode, User, Pill, FlaskConical, CheckSquare, Users, Menu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import PatientTimeline from '@/components/PatientTimeline';
import MedicationSheet from '@/components/MedicationSheet';
import LabPanel from '@/components/LabPanel';
import TaskBoard from '@/components/TaskBoard';
import CareTeam from '@/components/CareTeam';

const PatientDetail = () => {
  const { id } = useParams();
  
  // Mock patient data
  const patient = {
    id: id,
    name: "Maheshwari S.",
    age: 63,
    sex: "F",
    mrn: "MRN-2024-001234",
    stage: "POD-3",
    stageColor: "bg-orange-500",
    primaryDiagnosis: "Ray Amputation",
    comorbidities: ["HTN", "T2DM", "CAD"],
    currentStage: "POD-3",
    stageDays: 3,
    timeline: [
      { label: 'Surgery', start: '2025-06-18', end: '2025-06-18', color: '#E11D48' },
      { label: 'ICU', start: '2025-06-19', end: '2025-06-20', color: '#DC2626' },
      { label: 'Ward', start: '2025-06-21', end: 'now', color: '#4F46E5' }
    ]
  };

  const handleCopyMRN = () => {
    navigator.clipboard.writeText(patient.mrn);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          <Badge className={`${patient.stageColor} text-white px-3 py-1 text-sm font-semibold`}>
            {patient.stage}
          </Badge>
        </div>
        
        <div className="mt-3">
          <h1 className="text-xl font-bold text-gray-900">
            {patient.name}
          </h1>
          <p className="text-sm text-gray-600">{patient.sex} {patient.age} y • {patient.mrn}</p>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>All Patients</span>
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {patient.name} ({patient.sex} {patient.age} y)
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{patient.mrn}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyMRN}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <QrCode className="h-4 w-4" />
                    Bedside Chart
                  </Button>
                </div>
              </div>
            </div>
            <Badge className={`${patient.stageColor} text-white px-4 py-2 text-lg font-semibold`}>
              {patient.stage}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Diagnosis & Stage Block */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5" />
                    Diagnosis & Stage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Primary Diagnosis</label>
                    <Badge variant="outline" className="mt-1 px-3 py-1 text-base font-medium block w-fit">
                      {patient.primaryDiagnosis}
                    </Badge>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Comorbidities</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.comorbidities.map((condition, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Current Stage & Days</label>
                    <p className="text-lg font-semibold mt-1">
                      {patient.currentStage} ({patient.stageDays} days)
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-3 block">Timeline / History</label>
                    <PatientTimeline segments={patient.timeline} />
                  </div>
                </CardContent>
              </Card>

              {/* Medication Sheet */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Pill className="h-5 w-5" />
                    Medication Sheet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MedicationSheet patientId={patient.id} />
                </CardContent>
              </Card>

              {/* Lab Results - Mobile: move to right column on larger screens */}
              <Card className="lg:hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FlaskConical className="h-5 w-5" />
                    Lab Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LabPanel patientId={patient.id} />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Secondary Content */}
            <div className="space-y-4 md:space-y-6">
              {/* Tasks */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckSquare className="h-5 w-5" />
                    Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskBoard patientId={patient.id} />
                </CardContent>
              </Card>

              {/* Care Team */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5" />
                    Care Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CareTeam patientId={patient.id} />
                </CardContent>
              </Card>

              {/* Lab Results - Desktop only */}
              <Card className="hidden lg:block">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FlaskConical className="h-5 w-5" />
                    Lab Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LabPanel patientId={patient.id} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
