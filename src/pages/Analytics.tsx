import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { UserRole } from "@/types";
import { mockStudents, mockClasses, mockAttendanceRecords } from "@/data/mockData";
import { useState } from "react";

const Analytics = () => {
  const [currentUser] = useState({
    role: 'admin' as UserRole,
    name: 'Sarah Johnson'
  });

  // Calculate analytics data
  const attendanceByMonth = [
    { month: 'Jan', present: 85, absent: 15 },
    { month: 'Feb', present: 88, absent: 12 },
    { month: 'Mar', present: 82, absent: 18 },
    { month: 'Apr', present: 90, absent: 10 },
    { month: 'May', present: 87, absent: 13 },
    { month: 'Jun', present: 92, absent: 8 },
  ];

  const classwiseAttendance = mockClasses.map(cls => {
    const classRecords = mockAttendanceRecords.filter(record => record.classId === cls.id);
    const presentCount = classRecords.filter(record => record.status === 'present').length;
    const attendanceRate = classRecords.length > 0 ? Math.round((presentCount / classRecords.length) * 100) : 0;
    
    return {
      className: cls.name,
      attendanceRate,
      totalStudents: cls.students.length
    };
  });

  const attendanceDistribution = [
    { name: 'Present', value: 85, color: 'hsl(var(--primary))' },
    { name: 'Absent', value: 10, color: 'hsl(var(--destructive))' },
    { name: 'Late', value: 3, color: 'hsl(var(--warning))' },
    { name: 'Excused', value: 2, color: 'hsl(var(--muted))' }
  ];

  return (
    <Layout userRole={currentUser.role} userName={currentUser.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive attendance and performance analytics for your school.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.5%</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Performing Class</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Math 101</div>
              <p className="text-xs text-muted-foreground">94% attendance rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students at Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Below 75% attendance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Monthly Attendance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="present" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Present %" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Attendance Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendanceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {attendanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Class-wise Attendance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Class-wise Attendance Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={classwiseAttendance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="className" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="attendanceRate" 
                    fill="hsl(var(--primary))"
                    name="Attendance Rate %" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;