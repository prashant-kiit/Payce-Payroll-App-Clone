import dbconnect from "./database.js";
import axios from "axios";
import scheduler from "node-schedule";
import PayDrive from "./models/payDrive.js";
import PayDriveHistory from "./models/payDriveHistory.js";

async function startPaySlipGeneration() {
  const response = await axios.get("http://127.0.0.1:3000/app/paySlip", {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  console.log({
    status: response.status,
    data: response.data,
  });

  return response.status;
}

async function startPayDayAssignment() {
  try {
    const payDrive = await PayDrive.find();

    const [year, month, day] = payDrive[0].payDay.split("-");

    const payTime = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      22,
      29,
      0
    );

    scheduler.scheduleJob(payTime, async () => {
      const status = await startPaySlipGeneration();

      if (!status === 200) return new Error("Pay Slip Generation failed");

      const payDriveReturned = await PayDrive.findOneAndUpdate(
        { payDay: payDrive[0].payDay },
        {
          paid: true,
        },
        { new: true }
      );

      // console.log(payDriveReturned);

      if (!payDriveReturned.paid)
        return new Error("Paid Status not updated to true");

      const lastPayDrive = new PayDriveHistory({
        totalPayment: payDriveReturned.totalPayment,
        totalEmployee: payDriveReturned.totalEmployee,
        payDay: payDriveReturned.payDay,
        paid: payDriveReturned.paid,
      });

      await lastPayDrive.save();

      process.exit(0);
    });
  } catch (error) {
    console.log("Client-Error");
    console.log(error);
    process.exit(1);
  }
}

await dbconnect();

await startPayDayAssignment();
