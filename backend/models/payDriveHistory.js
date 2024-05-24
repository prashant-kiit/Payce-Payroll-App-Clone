import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const PayDriveHistorySchema = new Schema({
  totalPayment: Number,
  totalEmployee: Number,
  payDay: String,
  paid: Boolean,
});

const PayDriveHistory = model("PayDriveHistorys", PayDriveHistorySchema);

export default PayDriveHistory;
