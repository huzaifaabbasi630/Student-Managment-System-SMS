import React from 'react';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '../components/ui/popover';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Calendar as CalendarIcon, Check, X, Clock } from 'lucide-react';
import { format } from 'date-fns';
import api from '../lib/api';
import { toast } from 'sonner';

export const AttendancePage: React.FC = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [classes, setClasses] = React.useState<any[]>([]);
  const [selectedClass, setSelectedClass] = React.useState<string>('');
  const [students, setStudents] = React.useState<any[]>([]);
  const [attendance, setAttendance] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get('/classes');
        setClasses(res.data);
      } catch (error) {
        toast.error('Failed to fetch classes');
      }
    };
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    if (!selectedClass) return;
    setLoading(true);
    try {
      const res = await api.get('/students');
      const classStudents = res.data.filter((s: any) => s.class?._id === selectedClass);
      setStudents(classStudents);
      
      // Fetch existing attendance for this date
      const attRes = await api.get(`/attendance?date=${format(date, 'yyyy-MM-dd')}`);
      const attMap: Record<string, string> = {};
      attRes.data.forEach((a: any) => {
        attMap[a.student._id] = a.status;
      });
      setAttendance(attMap);
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchStudents();
  }, [selectedClass, date]);

  const markAttendance = async (studentId: string, status: string) => {
    try {
      await api.post('/attendance/mark', {
        studentId,
        date: format(date, 'yyyy-MM-dd'),
        status
      });
      setAttendance(prev => ({ ...prev, [studentId]: status }));
      toast.success('Attendance marked');
    } catch (error) {
      toast.error('Failed to mark attendance');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-60 justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Class</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Choose a class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedClass ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8">Loading...</TableCell></TableRow>
              ) : students.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8">No students in this class</TableCell></TableRow>
              ) : students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.user.name}</TableCell>
                  <TableCell>
                    {attendance[student._id] ? (
                      <Badge variant={
                        attendance[student._id] === 'present' ? 'default' : 
                        attendance[student._id] === 'absent' ? 'destructive' : 'outline'
                      }>
                        {attendance[student._id]}
                      </Badge>
                    ) : (
                      <span className="text-gray-400 text-sm italic">Not marked</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      size="sm" 
                      variant={attendance[student._id] === 'present' ? 'default' : 'outline'}
                      onClick={() => markAttendance(student._id, 'present')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check size={16} className="mr-1" /> Present
                    </Button>
                    <Button 
                      size="sm" 
                      variant={attendance[student._id] === 'absent' ? 'destructive' : 'outline'}
                      onClick={() => markAttendance(student._id, 'absent')}
                    >
                      <X size={16} className="mr-1" /> Absent
                    </Button>
                    <Button 
                      size="sm" 
                      variant={attendance[student._id] === 'late' ? 'secondary' : 'outline'}
                      onClick={() => markAttendance(student._id, 'late')}
                    >
                      <Clock size={16} className="mr-1" /> Late
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl text-gray-400">
          Please select a class to view attendance
        </div>
      )}
    </div>
  );
};
