import React, { useState } from "react";
import "./TimeCalculator.css"; // Import the CSS

const TimeCalculator = () => {
  const [arrivalTime, setArrivalTime] = useState("");
  const [leavingTime, setLeavingTime] = useState(""); // New State for Leaving Time
  const [workedTime, setWorkedTime] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const calculateWorkedTime = () => {
    const enteredArrivalHour = Math.floor(arrivalTime / 100);
    const enteredArrivalMinute = arrivalTime % 100;

    const enteredLeavingHour = Math.floor(leavingTime / 100); // New Code
    const enteredLeavingMinute = leavingTime % 100; // New Code

    let workedHours = enteredLeavingHour - enteredArrivalHour;
    let workedMinutes = enteredLeavingMinute - enteredArrivalMinute;

    if (workedMinutes < 0) {
      workedMinutes += 60;
      workedHours -= 1;
    }

    setWorkedTime(`${workedHours} hours and ${workedMinutes} minutes`);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <h1>Work Time Calculator</h1>
      <input
        type="number"
        placeholder="Arrival time"
        value={arrivalTime}
        onChange={(e) => setArrivalTime(e.target.value)}
      />
      <input
        type="number"
        placeholder="Leaving time" // New Input Field
        value={leavingTime}
        onChange={(e) => setLeavingTime(e.target.value)}
      />
      <button onClick={calculateWorkedTime}>Calculate</button>
      <p>Time worked: {workedTime}</p>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
      <br />
      <br />
      <br />
      <br />
      <h4>From: Yasser</h4>
      <h4>To: Jomanah</h4>
    </div>
  );
};

export default TimeCalculator;
