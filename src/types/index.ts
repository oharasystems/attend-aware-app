// Core Types for School CRM System

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  grade: string;
  parentId?: string;
  avatar?: string;
  enrollmentDate: Date;
  classes: string[]; // Array of class IDs
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  schedule: {
    dayOfWeek: number; // 0-6 (Sunday-Saturday)
    startTime: string;
    endTime: string;
  }[];
  students: string[]; // Array of student IDs
  room?: string;
  description?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  markedBy: string; // Teacher ID
  markedAt: Date;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  childrenIds: string[]; // Array of student IDs
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  studentId?: string; // If message is about a specific student
  subject: string;
  content: string;
  sentAt: Date;
  read: boolean;
}

export interface AttendanceStats {
  studentId: string;
  totalClasses: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
}