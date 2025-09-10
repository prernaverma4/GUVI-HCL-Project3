import React from 'react';
import { User as UserType } from '../../types';
import { 
  Home, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Users, 
  Settings,
  PlusCircle,
  ClipboardList
} from 'lucide-react';

interface NavigationProps {
  user: UserType;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ user, currentView, onViewChange }) => {
  const getNavigationItems = () => {
    const common = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
    ];

    switch (user.role) {
      case 'student':
        return [
          ...common,
          { id: 'available-exams', label: 'Available Exams', icon: BookOpen },
          { id: 'my-results', label: 'My Results', icon: BarChart3 },
        ];
      case 'teacher':
        return [
          ...common,
          { id: 'create-exam', label: 'Create Exam', icon: PlusCircle },
          { id: 'manage-exams', label: 'Manage Exams', icon: ClipboardList },
          { id: 'results', label: 'Results', icon: BarChart3 },
        ];
      case 'admin':
        return [
          ...common,
          { id: 'users', label: 'Users', icon: Users },
          { id: 'all-exams', label: 'All Exams', icon: BookOpen },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      default:
        return common;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white shadow-sm border-r border-gray-200 w-64 min-h-screen">
      <div className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};