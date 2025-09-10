import React, { useState, useEffect } from 'react';
import { Exam, Question, ExamAttempt, User as UserType } from '../../types';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Flag,
  Send
} from 'lucide-react';

interface ExamTakingProps {
  exam: Exam;
  user: UserType;
  onSubmit: (attempt: Partial<ExamAttempt>) => void;
  onExit: () => void;
}

export const ExamTaking: React.FC<ExamTakingProps> = ({ 
  exam, 
  user, 
  onSubmit, 
  onExit 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState(exam.duration * 60); // in seconds
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleQuestionNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (direction === 'next' && currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newFlags = new Set(prev);
      if (newFlags.has(questionId)) {
        newFlags.delete(questionId);
      } else {
        newFlags.add(questionId);
      }
      return newFlags;
    });
  };

  const handleSubmit = () => {
    const attempt: Partial<ExamAttempt> = {
      examId: exam.id,
      studentId: user.id,
      startedAt: new Date(Date.now() - (exam.duration * 60 - timeRemaining) * 1000),
      submittedAt: new Date(),
      answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer
      })),
      status: 'completed'
    };

    onSubmit(attempt);
  };

  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / exam.questions.length) * 100;
  const currentQ = exam.questions[currentQuestion];
  const isLowTime = timeRemaining < 300; // less than 5 minutes

  if (showSubmitConfirm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Submit Exam?</h3>
            <p className="text-gray-600 mb-6">
              You have answered {answeredQuestions} out of {exam.questions.length} questions.
              {answeredQuestions < exam.questions.length && (
                <span className="block mt-2 text-amber-600 font-medium">
                  {exam.questions.length - answeredQuestions} questions are unanswered.
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Exam
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onExit}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Exit Exam
              </button>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-xl font-bold text-gray-900">{exam.title}</h1>
                <p className="text-sm text-gray-600">{exam.subject}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isLowTime ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
              </div>
              
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Send className="w-5 h-5" />
                Submit
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {exam.questions.length}
              </span>
              <span className="text-sm text-gray-600">
                {answeredQuestions}/{exam.questions.length} answered
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Question {currentQuestion + 1}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentQ.points} points
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    currentQ.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    currentQ.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                </div>
                
                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    flaggedQuestions.has(currentQ.id)
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQ.id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQ.id] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQ.id] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQ.id] === index && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium text-gray-700">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <button
                onClick={() => handleQuestionNavigation('prev')}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
              
              <button
                onClick={() => handleQuestionNavigation('next')}
                disabled={currentQuestion === exam.questions.length - 1}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Questions</h4>
            <div className="grid grid-cols-5 gap-2">
              {exam.questions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    index === currentQuestion
                      ? 'bg-blue-600 text-white'
                      : answers[question.id] !== undefined
                      ? 'bg-green-100 text-green-800'
                      : flaggedQuestions.has(question.id)
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                  {flaggedQuestions.has(question.id) && (
                    <Flag className="w-3 h-3 absolute -top-1 -right-1" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 rounded"></div>
                <span className="text-gray-600">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <span className="text-gray-600">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 rounded"></div>
                <span className="text-gray-600">Flagged</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span className="text-gray-600">Not answered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};