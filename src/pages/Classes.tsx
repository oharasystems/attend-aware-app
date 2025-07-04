import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockClasses, mockStudents } from "@/data/mockData";
import { UserRole } from "@/types";
import { BookOpen, Users, Clock, MapPin, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClassesPageProps {
  userRole?: UserRole;
}

export function ClassesPage({ userRole = 'admin' }: ClassesPageProps) {
  const [classes] = useState(mockClasses);
  const { toast } = useToast();

  const getStudentById = (id: string) => mockStudents.find(s => s.id === id);

  const formatSchedule = (schedule: Array<{ dayOfWeek: number; startTime: string; endTime: string }>) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return schedule.map(s => `${days[s.dayOfWeek]} ${s.startTime}-${s.endTime}`).join(', ');
  };

  const handleAddClass = () => {
    toast({
      title: "Add Class",
      description: "This would open a form to create a new class.",
    });
  };

  return (
    <Layout userRole={userRole} userName="Sarah Johnson">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
            <p className="text-muted-foreground">
              Manage class schedules, assignments, and student enrollment.
            </p>
          </div>
          <Button onClick={handleAddClass} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Class
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{classItem.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {classItem.subject}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{classItem.teacherName}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{classItem.room}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">{formatSchedule(classItem.schedule)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{classItem.students.length} students</span>
                </div>

                {classItem.description && (
                  <p className="text-sm text-muted-foreground">
                    {classItem.description}
                  </p>
                )}

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">Students:</p>
                  <div className="flex -space-x-2">
                    {classItem.students.slice(0, 5).map((studentId) => {
                      const student = getStudentById(studentId);
                      if (!student) return null;
                      
                      const initials = student.name
                        .split(' ')
                        .map(word => word[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2);

                      return (
                        <Avatar key={studentId} className="w-6 h-6 border-2 border-background">
                          <AvatarFallback className="text-xs">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                      );
                    })}
                    {classItem.students.length > 5 && (
                      <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          +{classItem.students.length - 5}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Take Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}