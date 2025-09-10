import { User, Question, Exam, ExamResult } from '../types';

export const users: User[] = [
  {
    id: '1',
    username: 'john_student',
    email: 'john@example.com',
    role: 'student',
    name: 'John Smith',
  },
  {
    id: '2',
    username: 'jane_teacher',
    email: 'jane@example.com',
    role: 'teacher',
    name: 'Jane Doe',
  },
  {
    id: '3',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    name: 'System Administrator',
  },
];

export const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
    subject: 'Geography',
    difficulty: 'easy',
    points: 5,
  },
  {
    id: '2',
    question: 'Which programming language is known for its use in web development?',
    options: ['Python', 'JavaScript', 'C++', 'Java'],
    correctAnswer: 1,
    subject: 'Computer Science',
    difficulty: 'medium',
    points: 10,
  },
  {
    id: '3',
    question: 'What is 15 × 8?',
    options: ['120', '110', '130', '115'],
    correctAnswer: 0,
    subject: 'Mathematics',
    difficulty: 'easy',
    points: 5,
  },
  {
    id: '4',
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
    correctAnswer: 0,
    subject: 'Literature',
    difficulty: 'medium',
    points: 8,
  },
  {
    id: '5',
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 2,
    subject: 'Chemistry',
    difficulty: 'medium',
    points: 10,
  },
];

export const sampleExams: Exam[] = [
  {
    id: '1',
    title: 'General Knowledge Quiz',
    description: 'A comprehensive quiz covering various subjects',
    subject: 'General',
    duration: 30,
    totalQuestions: 5,
    totalPoints: 38,
    questions: sampleQuestions,
    isActive: true,
    createdBy: '2',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Mathematics Test',
    description: 'Basic mathematics assessment',
    subject: 'Mathematics',
    duration: 45,
    totalQuestions: 3,
    totalPoints: 25,
    questions: sampleQuestions.filter(q => q.subject === 'Mathematics'),
    isActive: true,
    createdBy: '2',
    createdAt: new Date('2024-01-10'),
  },
];

export const sampleResults: ExamResult[] = [
  {
    id: '1',
    examId: '1',
    studentId: '1',
    studentName: 'John Smith',
    score: 23,
    totalPoints: 38,
    percentage: 60.5,
    timeTaken: 25,
    completedAt: new Date('2024-01-20'),
    answers: [],
  },
];