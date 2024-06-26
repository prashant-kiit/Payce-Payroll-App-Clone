import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const PayDriveSchema = new Schema({
  totalPayment: Number,
  totalEmployee: Number,
  payDay: String,
  paid: Boolean,
});

const PayDrive = model("PayDrives", PayDriveSchema);

export default PayDrive;
