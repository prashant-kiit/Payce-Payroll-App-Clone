import { doesMessageExist, popMessage } from "./messageQueue";

const monthlyAttendance = async () => {
  while (true) {
    if (doesMessageExist) {
      // pull daily attendance and aggregate as monthly attendance
      console.log(
        "Daily Attendance Update received. Monthly Attendance is Updating"
      );

      await popMessage();
    } else {
      // put a message for user
      console.log("Monthly Attendance is Updated");
    }
  }
};
