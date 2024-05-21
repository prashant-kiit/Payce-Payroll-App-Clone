import axios from "axios";
import scheduler from "node-schedule";

async function startPaySlipGeneration() {
  try {
    const response = await axios.get("http://127.0.0.1:3000/app/paySlip", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    console.log(response);
  } catch (error) {
    console.log("Client-Error");
    console.log(error);
  }
}

const payDay = new Date(2024, 4, 22, 0, 21, 0);

scheduler.scheduleJob(payDay, async () => {
  await startPaySlipGeneration();
});
