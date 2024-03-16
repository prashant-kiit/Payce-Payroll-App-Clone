import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const EmployeeSchema = new Schema({
    id: Number,
    name: String,
    unitId: Number,
    experience: Number,
    salary: String,
});

const Employee = model('Employee', EmployeeSchema);

export default Employee;