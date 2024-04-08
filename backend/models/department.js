import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const DepartmentSchema = new Schema({
  id: Number,
  name: String,
});

const Department = model("departments", DepartmentSchema);

export default Department;
