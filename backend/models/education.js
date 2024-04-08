import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const QualificationSchema = new Schema({
  id: Number,
  name: String,
});

const Qualification = model("qualifications", QualificationSchema);

export default Qualification;
