
import React, { useState } from 'react';
import { Plus, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TaskBoardProps {
  patientId: string;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

const TaskBoard: React.FC<TaskBoardProps> = ({ patientId }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Wound dressing change',
      dueDate: '2025-06-24',
      assignee: {
        name: 'RN Lakshmi P.',
        avatar: '/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png',
        initials: 'LP'
      },
      status: 'todo',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Blood pressure monitoring',
      dueDate: '2025-06-24',
      assignee: {
        name: 'RN Priya S.',
        avatar: '/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png',
        initials: 'PS'
      },
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Lab collection',
      dueDate: '2025-06-23',
      assignee: {
        name: 'Lab Tech',
        avatar: '/lovable-uploads/7b52697c-e4e0-4187-b173-688b6eb5367f.png',
        initials: 'LT'
      },
      status: 'done',
      priority: 'medium'
    }
  ]);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-red-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-4">
      {columns.map((column) => (
        <div key={column.id} className={`p-3 rounded-lg ${column.color}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">{column.title}</h3>
            <Badge variant="secondary">
              {tasks.filter(task => task.status === column.id).length}
            </Badge>
          </div>
          
          <div className="space-y-2">
            {tasks
              .filter(task => task.status === column.id)
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className={`text-xs ${
                        isOverdue(task.dueDate) ? 'text-red-600 font-medium' : 'text-gray-600'
                      }`}>
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={task.assignee.avatar} />
                      <AvatarFallback className="text-xs">
                        {task.assignee.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              ))}
            
            {column.id === 'todo' && (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
