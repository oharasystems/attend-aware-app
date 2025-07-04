import { useState } from "react";
import { AttendanceRecord, Student, Class } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

interface AttendanceTableProps {
  attendanceRecords: AttendanceRecord[];
  students: Student[];
  classes: Class[];
  onMarkAttendance?: (studentId: string, classId: string, status: 'present' | 'absent' | 'late' | 'excused') => void;
  selectedDate?: Date;
  selectedClassId?: string;
}

export function AttendanceTable({ 
  attendanceRecords, 
  students, 
  classes,
  onMarkAttendance,
  selectedDate = new Date(),
  selectedClassId
}: AttendanceTableProps) {
  const getStudentById = (id: string) => students.find(s => s.id === id);
  const getClassById = (id: string) => classes.find(c => c.id === id);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusIcon = (status: 'present' | 'absent' | 'late' | 'excused') => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'late':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'excused':
        return <AlertCircle className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadgeVariant = (status: 'present' | 'absent' | 'late' | 'excused') => {
    switch (status) {
      case 'present':
        return 'default';
      case 'absent':
        return 'destructive';
      case 'late':
        return 'secondary';
      case 'excused':
        return 'outline';
    }
  };

  // Filter records by selected date and class
  const filteredRecords = attendanceRecords.filter(record => {
    const recordDate = new Date(record.date).toDateString();
    const targetDate = selectedDate.toDateString();
    const dateMatch = recordDate === targetDate;
    const classMatch = selectedClassId ? record.classId === selectedClassId : true;
    return dateMatch && classMatch;
  });

  // Get unique students for the filtered records
  const uniqueStudents = Array.from(
    new Set(filteredRecords.map(record => record.studentId))
  ).map(studentId => getStudentById(studentId)).filter(Boolean) as Student[];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance - {selectedDate.toLocaleDateString()}
          </CardTitle>
          {selectedClassId && (
            <Badge variant="outline">
              {getClassById(selectedClassId)?.name || 'Unknown Class'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time Marked</TableHead>
              <TableHead>Notes</TableHead>
              {onMarkAttendance && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => {
              const student = getStudentById(record.studentId);
              const classInfo = getClassById(record.classId);
              
              if (!student || !classInfo) return null;

              return (
                <TableRow key={record.id} className="hover:bg-card-hover">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.studentId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{classInfo.name}</div>
                      <div className="text-sm text-muted-foreground">{classInfo.subject}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <Badge variant={getStatusBadgeVariant(record.status)}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(record.markedAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {record.notes || '-'}
                    </span>
                  </TableCell>
                  {onMarkAttendance && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAttendance(record.studentId, record.classId, 'present')}
                          className="h-7 px-2 text-success hover:text-success"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAttendance(record.studentId, record.classId, 'absent')}
                          className="h-7 px-2 text-destructive hover:text-destructive"
                        >
                          <XCircle className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAttendance(record.studentId, record.classId, 'late')}
                          className="h-7 px-2 text-warning hover:text-warning"
                        >
                          <Clock className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        {filteredRecords.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No attendance records found for the selected date and class.
          </div>
        )}
      </CardContent>
    </Card>
  );
}