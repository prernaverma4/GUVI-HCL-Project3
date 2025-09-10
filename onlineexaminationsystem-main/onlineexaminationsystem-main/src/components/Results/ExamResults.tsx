import React from 'react';
import { ExamResult, Exam, User as UserType } from '../../types';
import { 
  Award, 
  Clock, 
  CheckCircle, 
  XCircle, 
  BarChart3,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface ExamResultsProps {
  results: ExamResult[];
  exams: Exam[];
  user: UserType;
}

export const ExamResults: React.FC<ExamResultsProps> = ({ results, exams, user }) => {
  const userResults = results.filter(result => result.studentId === user.id);
  const sortedResults = userResults.sort((a, b) => 
    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  const averageScore = userResults.length > 0 
    ? userResults.reduce((sum, result) => sum + result.percentage, 0) / userResults.length 
    : 0;

  const totalExamsTaken = userResults.length;
  const passedExams = userResults.filter(result => result.percentage >= 60).length;
  const totalTimeSpent = userResults.reduce((sum, result) => sum + result.timeTaken, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Results</h2>
        <p className="text-gray-600">Track your exam performance and progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Exams Taken</p>
              <p className="text-3xl font-bold text-gray-900">{totalExamsTaken}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
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
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Passed</p>
              <p className="text-3xl font-bold text-gray-900">{passedExams}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time Spent</p>
              <p className="text-3xl font-bold text-gray-900">{totalTimeSpent}m</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Exam History</h3>
        </div>
        
        {sortedResults.length === 0 ? (
          <div className="p-12 text-center">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Yet</h3>
            <p className="text-gray-600">Take an exam to see your results here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sortedResults.map((result) => {
              const exam = exams.find(e => e.id === result.examId);
              const percentage = result.percentage;
              const status = percentage >= 80 ? 'excellent' : 
                            percentage >= 60 ? 'good' : 'needs-improvement';
              
              return (
                <div key={result.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {exam?.title || 'Unknown Exam'}
                        </h4>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          status === 'excellent' ? 'bg-green-100 text-green-800' :
                          status === 'good' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {status === 'excellent' ? 'Excellent' :
                           status === 'good' ? 'Good' : 'Needs Improvement'}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>Score: {result.score}/{result.totalPoints}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Time: {result.timeTaken}m</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{result.completedAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" />
                          <span>{exam?.subject}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            percentage >= 80 ? 'bg-green-500' :
                            percentage >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        Accuracy: {percentage.toFixed(1)}%
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div className={`text-3xl font-bold ${
                        percentage >= 80 ? 'text-green-600' :
                        percentage >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {percentage.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {result.answers.filter(a => a.isCorrect).length}/{result.answers.length} correct
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};