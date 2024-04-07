import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const CurrentMonthAttendanceAggregateSchema = new Schema({
  _id: Number,
  totalAttendance: Number,
});

const CurrentMonthAttendanceAggregate = model(
  "CurrentMonthAttendanceAggregateSchema",
  CurrentMonthAttendanceAggregateSchema
);

export default CurrentMonthAttendanceAggregate;
