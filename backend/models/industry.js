import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const IndustrySchema = new Schema({
  id: Number,
  name: String,
});

const Industry = model("industrys", IndustrySchema);

export default Industry;
