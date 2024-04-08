import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const DesignationSchema = new Schema({
  id: Number,
  name: String,
});

const Designation = model("designations", DesignationSchema);

export default Designation;