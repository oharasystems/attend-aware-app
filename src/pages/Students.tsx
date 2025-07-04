import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { StudentTable } from "@/components/students/StudentTable";
import { mockStudents } from "@/data/mockData";
import { Student, UserRole } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface StudentsPageProps {
  userRole?: UserRole;
}

export function StudentsPage({ userRole = 'admin' }: StudentsPageProps) {
  const [students, setStudents] = useState(mockStudents);
  const { toast } = useToast();

  const handleEditStudent = (student: Student) => {
    toast({
      title: "Edit Student",
      description: `Editing ${student.name} - This would open an edit form.`,
    });
  };

  const handleDeleteStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    setStudents(students.filter(s => s.id !== studentId));
    toast({
      title: "Student Deleted",
      description: `${student?.name} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const handleAddStudent = () => {
    toast({
      title: "Add Student",
      description: "This would open a form to add a new student.",
    });
  };

  return (
    <Layout userRole={userRole} userName="Sarah Johnson">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage student profiles, enrollment, and class assignments.
          </p>
        </div>
        
        <StudentTable
          students={students}
          onEditStudent={handleEditStudent}
          onDeleteStudent={handleDeleteStudent}
          onAddStudent={handleAddStudent}
        />
      </div>
    </Layout>
  );
}