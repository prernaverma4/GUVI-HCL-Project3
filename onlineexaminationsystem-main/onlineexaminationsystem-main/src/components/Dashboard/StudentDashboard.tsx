import React from 'react';
import { User as UserType, Exam, ExamResult } from '../../types';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface StudentDashboardProps {
  user: UserType;
  exams: Exam[];
  results: ExamResult[];
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ 
  user, 
  exams, 
  results 
}) => {
  const availableExams = exams.filter(exam => exam.isActive);
  const completedExams = results.filter(result => result.studentId === user.id);
  const averageScore = completedExams.length > 0 
    ? completedExams.reduce((sum, result) => sum + result.percentage, 0) / completedExams.length 
    : 0;

  const upcomingExams = availableExams.slice(0, 3);
  const recentResults = completedExams.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h2>
        <p className="text-gray-600">Here's your exam progress and upcoming assessments.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Exams</p>
              <p className="text-3xl font-bold text-gray-900">{availableExams.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600 font-medium">Ready to take</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900">{completedExams.length}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Award className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600 font-medium">Exams finished</span>
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
            <span className="text-purple-600 font-medium">Overall performance</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time Spent</p>
              <p className="text-3xl font-bold text-gray-900">
                {completedExams.reduce((sum, result) => sum + result.timeTaken, 0)}m
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Clock className="w-4 h-4 text-orange-600 mr-1" />
            <span className="text-orange-600 font-medium">Total study time</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Exams */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Available Exams</h3>
            <BookOpen className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {upcomingExams.length > 0 ? (
              upcomingExams.map((exam) => (
                <div key={exam.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{exam.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{exam.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{exam.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{exam.totalQuestions} questions</span>
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
                <p>No available exams at the moment</p>
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
                <div key={result.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {exams.find(e => e.id === result.examId)?.title || 'Unknown Exam'}
                      </h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{result.completedAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{result.timeTaken} min</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        result.percentage >= 80 ? 'text-green-600' :
                        result.percentage >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {result.percentage.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-500">
                        {result.score}/{result.totalPoints}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>No exam results yet</p>
                <p className="text-sm">Take an exam to see your results here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};