import React from 'react';
import { User as UserType, Exam, ExamResult } from '../../types';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp,
  PlusCircle,
  BarChart3,
  Clock,
  AlertCircle
} from 'lucide-react';

interface TeacherDashboardProps {
  user: UserType;
  exams: Exam[];
  results: ExamResult[];
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ 
  user, 
  exams, 
  results 
}) => {
  const myExams = exams.filter(exam => exam.createdBy === user.id);
  const activeExams = myExams.filter(exam => exam.isActive);
  const totalAttempts = results.filter(result => 
    myExams.some(exam => exam.id === result.examId)
  ).length;
  
  const averageScore = results.length > 0 
    ? results.reduce((sum, result) => sum + result.percentage, 0) / results.length 
    : 0;

  const recentExams = myExams.slice(0, 3);
  const recentResults = results.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Teacher Dashboard</h2>
        <p className="text-gray-600">Manage your exams and track student performance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Exams</p>
              <p className="text-3xl font-bold text-gray-900">{myExams.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600 font-medium">{activeExams.length} active</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Student Attempts</p>
              <p className="text-3xl font-bold text-gray-900">{totalAttempts}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <BarChart3 className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600 font-medium">Total submissions</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-3xl font-bold text-gray-900">{averageScore.toFixed(1)}%</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
            <span className="text-purple-600 font-medium">Class average</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Questions Created</p>
              <p className="text-3xl font-bold text-gray-900">
                {myExams.reduce((sum, exam) => sum + exam.questions.length, 0)}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <PlusCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <BookOpen className="w-4 h-4 text-orange-600 mr-1" />
            <span className="text-orange-600 font-medium">Total questions</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Exams */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">My Exams</h3>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <PlusCircle className="w-4 h-4" />
              Create New
            </button>
          </div>
          
          <div className="space-y-4">
            {recentExams.length > 0 ? (
              recentExams.map((exam) => (
                <div key={exam.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900">{exam.title}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          exam.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {exam.isActive ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{exam.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{exam.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{exam.questions.length} questions</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{results.filter(r => r.examId === exam.id).length} attempts</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {exam.subject}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>No exams created yet</p>
                <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Create your first exam
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Results */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Results</h3>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentResults.length > 0 ? (
              recentResults.map((result) => (
                <div key={result.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{result.studentName}</h4>
                    <div className={`text-sm font-bold ${
                      result.percentage >= 80 ? 'text-green-600' :
                      result.percentage >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {result.percentage.toFixed(0)}%
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {exams.find(e => e.id === result.examId)?.title || 'Unknown Exam'}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{result.completedAt.toLocaleDateString()}</span>
                    <span>{result.timeTaken}m</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm">No results yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};