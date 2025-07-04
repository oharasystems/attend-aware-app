import { Users, BookOpen, UserCheck, TrendingUp } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StudentTable } from "@/components/students/StudentTable";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types";
import { mockStudents, mockClasses, mockAttendanceRecords } from "@/data/mockData";

interface DashboardProps {
  userRole: UserRole;
}

export function Dashboard({ userRole }: DashboardProps) {
  // Calculate dashboard stats
  const totalStudents = mockStudents.length;
  const totalClasses = mockClasses.length;
  
  // Calculate today's attendance
  const today = new Date();
  const todayRecords = mockAttendanceRecords.filter(record => 
    new Date(record.date).toDateString() === today.toDateString()
  );
  const presentToday = todayRecords.filter(record => record.status === 'present').length;
  const attendanceRate = todayRecords.length > 0 ? Math.round((presentToday / todayRecords.length) * 100) : 0;

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Students"
          value={totalStudents}
          description="Active enrolled students"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Total Classes"
          value={totalClasses}
          description="Active classes this semester"
          icon={BookOpen}
          trend={{ value: 8, isPositive: true }}
        />
        <DashboardCard
          title="Today's Attendance"
          value={`${attendanceRate}%`}
          description={`${presentToday}/${todayRecords.length} students present`}
          icon={UserCheck}
          trend={{ value: 5, isPositive: true }}
        />
        <DashboardCard
          title="Monthly Growth"
          value="15%"
          description="Student enrollment growth"
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Recent Students and Attendance */}
      <div className="grid gap-6 lg:grid-cols-2">
        <StudentTable 
          students={mockStudents.slice(0, 5)} 
          showActions={false}
        />
        <AttendanceTable
          attendanceRecords={todayRecords.slice(0, 10)}
          students={mockStudents}
          classes={mockClasses}
          selectedDate={today}
        />
      </div>
    </div>
  );

  const renderTeacherDashboard = () => {
    const teacherClasses = mockClasses.filter(cls => cls.teacherId === '2'); // Mock teacher ID
    const teacherStudents = mockStudents.filter(student => 
      student.classes.some(classId => teacherClasses.some(cls => cls.id === classId))
    );

    return (
      <div className="space-y-6">
        {/* Teacher Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            title="My Classes"
            value={teacherClasses.length}
            description="Classes you're teaching"
            icon={BookOpen}
          />
          <DashboardCard
            title="My Students"
            value={teacherStudents.length}
            description="Students in your classes"
            icon={Users}
          />
          <DashboardCard
            title="Today's Attendance"
            value={`${attendanceRate}%`}
            description="Average for your classes"
            icon={UserCheck}
          />
        </div>

        {/* My Classes Overview */}
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherClasses.map(cls => (
                <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{cls.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cls.students.length} students • {cls.room}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Next: Today 9:00 AM</p>
                    <p className="text-xs text-muted-foreground">Room {cls.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderStudentDashboard = () => {
    const studentId = 'st1'; // Mock student ID
    const student = mockStudents.find(s => s.id === studentId);
    const studentClasses = mockClasses.filter(cls => student?.classes.includes(cls.id));
    const studentRecords = mockAttendanceRecords.filter(record => record.studentId === studentId);
    const presentCount = studentRecords.filter(record => record.status === 'present').length;
    const myAttendanceRate = studentRecords.length > 0 ? Math.round((presentCount / studentRecords.length) * 100) : 0;

    return (
      <div className="space-y-6">
        {/* Student Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            title="My Classes"
            value={studentClasses.length}
            description="Enrolled classes"
            icon={BookOpen}
          />
          <DashboardCard
            title="My Attendance"
            value={`${myAttendanceRate}%`}
            description="Overall attendance rate"
            icon={UserCheck}
          />
          <DashboardCard
            title="Present Days"
            value={presentCount}
            description={`Out of ${studentRecords.length} total`}
            icon={TrendingUp}
          />
        </div>

        {/* My Classes */}
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentClasses.map(cls => (
                <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{cls.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cls.subject} • {cls.teacherName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Next: Mon 9:00 AM</p>
                    <p className="text-xs text-muted-foreground">{cls.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderParentDashboard = () => {
    const childId = 'st1'; // Mock child ID
    const child = mockStudents.find(s => s.id === childId);
    const childClasses = mockClasses.filter(cls => child?.classes.includes(cls.id));
    const childRecords = mockAttendanceRecords.filter(record => record.studentId === childId);
    const presentCount = childRecords.filter(record => record.status === 'present').length;
    const childAttendanceRate = childRecords.length > 0 ? Math.round((presentCount / childRecords.length) * 100) : 0;

    return (
      <div className="space-y-6">
        {/* Child Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            title="Child's Classes"
            value={childClasses.length}
            description={`${child?.name}'s enrolled classes`}
            icon={BookOpen}
          />
          <DashboardCard
            title="Attendance Rate"
            value={`${childAttendanceRate}%`}
            description="This semester"
            icon={UserCheck}
          />
          <DashboardCard
            title="Present Days"
            value={presentCount}
            description={`Out of ${childRecords.length} days`}
            icon={TrendingUp}
          />
        </div>

        {/* Child's Recent Attendance */}
        <AttendanceTable
          attendanceRecords={childRecords.slice(0, 10)}
          students={mockStudents}
          classes={mockClasses}
        />
      </div>
    );
  };

  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return renderAdminDashboard();
      case 'teacher':
        return renderTeacherDashboard();
      case 'student':
        return renderStudentDashboard();
      case 'parent':
        return renderParentDashboard();
      default:
        return renderAdminDashboard();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {userRole === 'admin' && "Overview of your school's performance and activities."}
          {userRole === 'teacher' && "Manage your classes and track student progress."}
          {userRole === 'student' && "View your classes, attendance, and academic progress."}
          {userRole === 'parent' && "Monitor your child's academic progress and attendance."}
        </p>
      </div>
      
      {renderDashboard()}
    </div>
  );
}