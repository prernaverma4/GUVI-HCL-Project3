import React, { useState } from 'react';
import { User, LogIn, UserPlus } from 'lucide-react';
import { User as UserType } from '../../types';

interface LoginFormProps {
  onLogin: (user: UserType) => void;
  users: UserType[];
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, users }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      onLogin(selectedUser);
    }
  };

  const handleQuickLogin = (user: UserType) => {
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              ExamPortal
            </h2>
            <p className="text-gray-600">Welcome to the Online Examination System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Login (Demo)</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleQuickLogin(user)}
                  className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500 capitalize">{user.role}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'teacher' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};