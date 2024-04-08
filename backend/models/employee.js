import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const EmployeeSchema = new Schema({
  empId: String,
  name: String,
  education: String,
  designation: String,
  doj: String,
  location: String,
  department: String,
  dialCode: String,
  phone: String,
  email: String,
  ctc: Number,
});

const Employee = model("Employee", EmployeeSchema);

export default Employee;
