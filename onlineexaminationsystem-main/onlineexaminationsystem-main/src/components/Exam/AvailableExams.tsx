import React from 'react';
import { Exam, User as UserType } from '../../types';
import { 
  Clock, 
  BookOpen, 
  Award, 
  Calendar,
  Play,
  Users
} from 'lucide-react';

interface AvailableExamsProps {
  exams: Exam[];
  user: UserType;
  onStartExam: (exam: Exam) => void;
}

export const AvailableExams: React.FC<AvailableExamsProps> = ({ 
  exams, 
  user, 
  onStartExam 
}) => {
  const availableExams = exams.filter(exam => exam.isActive);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Exams</h2>
        <p className="text-gray-600">Choose an exam to start your assessment</p>
      </div>

      {availableExams.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Available Exams</h3>
          <p className="text-gray-600">There are currently no active exams. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableExams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{exam.title}</h3>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {exam.subject}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{exam.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{exam.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span>{exam.totalQuestions} questions</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span>{exam.totalPoints} points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Created {exam.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onStartExam(exam)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Exam
                </button>
              </div>

              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulty Level:</span>
                  <div className="flex gap-1">
                    {exam.questions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index < 2 ? 'bg-green-400' :
                          index < 4 ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};