import mongoose, { Schema, Document, Model } from 'mongoose';

// User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
  isApproved: boolean;
  avatar?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
  isApproved: { type: Boolean, default: false },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

// Class
export interface IClass extends Document {
  name: string;
  teacher: mongoose.Types.ObjectId;
}

const ClassSchema = new Schema<IClass>({
  name: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
});

export const Class = (mongoose.models.Class as Model<IClass>) || mongoose.model<IClass>('Class', ClassSchema);

// Section
export interface ISection extends Document {
  name: string;
  class: mongoose.Types.ObjectId;
}

const SectionSchema = new Schema<ISection>({
  name: { type: String, required: true },
  class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
});

export const Section = (mongoose.models.Section as Model<ISection>) || mongoose.model<ISection>('Section', SectionSchema);

// Student
export interface IStudent extends Document {
  user: mongoose.Types.ObjectId;
  rollNumber: string;
  class: mongoose.Types.ObjectId;
  section: mongoose.Types.ObjectId;
  parentName?: string;
  contactNumber?: string;
  address?: string;
  dateOfBirth?: Date;
}

const StudentSchema = new Schema<IStudent>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rollNumber: { type: String, required: true, unique: true },
  class: { type: Schema.Types.ObjectId, ref: 'Class' },
  section: { type: Schema.Types.ObjectId, ref: 'Section' },
  parentName: { type: String },
  contactNumber: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
});

export const Student = (mongoose.models.Student as Model<IStudent>) || mongoose.model<IStudent>('Student', StudentSchema);

// Teacher
export interface ITeacher extends Document {
  user: mongoose.Types.ObjectId;
  employeeId: string;
  subjects: string[];
  contactNumber?: string;
}

const TeacherSchema = new Schema<ITeacher>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: String, required: true, unique: true },
  subjects: [{ type: String }],
  contactNumber: { type: String },
});

export const Teacher = (mongoose.models.Teacher as Model<ITeacher>) || mongoose.model<ITeacher>('Teacher', TeacherSchema);

// Attendance
export interface IAttendance extends Document {
  student: mongoose.Types.ObjectId;
  date: Date;
  status: 'present' | 'absent' | 'late';
  markedBy: mongoose.Types.ObjectId;
}

const AttendanceSchema = new Schema<IAttendance>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'late'], required: true },
  markedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Attendance = (mongoose.models.Attendance as Model<IAttendance>) || mongoose.model<IAttendance>('Attendance', AttendanceSchema);

// Exam
export interface IExam extends Document {
  name: string;
  date?: Date;
  class: mongoose.Types.ObjectId;
  subjects: { name: string; maxMarks: number }[];
}

const ExamSchema = new Schema<IExam>({
  name: { type: String, required: true },
  date: { type: Date },
  class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  subjects: [{
    name: { type: String, required: true },
    maxMarks: { type: Number, default: 100 },
  }],
});

export const Exam = (mongoose.models.Exam as Model<IExam>) || mongoose.model<IExam>('Exam', ExamSchema);

// Result
export interface IResult extends Document {
  exam: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  marks: { subject: string; obtained: number }[];
  totalMarks?: number;
  percentage?: number;
  grade?: string;
}

const ResultSchema = new Schema<IResult>({
  exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  marks: [{
    subject: { type: String, required: true },
    obtained: { type: Number, required: true },
  }],
  totalMarks: { type: Number },
  percentage: { type: Number },
  grade: { type: String },
});

export const Result = (mongoose.models.Result as Model<IResult>) || mongoose.model<IResult>('Result', ResultSchema);

// Fee
export interface IFee extends Document {
  student: mongoose.Types.ObjectId;
  amount: number;
  dueDate: Date;
  status: 'paid' | 'unpaid' | 'partial';
  paidDate?: Date;
  description?: string;
}

const FeeSchema = new Schema<IFee>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'unpaid', 'partial'], default: 'unpaid' },
  paidDate: { type: Date },
  description: { type: String },
});

export const Fee = (mongoose.models.Fee as Model<IFee>) || mongoose.model<IFee>('Fee', FeeSchema);

// Notification
export interface INotification extends Document {
  recipient?: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'announcement' | 'alert' | 'info';
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['announcement', 'alert', 'info'], default: 'info' },
  createdAt: { type: Date, default: Date.now },
});

export const Notification = (mongoose.models.Notification as Model<INotification>) || mongoose.model<INotification>('Notification', NotificationSchema);
