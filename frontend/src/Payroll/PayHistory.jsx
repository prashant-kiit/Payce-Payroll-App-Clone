import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function PayHistory() {
  console.log("Pay History Running");

  const [payDriveHistory, setPayDriveHistory] = useState([]);
  let id = 0;
  const payDriveHistoryGet = useQuery({
    queryKey: ["payDriveHistoryGet"],
    queryFn: async () => {
      await getPayDriveHistory();
      return true;
    },
  });

  const getPayDriveHistory = async () => {
    const response = await axios("http://127.0.0.1:3000/app/payDriveHistory", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    console.log(response);

    setPayDriveHistory(response.data);
  };

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>PAY HISTORY</p>
      </div>
      <div>
        {payDriveHistoryGet.data &&
          payDriveHistory.map((payDrive) => {
            return (
              <p key={id++}>
                PayDay : {payDrive.payDay}, Total_Payment :{" "}
                {payDrive.totalPayment}, Status :{" "}
                {payDrive.paid ? "Paid" : "Unpaid"}
              </p>
            );
          })}
      </div>
      <div>
        <br />
        <NavLink to="/">Home</NavLink>
      </div>
    </div>
  );
}

export default PayHistory;
