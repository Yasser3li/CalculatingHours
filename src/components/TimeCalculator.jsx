import React, { useState, useEffect } from "react";
import "./TimeCalculator.css"; // Import the CSS

const TimeCalculator = () => {
  const [timeData, setTimeData] = useState("");
  const [workedTimes, setWorkedTimes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const calculateWorkedTime = (e) => {
    e.preventDefault();

    const lines = timeData.split("\n").filter((line) => line.trim() !== "");
    const newWorkedTimes = lines.map((line) => {
      const [date, arrivalTime, leavingTime] = line.split(/\s+/);
      const enteredArrivalHour = Math.floor(arrivalTime / 100);
      const enteredArrivalMinute = arrivalTime % 100;
      const enteredLeavingHour = Math.floor(leavingTime / 100);
      const enteredLeavingMinute = leavingTime % 100;

      let workedHours = enteredLeavingHour - enteredArrivalHour;
      let workedMinutes = enteredLeavingMinute - enteredArrivalMinute;

      if (workedMinutes < 0) {
        workedMinutes += 60;
        workedHours -= 1;
      }

      let overtimeMinutes = 0;
      let lackTimeMinutes = 0;

      if (workedHours >= 8) {
        overtimeMinutes = (workedHours - 8) * 60 + workedMinutes;
      } else {
        lackTimeMinutes = (8 - workedHours) * 60 - workedMinutes;
      }

      return {
        date,
        workedHours,
        workedMinutes,
        overtimeMinutes,
        lackTimeMinutes,
      };
    });

    setWorkedTimes(newWorkedTimes);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <h1>Work Time Calculator</h1>
      <form onSubmit={calculateWorkedTime}>
        <textarea
          rows="10"
          placeholder="Paste your time data here (e.g., 2021-08-24 915 1700)"
          value={timeData}
          onChange={(e) => setTimeData(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      <h2>Calculated Work Times</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>WorkTime</th>
            <th>Overtime</th>
            <th>Time Lacking</th>
          </tr>
        </thead>
        <tbody>
          {workedTimes.map((time, index) => (
            <tr key={index}>
              <td>{time.date}</td>
              <td>{`${time.workedHours} hours and ${time.workedMinutes} minutes`}</td>
              <td>
                {time.overtimeMinutes > 0
                  ? `${time.overtimeMinutes} minutes`
                  : ""}
              </td>
              <td>
                {time.lackTimeMinutes > 0
                  ? `${time.lackTimeMinutes} minutes`
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
};

export default TimeCalculator;
