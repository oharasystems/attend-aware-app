import { useState } from "react";
import { Student } from "@/types";
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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

interface StudentTableProps {
  students: Student[];
  onEditStudent?: (student: Student) => void;
  onDeleteStudent?: (studentId: string) => void;
  onAddStudent?: () => void;
  showActions?: boolean;
}

export function StudentTable({ 
  students, 
  onEditStudent, 
  onDeleteStudent, 
  onAddStudent,
  showActions = true 
}: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Students</CardTitle>
          {showActions && onAddStudent && (
            <Button onClick={onAddStudent} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Classes</TableHead>
              <TableHead>Enrollment Date</TableHead>
              {showActions && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-card-hover">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {getInitials(student.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{student.studentId}</Badge>
                </TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {student.classes.slice(0, 3).map((classId) => (
                      <Badge key={classId} variant="secondary" className="text-xs">
                        Class {classId}
                      </Badge>
                    ))}
                    {student.classes.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{student.classes.length - 3} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(student.enrollmentDate).toLocaleDateString()}
                </TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {onEditStudent && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEditStudent(student)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onDeleteStudent && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteStudent(student.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? "No students found matching your search." : "No students yet."}
          </div>
        )}
      </CardContent>
    </Card>
  );
}