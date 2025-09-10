import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/Auth/LoginForm';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { StudentDashboard } from './components/Dashboard/StudentDashboard';
import { TeacherDashboard } from './components/Dashboard/TeacherDashboard';
import { AvailableExams } from './components/Exam/AvailableExams';
import { ExamTaking } from './components/Exam/ExamTaking';
import { ExamResults } from './components/Results/ExamResults';
import { User as UserType, Exam, ExamAttempt, ExamResult } from './types';
import { users, sampleExams, sampleResults } from './data/mockData';

function App() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [exams, setExams] = useState<Exam[]>(sampleExams);
  const [results, setResults] = useState<ExamResult[]>(sampleResults);

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
    setCurrentExam(null);
  };

  const handleStartExam = (exam: Exam) => {
    setCurrentExam(exam);
    setCurrentView('taking-exam');
  };

  const handleExamSubmit = (attempt: Partial<ExamAttempt>) => {
    if (!attempt.examId || !attempt.studentId || !attempt.answers) return;

    const exam = exams.find(e => e.id === attempt.examId);
    if (!exam) return;

    let score = 0;
    const detailedAnswers = attempt.answers.map(answer => {
      const question = exam.questions.find(q => q.id === answer.questionId);
      const isCorrect = question ? question.correctAnswer === answer.selectedAnswer : false;
      if (isCorrect && question) {
        score += question.points;
      }
      return {
        ...answer,
        isCorrect
      };
    });

    const percentage = (score / exam.totalPoints) * 100;
    const timeTaken = attempt.startedAt && attempt.submittedAt 
      ? Math.round((attempt.submittedAt.getTime() - attempt.startedAt.getTime()) / 60000)
      : 0;

    const result: ExamResult = {
      id: Date.now().toString(),
      examId: attempt.examId,
      studentId: attempt.studentId,
      studentName: currentUser?.name || 'Unknown',
      score,
      totalPoints: exam.totalPoints,
      percentage,
      timeTaken,
      completedAt: attempt.submittedAt || new Date(),
      answers: detailedAnswers
    };

    setResults(prev => [...prev, result]);
    setCurrentExam(null);
    setCurrentView('my-results');
  };

  const renderContent = () => {
    if (!currentUser) {
      return <LoginForm onLogin={handleLogin} users={users} />;
    }

    if (currentView === 'taking-exam' && currentExam) {
      return (
        <ExamTaking
          exam={currentExam}
          user={currentUser}
          onSubmit={handleExamSubmit}
          onExit={() => {
            setCurrentExam(null);
            setCurrentView('available-exams');
          }}
        />
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={currentUser} onLogout={handleLogout} currentView={currentView} />
        <div className="flex">
          <Navigation 
            user={currentUser} 
            currentView={currentView} 
            onViewChange={setCurrentView} 
          />
          <main className="flex-1 min-h-screen">
            {currentView === 'dashboard' && currentUser.role === 'student' && (
              <StudentDashboard user={currentUser} exams={exams} results={results} />
            )}
            {currentView === 'dashboard' && currentUser.role === 'teacher' && (
              <TeacherDashboard user={currentUser} exams={exams} results={results} />
            )}
            {currentView === 'available-exams' && (
              <AvailableExams 
                exams={exams} 
                user={currentUser} 
                onStartExam={handleStartExam} 
              />
            )}
            {currentView === 'my-results' && (
              <ExamResults results={results} exams={exams} user={currentUser} />
            )}
            {!['dashboard', 'available-exams', 'my-results'].includes(currentView) && (
              <div className="p-6">
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {currentView.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <p className="text-gray-600">This feature is coming soon!</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  };

  return renderContent();
}

export default App;