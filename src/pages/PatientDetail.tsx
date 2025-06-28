
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, QrCode, User, Pill, Activity, CheckSquare, Users, Heart, Plus, ChevronDown, ChevronUp, MoreHorizontal, Check, X, AlertTriangle, Clock, Timer, Zap, Stethoscope, AlertCircle, Calendar, Download, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import CareTeamPhotoStack from '@/components/CareTeamPhotoStack';
import CareTeam from '@/components/CareTeam';

// Enhanced Medication Row Component
const MedicationRow = ({ medication, date, selectedTimes, onToggleTime, getMedicationTimeStatus, isToday }) => {
  const currentTime = new Date();
  
  return (
    <div className={`p-4 ${medication.changes ? 'bg-yellow-50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className={`w-3 h-3 rounded-full ${medication.color} mt-1 flex-shrink-0`}></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-gray-900 truncate">
                {medication.name} {medication.dose}
              </h3>
              {medication.changes && (
                <span className={`px-2 py-1 text-xs rounded font-medium ${
                  medication.changes === 'start_today' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {medication.changes === 'start_today' ? 'NEW' : 'STOP'}
                </span>
              )}
              {medication.priority === 'high' && (
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              )}
            </div>
            <div className="text-sm text-gray-600 mb-1">{medication.condition} • {medication.frequency}</div>
            {medication.notes && (
              <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">{medication.notes}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 ml-3">
          <span className={`px-2 py-1 text-xs rounded font-medium ${
            medication.route === 'IV' ? 'bg-red-100 text-red-800' :
            medication.route === 'PO' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {medication.route}
          </span>
          <span className={`px-2 py-1 text-xs rounded ${
            medication.category === 'antibiotic' ? 'bg-blue-100 text-blue-800' :
            medication.category === 'cardiac' ? 'bg-orange-100 text-orange-800' :
            medication.category === 'analgesic' ? 'bg-green-100 text-green-800' :
            medication.category === 'anticoagulant' ? 'bg-red-100 text-red-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {medication.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {medication.times.map(time => {
          const status = getMedicationTimeStatus(medication.id, time, date);
          let buttonClass = 'px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 border-2 transition-all';
          
          if (isToday) {
            const scheduleTime = new Date();
            const [hours, minutes] = time.split(':');
            scheduleTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            
            const isPast = currentTime > scheduleTime;
            const isUpcoming = !isPast && (scheduleTime - currentTime) < 2 * 60 * 60 * 1000;
            
            if (status === 'given') {
              buttonClass += ' bg-green-500 text-white border-green-500';
            } else if (status === 'missed') {
              buttonClass += ' bg-red-500 text-white border-red-500';
            } else if (isUpcoming) {
              buttonClass += ' bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-200';
            } else if (isPast && !status) {
              buttonClass += ' bg-red-100 text-red-800 border-red-300';
            } else {
              buttonClass += ' bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200';
            }
          } else {
            if (status === 'given') {
              buttonClass += ' bg-green-500 text-white border-green-500';
            } else if (status === 'missed') {
              buttonClass += ' bg-red-500 text-white border-red-500';
            } else {
              buttonClass += ' bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200';
            }
          }
          
          return (
            <button
              key={`${medication.id}-${time}`}
              onClick={() => onToggleTime(medication.id, time, date)}
              className={buttonClass}
            >
              {status === 'given' && <Check className="w-3 h-3" />}
              {status === 'missed' && <X className="w-3 h-3" />}
              {isToday && !status && (
                currentTime < new Date().setHours(...time.split(':'), 0, 0) &&
                (new Date().setHours(...time.split(':'), 0, 0) - currentTime) < 2 * 60 * 60 * 1000 &&
                <Timer className="w-3 h-3" />
              )}
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PatientDetail = () => {
  const { id } = useParams();
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);
  const [showCareTeamDetails, setShowCareTeamDetails] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState({});
  const [currentDate] = useState(new Date());
  
  // Mock patient data
  const patient = {
    id: id,
    name: "Maheshwari S.",
    age: 63,
    sex: "F",
    mrn: "MRN-2024-001234",
    stage: "POD-3",
    stageColor: "#E11D48",
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

  // Enhanced medications data with more clinical details
  const medications = [
    {
      id: 1,
      name: "Piperacillin-Tazobactam",
      dose: "4.5g",
      frequency: "q8h",
      route: "IV",
      startDate: new Date(2024, 5, 21),
      endDate: new Date(2024, 5, 25),
      condition: "Sepsis",
      color: "bg-blue-500",
      times: ["06:00", "14:00", "22:00"],
      priority: "high",
      notes: "Monitor for allergic reactions",
      changes: "stop_today",
      category: "antibiotic"
    },
    {
      id: 2,
      name: "Paracetamol",
      dose: "1g",
      frequency: "q6h PRN",
      route: "PO",
      startDate: new Date(2024, 5, 20),
      endDate: null,
      condition: "Pain management",
      color: "bg-green-500",
      times: ["06:00", "12:00", "18:00", "00:00"],
      priority: "medium",
      notes: "PRN for pain >4/10",
      category: "analgesic"
    },
    {
      id: 3,
      name: "Omeprazole",
      dose: "20mg",
      frequency: "q24h",
      route: "PO",
      startDate: new Date(2024, 5, 22),
      endDate: new Date(2024, 5, 30),
      condition: "GERD prophylaxis",
      color: "bg-purple-500",
      times: ["08:00"],
      priority: "low",
      notes: "Before breakfast",
      category: "gastric"
    },
    {
      id: 4,
      name: "Metoprolol",
      dose: "25mg",
      frequency: "q12h",
      route: "PO",
      startDate: new Date(2024, 5, 23),
      endDate: null,
      condition: "HTN",
      color: "bg-orange-500",
      times: ["08:00", "20:00"],
      priority: "high",
      notes: "Hold if SBP <100 or HR <60",
      changes: "start_today",
      category: "cardiac"
    },
    {
      id: 5,
      name: "Enoxaparin",
      dose: "40mg",
      frequency: "q24h",
      route: "SC",
      startDate: new Date(2024, 5, 24),
      endDate: null,
      condition: "DVT prophylaxis",
      color: "bg-red-500",
      times: ["20:00"],
      priority: "high",
      notes: "Monitor platelets",
      changes: "start_today",
      category: "anticoagulant"
    }
  ];

  const labData = [
    { parameter: "Hb", latest: "8.2", trend: [7.9, 8.0, 8.2], units: "g/dL", isAbnormal: true },
    { parameter: "WBC", latest: "12.5", trend: [11.2, 12.0, 12.5], units: "×10³/μL", isAbnormal: true },
    { parameter: "Platelets", latest: "250", trend: [240, 245, 250], units: "×10³/μL", isAbnormal: false },
    { parameter: "Cr", latest: "1.2", trend: [1.1, 1.15, 1.2], units: "mg/dL", isAbnormal: false }
  ];

  const tasks = {
    todo: [
      { id: 1, title: "Vac dressing change", due: "Today 2:00 PM", assignee: "RN Lakshmi" },
      { id: 2, title: "Blood work", due: "Tomorrow 6:00 AM", assignee: "Lab Tech" }
    ],
    inProgress: [
      { id: 3, title: "Physiotherapy session", due: "Today 11:00 AM", assignee: "PT Sarah" }
    ],
    done: [
      { id: 4, title: "Morning vitals", due: "Today 8:00 AM", assignee: "RN Priya" },
      { id: 5, title: "Medication review", due: "Yesterday", assignee: "Dr. Sharma" }
    ]
  };

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

  const handleCopyMRN = () => {
    navigator.clipboard.writeText(patient.mrn);
  };

  const getYesterday = () => {
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  };

  const isMedicationActiveOnDate = (medication, date) => {
    const medicationStart = new Date(medication.startDate);
    const medicationEnd = medication.endDate ? new Date(medication.endDate) : null;
    return date >= medicationStart && (!medicationEnd || date <= medicationEnd);
  };

  const toggleMedicationTime = (medicationId, time, date) => {
    const key = `${medicationId}-${date.toDateString()}-${time}`;
    setSelectedTimes(prev => ({
      ...prev,
      [key]: prev[key] === 'given' ? 'missed' : prev[key] === 'missed' ? undefined : 'given'
    }));
  };

  const getMedicationTimeStatus = (medicationId, time, date) => {
    const key = `${medicationId}-${date.toDateString()}-${time}`;
    return selectedTimes[key];
  };

  const getChangesToday = () => {
    return medications.filter(med => med.changes === 'start_today' || med.changes === 'stop_today');
  };

  const getPriorityMedications = () => {
    return medications.filter(med => 
      med.priority === 'high' && 
      isMedicationActiveOnDate(med, currentDate)
    );
  };

  const getUpcomingDoses = () => {
    const currentTime = new Date();
    const upcoming = [];
    
    medications
      .filter(med => isMedicationActiveOnDate(med, currentDate))
      .forEach(med => {
        med.times.forEach(time => {
          const scheduleTime = new Date();
          const [hours, minutes] = time.split(':');
          scheduleTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          
          const timeDiff = scheduleTime - currentTime;
          if (timeDiff > 0 && timeDiff < 2 * 60 * 60 * 1000) { // within 2 hours
            upcoming.push({
              medication: med,
              time: time,
              minutesUntil: Math.round(timeDiff / (1000 * 60))
            });
          }
        });
      });
    
    return upcoming.sort((a, b) => a.minutesUntil - b.minutesUntil);
  };

  const getComplianceRate = () => {
    const totalDoses = Object.keys(selectedTimes).length;
    const givenDoses = Object.values(selectedTimes).filter(status => status === 'given').length;
    return totalDoses > 0 ? Math.round((givenDoses / totalDoses) * 100) : 0;
  };

  const yesterday = getYesterday();
  const changesToday = getChangesToday();
  const priorityMeds = getPriorityMedications();
  const upcomingDoses = getUpcomingDoses();
  const complianceRate = getComplianceRate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <Link to="/" className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
            <span className="text-sm text-gray-500">← All Patients</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {patient.name} ({patient.sex} {patient.age}y)
              </h1>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600 mr-3">{patient.mrn}</span>
                <button onClick={handleCopyMRN} className="p-1 hover:bg-gray-100 rounded">
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded ml-1">
                  <QrCode className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: patient.stageColor }}
            >
              {patient.stage}
            </span>
          </div>

          {/* Care Team Photo Stack */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Care Team:</span>
              <CareTeamPhotoStack 
                teamMembers={teamMembers} 
                onDetailsClick={() => setShowCareTeamDetails(!showCareTeamDetails)}
              />
            </div>
          </div>
        </div>

        {/* Collapsible Diagnosis Section */}
        <Collapsible open={isDiagnosisOpen} onOpenChange={setIsDiagnosisOpen}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="font-medium text-gray-900">Diagnosis & Timeline</span>
              </div>
              {isDiagnosisOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Primary Diagnosis</label>
                  <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-base font-medium">
                    {patient.primaryDiagnosis}
                  </span>
                </div>
                
                {patient.comorbidities.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Comorbidities</label>
                    <div className="flex flex-wrap gap-2">
                      {patient.comorbidities.map((condition, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Current Stage & Days</label>
                  <span className="text-base font-semibold text-gray-900">
                    {patient.currentStage} ({patient.stageDays} days)
                  </span>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-3">Timeline / History</label>
                  <div className="relative">
                    <div className="flex items-center space-x-2">
                      {patient.timeline.map((segment, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="px-4 py-2 rounded-lg text-white font-medium text-sm"
                            style={{ backgroundColor: segment.color }}
                          >
                            {segment.label}
                          </div>
                          {index < patient.timeline.length - 1 && (
                            <div className="mx-2 text-gray-400 text-lg">→</div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Surgery → ICU (2 days) → Ward (3 days)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Care Team Details (Collapsible) */}
        {showCareTeamDetails && (
          <div className="border-b border-gray-200 bg-white">
            <div className="p-4">
              <CareTeam patientId={patient.id || ''} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <Tabs defaultValue="medications" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="medications" className="flex flex-col items-center gap-1 p-3">
              <Pill className="w-4 h-4" />
              <span className="text-xs">Medications</span>
            </TabsTrigger>
            <TabsTrigger value="labs" className="flex flex-col items-center gap-1 p-3">
              <Activity className="w-4 h-4" />
              <span className="text-xs">Lab Results</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex flex-col items-center gap-1 p-3">
              <CheckSquare className="w-4 h-4" />
              <span className="text-xs">Tasks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="medications">
            <div className="w-full max-w-7xl mx-auto bg-gray-50">
              {/* Enhanced Header */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Stethoscope className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Daily Medication Review</h1>
                      <p className="text-gray-600">
                        {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} 
                        • Day 3 since admission
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
                
                {/* Enhanced Stats Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-blue-100 rounded">
                        <Activity className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-blue-700 font-semibold">
                        {medications.filter(med => isMedicationActiveOnDate(med, currentDate)).length} Active
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-green-100 rounded">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-green-700 font-semibold">
                        {Object.values(selectedTimes).filter(status => status === 'given').length} Given
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-red-100 rounded">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-red-700 font-semibold">
                        {Object.values(selectedTimes).filter(status => status === 'missed').length} Missed
                      </span>
                    </div>
                    {changesToday.length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-yellow-100 rounded">
                          <Zap className="w-4 h-4 text-yellow-600" />
                        </div>
                        <span className="text-yellow-700 font-semibold">
                          {changesToday.length} Changes
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Compliance Badge */}
                  <div className="flex items-center gap-4">
                    {upcomingDoses.length > 0 && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                        <Timer className="w-4 h-4" />
                        Next in {upcomingDoses[0].minutesUntil}min
                      </div>
                    )}
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      complianceRate >= 90 ? 'bg-green-100 text-green-800' :
                      complianceRate >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {complianceRate}% Compliance
                    </div>
                  </div>
                </div>
              </div>

              {/* Critical Alerts */}
              {(changesToday.length > 0 || priorityMeds.length > 0) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  {changesToday.length > 0 && (
                    <div className="bg-white border-l-4 border-yellow-400 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <h3 className="font-semibold text-yellow-800">Today's Changes</h3>
                      </div>
                      <div className="space-y-2">
                        {changesToday.map(med => (
                          <div key={med.id} className="flex items-center gap-3 text-sm">
                            {med.changes === 'start_today' ? (
                              <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">START</div>
                            ) : (
                              <div className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">STOP</div>
                            )}
                            <span className="font-medium">{med.name} {med.dose}</span>
                            <span className="text-gray-600">({med.condition})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {priorityMeds.length > 0 && (
                    <div className="bg-white border-l-4 border-red-400 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <h3 className="font-semibold text-red-800">High Priority</h3>
                      </div>
                      <div className="space-y-2">
                        {priorityMeds.map(med => (
                          <div key={med.id} className="text-sm">
                            <span className="font-medium text-red-700">{med.name}</span>
                            <div className="text-red-600 text-xs">{med.notes}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Two Day View */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Yesterday */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Yesterday • {yesterday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      <span className="text-sm text-gray-600">(Day 2)</span>
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                    {medications
                      .filter(med => isMedicationActiveOnDate(med, yesterday))
                      .map(medication => (
                        <MedicationRow 
                          key={`yesterday-${medication.id}`}
                          medication={medication}
                          date={yesterday}
                          selectedTimes={selectedTimes}
                          onToggleTime={toggleMedicationTime}
                          getMedicationTimeStatus={getMedicationTimeStatus}
                          isToday={false}
                        />
                      ))}
                  </div>
                </div>

                {/* Today */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-blue-50 p-4 border-b">
                    <h2 className="font-semibold text-blue-800 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Today • {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      <span className="text-sm text-blue-600">(Day 3)</span>
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                    {medications
                      .filter(med => isMedicationActiveOnDate(med, currentDate))
                      .sort((a, b) => {
                        if (a.changes && !b.changes) return -1;
                        if (!a.changes && b.changes) return 1;
                        if (a.priority === 'high' && b.priority !== 'high') return -1;
                        if (a.priority !== 'high' && b.priority === 'high') return 1;
                        return 0;
                      })
                      .map(medication => (
                        <MedicationRow 
                          key={`today-${medication.id}`}
                          medication={medication}
                          date={currentDate}
                          selectedTimes={selectedTimes}
                          onToggleTime={toggleMedicationTime}
                          getMedicationTimeStatus={getMedicationTimeStatus}
                          isToday={true}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="labs">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Lab Results</h2>
                
                <div className="space-y-4">
                  {labData.map((lab, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${lab.isAbnormal ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold text-gray-900 text-base w-20">{lab.parameter}</span>
                          <div className="flex space-x-1">
                            {lab.trend.map((value, i) => (
                              <div 
                                key={i} 
                                className={`w-3 h-8 rounded ${i === lab.trend.length - 1 ? 'bg-blue-500' : 'bg-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-right flex items-center">
                          <div>
                            <span className={`font-bold text-lg ${lab.isAbnormal ? 'text-red-600' : 'text-gray-900'}`}>
                              {lab.latest}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">{lab.units}</span>
                          </div>
                          {lab.isAbnormal && (
                            <div className="w-3 h-3 bg-red-500 rounded-full ml-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tasks</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-red-600 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      To Do ({tasks.todo.length})
                    </h3>
                    <div className="space-y-2">
                      {tasks.todo.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                          <span className="font-medium text-gray-900">{task.title}</span>
                          <span className="text-sm text-gray-600">{task.due}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-yellow-600 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                      In Progress ({tasks.inProgress.length})
                    </h3>
                    <div className="space-y-2">
                      {tasks.inProgress.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <span className="font-medium text-gray-900">{task.title}</span>
                          <span className="text-sm text-gray-600">{task.due}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-600 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      Done ({tasks.done.length})
                    </h3>
                    <div className="space-y-2">
                      {tasks.done.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="font-medium text-gray-900 line-through">{task.title}</span>
                          <span className="text-sm text-gray-600">{task.due}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDetail;
