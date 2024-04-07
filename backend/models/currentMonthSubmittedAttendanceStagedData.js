import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const CurrentMonthSubmittedAttendanceStagedSchema = new Schema({
  empId: Number,
  currentMonthSubmissionDateAndTime: String,
  currentMonthAttendanceDates: Object,
});

const CurrentMonthSubmittedAttendanceStaged = model(
  "CurrentMonthSubmittedAttendanceStaged",
  CurrentMonthSubmittedAttendanceStagedSchema
);

export default CurrentMonthSubmittedAttendanceStaged;
