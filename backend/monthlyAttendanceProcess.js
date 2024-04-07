import { connect } from "mongoose";
import Attendance from "./models/attendance.js";
import CurrentMonthAttendanceAggregate from "./models/currentMonthAttendanceAggregate.js";
import CurrentMonthSubmittedAttendanceStaged from "./models/currentMonthSubmittedAttendanceStagedData.js";

const monthlyAttendanceProcess = async () => {
  try {
    // scheduled to run last day of every month and every year
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const year_month =
      year + "-" + (month.toString().length === 1 ? "0" + month : month);
    const regex = `${year_month}-\\d{2} \\d{2}:\\d{2}:\\d{2}`;

    // console.log("regex");
    // console.log(regex);

    const uri =
      "mongodb+srv://prashantsingh090798:9fWpOKedxKBFx6aX@payroll-app-cluster.clhjsqy.mongodb.net/?retryWrites=true&w=majority&appName=Payroll-App-Cluster";
    await connect(uri);

    const currentMonthSubmittedAttendanceData = await Attendance.find({
      submissionDateAndTime: { $regex: regex },
    });

    // console.log("currentMonthSubmittedAttendanceData");
    // console.log(currentMonthSubmittedAttendanceData);

    await CurrentMonthSubmittedAttendanceStaged.deleteMany({});

    for (const data of currentMonthSubmittedAttendanceData) {
      const currentMonthSubmittedAttendanceStagedData =
        new CurrentMonthSubmittedAttendanceStaged({
          empId: data.empId,
          currentMonthSubmissionDateAndTime: data.submissionDateAndTime,
          currentMonthAttendanceDates: data.attendanceDates,
        });
      await currentMonthSubmittedAttendanceStagedData.save();
    }

    const currentMonthAttendanceAggregateStagedData =
      await CurrentMonthSubmittedAttendanceStaged.aggregate([
        {
          $project: {
            empId: "$empId",
            attendanceValues: {
              $objectToArray: "$currentMonthAttendanceDates",
            },
          },
        },
        {
          $unwind: "$attendanceValues",
        },
        {
          $group: {
            _id: "$empId",
            totalAttendance: { $sum: { $toInt: "$attendanceValues.v" } },
          },
        },
      ]);

    // console.log("currentMonthAttendanceAggregateStagedData");
    // console.log(currentMonthAttendanceAggregateStagedData);

    await CurrentMonthAttendanceAggregate.deleteMany({});

    for (const data of currentMonthAttendanceAggregateStagedData) {
      const currentMonthAttendanceAggregateData =
        new CurrentMonthAttendanceAggregate({
          _id: data._id,
          totalAttendance: data.totalAttendance,
        });

      await currentMonthAttendanceAggregateData.save();
    }

    console.log("Monthly Attendance and Aggragate Updated in Database");
  } catch (err) {
    console.log("error");
    console.log(err);
  }
};

monthlyAttendanceProcess();
