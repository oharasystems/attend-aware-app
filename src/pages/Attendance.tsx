import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockAttendanceRecords, mockStudents, mockClasses } from "@/data/mockData";
import { UserRole } from "@/types";
import { CalendarDays, Filter, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttendancePageProps {
  userRole?: UserRole;
}

export function AttendancePage({ userRole = 'admin' }: AttendancePageProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [attendanceRecords] = useState(mockAttendanceRecords);
  const { toast } = useToast();

  const handleMarkAttendance = (studentId: string, classId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    toast({
      title: "Attendance Updated",
      description: `Student attendance marked as ${status}.`,
    });
  };

  const handleExportAttendance = () => {
    toast({
      title: "Export Started",
      description: "Attendance data is being exported to CSV.",
    });
  };

  // Filter attendance records based on selected date and class
  const filteredRecords = attendanceRecords.filter(record => {
    const recordDate = new Date(record.date).toDateString();
    const targetDate = selectedDate.toDateString();
    const dateMatch = recordDate === targetDate;
    const classMatch = selectedClass && selectedClass !== "all" ? record.classId === selectedClass : true;
    return dateMatch && classMatch;
  });

  // Calculate today's stats
  const todayStats = {
    total: filteredRecords.length,
    present: filteredRecords.filter(r => r.status === 'present').length,
    absent: filteredRecords.filter(r => r.status === 'absent').length,
    late: filteredRecords.filter(r => r.status === 'late').length,
    excused: filteredRecords.filter(r => r.status === 'excused').length,
  };

  return (
    <Layout userRole={userRole} userName="Sarah Johnson">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
            <p className="text-muted-foreground">
              Track and manage student attendance across all classes.
            </p>
          </div>
          <Button onClick={handleExportAttendance} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Date and Filter Controls */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CalendarDays className="h-4 w-4" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="All classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All classes</SelectItem>
                    {mockClasses.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Stats */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{todayStats.total}</div>
                  <p className="text-xs text-muted-foreground">Total Records</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-success">{todayStats.present}</div>
                  <p className="text-xs text-muted-foreground">Present</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-destructive">{todayStats.absent}</div>
                  <p className="text-xs text-muted-foreground">Absent</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-warning">{todayStats.late}</div>
                  <p className="text-xs text-muted-foreground">Late</p>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Table */}
            <AttendanceTable
              attendanceRecords={filteredRecords}
              students={mockStudents}
              classes={mockClasses}
              onMarkAttendance={userRole === 'teacher' || userRole === 'admin' ? handleMarkAttendance : undefined}
              selectedDate={selectedDate}
              selectedClassId={selectedClass}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}