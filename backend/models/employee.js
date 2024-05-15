import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const EmployeeSchema = new Schema({
  empId: {
    type: String,
    unique: true,
  },
  name: String,
  education: String,
  designation: String,
  paySlip: Object,
  doj: String,
  location: String,
  department: String,
  dialCode: String,
  phone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  ctc: Number,
});

const Employee = model("Employee", EmployeeSchema);

export default Employee;
