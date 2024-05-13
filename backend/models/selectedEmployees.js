import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const SelectedEmployeeSchema = new Schema({
  empId: {
    type: String,
    unique: true,
  },
  ctc: Number,
});

const SelectedEmployee = model("SelectedEmployees", SelectedEmployeeSchema);

export default SelectedEmployee;
