import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const SalaryTemplateSchema = new Schema({
  profile: {
    type: String,
    unique: true,
  },
  basic: Number,
  ctc: Number,
  salaryComponents: Array,
});

const SalaryTemplate = model("SalaryTemplates", SalaryTemplateSchema);

export default SalaryTemplate;
