import { useState } from "react";
import "./App.css";
import emailjs from "@emailjs/browser";

function App() {
  const [oldSalary, setOldSalary] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

const calculateHike = () => {
  setError("");
  setResult(null);

  const oldVal = parseFloat(oldSalary);
  const newVal = parseFloat(newSalary);

  if (!oldVal || !newVal || oldVal <= 0 || newVal <= 0) {
    setError("Please enter valid salary values.");
    return;
  }

  const hikeAmount = newVal - oldVal;
  const hikePercent = (hikeAmount / oldVal) * 100;

  setResult({ hikeAmount, hikePercent });

  // 🚀 Send email
  emailjs.send(
    "service_9s7h5on",
    "template_o4oxb0d",
    {
      old_salary: oldVal,
      new_salary: newVal,
      hike_percent: hikePercent.toFixed(2),
    },
    "mDwZM-hWlJ15XtoXS"
  )
  .then(() => {
    console.log("Email sent successfully");
  })
  .catch((error) => {
    console.error("Email failed:", error);
  });
};

  const reset = () => {
    setOldSalary("");
    setNewSalary("");
    setResult(null);
    setError("");
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="heading-main">Salary Hike Calculator 💼</h1>

        <input
          type="number"
          placeholder="Current Salary (₹)"
          value={oldSalary}
          onChange={(e) => setOldSalary(e.target.value)}
        />

        <input
          type="number"
          placeholder="New Salary (₹)"
          value={newSalary}
          onChange={(e) => setNewSalary(e.target.value)}
        />

        <div className="buttons">
          <button className="calc" onClick={calculateHike}>Calculate</button>
          <button className="reset" onClick={reset}>
            Reset
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <p>
              📈 Hike Percentage:{" "}
              <strong>{result.hikePercent.toFixed(2)}%</strong>
            </p>
            <p>
              💰 Hike Amount: <strong>₹{result.hikeAmount.toFixed(2)}</strong>
            </p>

            <p className="tagline">
              {result.hikePercent < 10 && "Low hike"}
              {result.hikePercent >= 10 && result.hikePercent < 25 && "Average hike"}
              {result.hikePercent >= 25 && result.hikePercent < 50 && "Strong hike 🚀"}
              {result.hikePercent >= 50 && "Excellent hike 🔥"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;