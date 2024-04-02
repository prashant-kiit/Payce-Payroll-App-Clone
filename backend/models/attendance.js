import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const AttendanceSchema = new Schema({
    empId: Number,
    attendanceDates: Object,
});

const Attendance = model('Attendance', AttendanceSchema);

export default Attendance;