import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const SalaryComponentSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  payType: String,
  calculationType: String,
  amount: Number,
});

const SalaryComponent = model("SalaryComponents", SalaryComponentSchema);

export default SalaryComponent;
