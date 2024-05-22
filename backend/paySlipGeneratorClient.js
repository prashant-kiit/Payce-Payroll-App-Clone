import dbconnect from "./database.js";
import axios from "axios";
import scheduler from "node-schedule";
import PayDrive from "./models/payDrive.js";

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
}

async function startPayDayAssignment() {
  try {
    const payDrive = await PayDrive.find();

    const [year, month, day] = payDrive[0].payDay.split("-");

    const payTime = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      20,
      40,
      0
    );

    scheduler.scheduleJob(payTime, async () => {
      await startPaySlipGeneration();
      await PayDrive.findOneAndUpdate(
        { payDay: payDrive[0].payDay },
        {
          paid: true,
        },
        { new: true }
      );
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
