// Mock Data for School CRM System
import { User, Student, Class, AttendanceRecord, Parent, Message } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'admin@school.edu',
    role: 'admin',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'mchen@school.edu',
    role: 'teacher',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'ewilson@school.edu',
    role: 'teacher',
    createdAt: new Date('2024-01-22')
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@student.edu',
    role: 'student',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '5',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@parent.com',
    role: 'parent',
    createdAt: new Date('2024-02-01')
  }
];

export const mockStudents: Student[] = [
  {
    id: 'st1',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@student.edu',
    studentId: 'STU001',
    grade: '10th Grade',
    parentId: 'p1',
    enrollmentDate: new Date('2024-01-15'),
    classes: ['c1', 'c2', 'c3']
  },
  {
    id: 'st2',
    name: 'Jessica Park',
    email: 'jessica.park@student.edu',
    studentId: 'STU002',
    grade: '10th Grade',
    parentId: 'p2',
    enrollmentDate: new Date('2024-01-16'),
    classes: ['c1', 'c2']
  },
  {
    id: 'st3',
    name: 'David Kim',
    email: 'david.kim@student.edu',
    studentId: 'STU003',
    grade: '11th Grade',
    enrollmentDate: new Date('2024-01-17'),
    classes: ['c2', 'c3']
  },
  {
    id: 'st4',
    name: 'Sophie Chen',
    email: 'sophie.chen@student.edu',
    studentId: 'STU004',
    grade: '9th Grade',
    enrollmentDate: new Date('2024-01-18'),
    classes: ['c1', 'c4']
  },
  {
    id: 'st5',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@student.edu',
    studentId: 'STU005',
    grade: '11th Grade',
    enrollmentDate: new Date('2024-01-19'),
    classes: ['c3', 'c4']
  }
];

export const mockClasses: Class[] = [
  {
    id: 'c1',
    name: 'Advanced Mathematics',
    subject: 'Mathematics',
    teacherId: '2',
    teacherName: 'Dr. Michael Chen',
    schedule: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '10:30' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '10:30' },
      { dayOfWeek: 5, startTime: '09:00', endTime: '10:30' }
    ],
    students: ['st1', 'st2', 'st4'],
    room: 'Room 201',
    description: 'Advanced mathematics covering calculus and statistics'
  },
  {
    id: 'c2',
    name: 'English Literature',
    subject: 'English',
    teacherId: '3',
    teacherName: 'Emma Wilson',
    schedule: [
      { dayOfWeek: 2, startTime: '10:45', endTime: '12:15' },
      { dayOfWeek: 4, startTime: '10:45', endTime: '12:15' }
    ],
    students: ['st1', 'st2', 'st3'],
    room: 'Room 105',
    description: 'Classic and contemporary literature analysis'
  },
  {
    id: 'c3',
    name: 'Physics Lab',
    subject: 'Science',
    teacherId: '2',
    teacherName: 'Dr. Michael Chen',
    schedule: [
      { dayOfWeek: 2, startTime: '14:00', endTime: '15:30' },
      { dayOfWeek: 4, startTime: '14:00', endTime: '15:30' }
    ],
    students: ['st1', 'st3', 'st5'],
    room: 'Lab 301',
    description: 'Hands-on physics experiments and lab work'
  },
  {
    id: 'c4',
    name: 'World History',
    subject: 'History',
    teacherId: '3',
    teacherName: 'Emma Wilson',
    schedule: [
      { dayOfWeek: 1, startTime: '13:00', endTime: '14:30' },
      { dayOfWeek: 3, startTime: '13:00', endTime: '14:30' }
    ],
    students: ['st4', 'st5'],
    room: 'Room 108',
    description: 'Comprehensive study of global historical events'
  }
];

export const mockParents: Parent[] = [
  {
    id: 'p1',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@parent.com',
    phone: '+1-555-0123',
    childrenIds: ['st1']
  },
  {
    id: 'p2',
    name: 'James Park',
    email: 'james.park@parent.com',
    phone: '+1-555-0124',
    childrenIds: ['st2']
  }
];

// Generate some recent attendance records
const generateAttendanceRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const statuses: Array<'present' | 'absent' | 'late' | 'excused'> = ['present', 'present', 'present', 'absent', 'late', 'excused'];
  
  mockStudents.forEach(student => {
    student.classes.forEach(classId => {
      // Generate 10 recent attendance records per student per class
      for (let i = 0; i < 10; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        records.push({
          id: `att_${student.id}_${classId}_${i}`,
          studentId: student.id,
          classId: classId,
          date: date,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          notes: Math.random() > 0.8 ? 'Doctor appointment' : undefined,
          markedBy: '2', // Dr. Michael Chen
          markedAt: new Date(date.getTime() + 30 * 60 * 1000) // 30 minutes after class start
        });
      }
    });
  });
  
  return records;
};

export const mockAttendanceRecords = generateAttendanceRecords();

export const mockMessages: Message[] = [
  {
    id: 'm1',
    fromId: '2',
    toId: 'p1',
    studentId: 'st1',
    subject: 'Alex\'s Progress in Mathematics',
    content: 'Alex is showing excellent progress in our advanced mathematics course. Keep up the great work!',
    sentAt: new Date('2024-06-01T10:30:00'),
    read: false
  },
  {
    id: 'm2',
    fromId: 'p1',
    toId: '2',
    studentId: 'st1',
    subject: 'Re: Alex\'s Progress in Mathematics',
    content: 'Thank you for the update! We\'re very proud of Alex\'s achievements.',
    sentAt: new Date('2024-06-01T14:15:00'),
    read: true
  }
];