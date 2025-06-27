
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, QrCode, User, Pill, Activity, CheckSquare, Users, Heart, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  const medications = [
    {
      drug: "Pip-Taz 4.5g IV",
      route: "IV",
      frequency: "q8h",
      start: "21 Jun",
      end: "25 Jun",
      indication: "Sepsis",
      class: "β-lactam",
      color: "#3B82F6"
    },
    {
      drug: "Paracetamol 1g",
      route: "PO",
      frequency: "q6h",
      start: "20 Jun",
      end: "ongoing",
      indication: "Pain",
      class: "Analgesic",
      color: "#10B981"
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

  const careTeam = [
    { role: "Primary Surgeon", name: "Dr Giri S.", avatar: "👨‍⚕️" },
    { role: "Resident", name: "Dr Sharma R.", avatar: "👩‍⚕️" },
    { role: "Primary Nurse", name: "RN Lakshmi P.", avatar: "👩‍⚕️" }
  ];

  const handleCopyMRN = () => {
    navigator.clipboard.writeText(patient.mrn);
  };

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
          
          <div className="flex items-center justify-between">
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
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="diagnosis" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="diagnosis" className="flex flex-col items-center gap-1 p-3">
              <Heart className="w-4 h-4" />
              <span className="text-xs">Diagnosis</span>
            </TabsTrigger>
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
            <TabsTrigger value="team" className="flex flex-col items-center gap-1 p-3">
              <Users className="w-4 h-4" />
              <span className="text-xs">Care Team</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diagnosis">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Diagnosis & Stage</h2>
                
                <div className="space-y-6">
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
            </div>
          </TabsContent>

          <TabsContent value="medications">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Medications</h2>
                
                <div className="space-y-4">
                  {medications.map((med, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <div 
                              className="w-4 h-4 rounded-full mr-3"
                              style={{ backgroundColor: med.color }}
                            />
                            <span className="font-semibold text-gray-900 text-base">{med.drug}</span>
                          </div>
                          <span className="text-sm text-gray-600 ml-7">{med.frequency}</span>
                        </div>
                        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium">{med.route}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm ml-7">
                        <span className="text-gray-600 font-medium">{med.start} → {med.end}</span>
                        <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">{med.indication}</span>
                      </div>
                    </div>
                  ))}
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

          <TabsContent value="team">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Care Team</h2>
                  <button className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {careTeam.map((member, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-base">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.role}</div>
                      </div>
                    </div>
                  ))}
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
