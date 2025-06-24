
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface MedicationSheetProps {
  patientId: string;
}

const MedicationSheet: React.FC<MedicationSheetProps> = ({ patientId }) => {
  // Mock medication data
  const medications = [
    {
      drug: "Pip-Taz 4.5g IV",
      route: "IV",
      frequency: "q8h",
      startDate: "21 Jun",
      endDate: "25 Jun",
      indication: "Sepsis",
      class: "β-lactam",
      classColor: "bg-blue-500",
      overdue: false,
      notes: "Monitor renal function"
    },
    {
      drug: "Paracetamol 1g",
      route: "PO",
      frequency: "q6h PRN",
      startDate: "20 Jun",
      endDate: "28 Jun",
      indication: "Pain/Fever",
      class: "Analgesic",
      classColor: "bg-green-500",
      overdue: false,
      notes: "Max 4g/day"
    },
    {
      drug: "Metformin 500mg",
      route: "PO",
      frequency: "BD",
      startDate: "18 Jun",
      endDate: "30 Jun",
      indication: "T2DM",
      class: "Antidiabetic",
      classColor: "bg-purple-500",
      overdue: true,
      notes: "Hold if eGFR <30"
    }
  ];

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Drug / Dose</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Start → Stop</TableHead>
            <TableHead>Indication</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medications.map((med, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${med.classColor}`}></div>
                  <div>
                    <div className="font-medium">{med.drug}</div>
                    <div className="text-sm text-gray-500">{med.frequency}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{med.route}</Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <span>{med.startDate}</span>
                  <span className="mx-2">⟷</span>
                  <span className={med.overdue ? "text-red-600 font-medium" : ""}>
                    {med.endDate}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{med.indication}</Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {med.notes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MedicationSheet;
