import React, { useState, useEffect, useRef } from "react";
import "./TimeCalculator.css"; // Import the CSS

const TimeCalculator = () => {
  const [arrivalTime, setArrivalTime] = useState("");
  const [leavingTime, setLeavingTime] = useState("");
  const [workedTime, setWorkedTime] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const arrivalTimeRef = useRef(null); // Create a ref for the arrival time input field

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "c" || e.key === "C") {
        setArrivalTime("");
        setLeavingTime("");
        setWorkedTime("");
        arrivalTimeRef.current.focus(); // Set focus back to the first input field
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const calculateWorkedTime = (e) => {
    e.preventDefault();

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

    setWorkedTime(`${workedHours} hours and ${workedMinutes} minutes`);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <h1>Work Time Calculator</h1>
      <form onSubmit={calculateWorkedTime}>
        <input
          ref={arrivalTimeRef} // Use the ref here
          type="number"
          placeholder="Enter your arrival time (e.g., 915)"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter your leaving time (e.g., 1700)"
          value={leavingTime}
          onChange={(e) => setLeavingTime(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
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
