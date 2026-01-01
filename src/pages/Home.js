import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [tip, setTip] = useState("");

  // ✅ Load saved BMI
  useEffect(() => {
    const savedBMI = JSON.parse(localStorage.getItem("bmiData"));
    if (savedBMI) {
      setHeight(savedBMI.height);
      setWeight(savedBMI.weight);
      setBmi(savedBMI.bmi);
      setCategory(savedBMI.category);
      setTip(savedBMI.tip);
    }
  }, []);

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter height and weight");
      return;
    }

    const h = height / 100;
    const bmiValue = (weight / (h * h)).toFixed(2);

    let bmiCategory = "";
    let bmiTip = "";

    if (bmiValue < 18.5) {
      bmiCategory = "Underweight";
      bmiTip = "Increase calorie intake and consult a General Physician if weakness persists.";
    } else if (bmiValue < 25) {
      bmiCategory = "Normal";
      bmiTip = "Maintain your healthy lifestyle with regular exercise and balanced diet.";
    } else if (bmiValue < 30) {
      bmiCategory = "Overweight";
      bmiTip = "Consider regular physical activity and a controlled diet.";
    } else {
      bmiCategory = "Obese";
      bmiTip = "Medical consultation is recommended to manage weight effectively.";
    }

    setBmi(bmiValue);
    setCategory(bmiCategory);
    setTip(bmiTip);

    // ✅ SAVE BMI LOCALLY
    localStorage.setItem(
      "bmiData",
      JSON.stringify({
        height,
        weight,
        bmi: bmiValue,
        category: bmiCategory,
        tip: bmiTip,
      })
    );
  };

  return (
    <div className="home-container">
      <h2 className="welcome-text">
        Welcome to Doc Connect, {user.fullName} 👋
      </h2>

      <p className="sub-text">
        Your trusted platform for connecting with qualified doctors across Hyderabad.
      </p>
      <p className="sub-text">
        Book appointments, calculate your BMI, and receive basic health guidance.
      </p>

      <button className="primary-btn" onClick={() => navigate("/doctors")}>
        Book an Appointment
      </button>

      {/* BMI SECTION */}
      <div className="bmi-card">
        <h3>BMI Calculator</h3>

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <button onClick={calculateBMI}>Calculate BMI</button>

        {bmi && (
          <div className="bmi-result">
            <p><b>Your BMI:</b> {bmi}</p>
            <p><b>Category:</b> {category}</p>
            <p><b>Health Tip:</b> {tip}</p>
          </div>
        )}
      </div>

      {/* ⚠️ HEALTH DISCLAIMER */}
      <div className="disclaimer">
        <p>
          <b>Disclaimer:</b> BMI results and health tips provided by Doc Connect
          are for informational purposes only and should not be considered as
          medical advice. Please consult a qualified doctor for accurate diagnosis
          and treatment.
        </p>
      </div>
    </div>
  );
}

export default Home;
