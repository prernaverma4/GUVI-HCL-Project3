export interface User {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  name: string;
  avatar?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  subject: string;
  duration: number; // in minutes
  totalQuestions: number;
  totalPoints: number;
  questions: Question[];
  startTime?: Date;
  endTime?: Date;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  startedAt: Date;
  submittedAt?: Date;
  answers: { questionId: string; selectedAnswer: number }[];
  score?: number;
  status: 'in-progress' | 'completed' | 'abandoned';
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  score: number;
  totalPoints: number;
  percentage: number;
  timeTaken: number; // in minutes
  completedAt: Date;
  answers: { questionId: string; selectedAnswer: number; isCorrect: boolean }[];
}