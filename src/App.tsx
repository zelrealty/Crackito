import React, { useState } from "react";
import "./App.css";

const SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyB548qtWGscUlP-mS3OQSC1ZS3jtteLTUEK4HBAK7oBgQ3Mnli76Yb_T0LuOpgmFZ4/exec";

export default function App() {
  const [step, setStep] = useState(0);
  const [withAlcohol, setWithAlcohol] = useState<boolean | null>(null);
  const [qty, setQty] = useState(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const next = () => setStep((s) => s + 1);

  async function handleSubmit() {
    try {
      await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          with_alcohol: withAlcohol ? "With alcohol ($22)" : "Without alcohol ($17)",
          quantity: qty,
          phone,
          name,
        }),
      });
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="app">
      <div className="page-glow" />

      {/* ---- Banner ---- */}
      <header className="banner">
        <img src="/CrackitoFALL.png" alt="Crackito Logo" className="logo" />
      </header>

      {/* ---- Title ---- */}
      <h1 className="order-title">Order Form</h1>

      {/* ---- Island Frame ---- */}
      <main className="form-section">
        <div className="island-container">
          <img src="/PR_Frame.png" alt="Puerto Rico Frame" className="island-outline" />
          <div className="form-box">
            {!done ? (
              <>
                {step === 0 && (
                  <>
                    <p className="question">Choose an option</p>
                    <button
                      className="btn btn-red"
                      onClick={() => {
                        setWithAlcohol(true);
                        next();
                      }}
                    >
                      With alcohol ($22)
                    </button>
                    <button
                      className="btn btn-orange"
                      onClick={() => {
                        setWithAlcohol(false);
                        next();
                      }}
                    >
                      Without alcohol ($17)
                    </button>
                  </>
                )}

                {step === 1 && (
                  <>
                    <p className="question">How many bottles?</p>
                    <select
                      className="field"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[1, 2, 3].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <button className="btn btn-confirm" onClick={next}>
                      Confirm
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <p className="question">Enter your phone number</p>
                    <input
                      className="field"
                      type="tel"
                      placeholder="(123) 456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <button
                      className="btn btn-confirm"
                      disabled={!phone}
                      onClick={next}
                    >
                      Confirm
                    </button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <p className="question">Enter your full name</p>
                    <input
                      className="field"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button
                      className="btn btn-confirm"
                      disabled={!name}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </>
                )}

                {error && <p className="error">{error}</p>}
              </>
            ) : (
              <>
                <p className="thanks">Order received 🎉</p>
                <p className="summary">
                  Pay upon delivery. If drive is over 15 minutes, please consider
                  giving extra. Happy Thanksgiving mi gente!
                </p>
              </>
            )}
          </div>
        </div>
      </main>

      {/* ---- Footer ---- */}
      <footer className="footer">
        Delivery window Nov. 18th – 26th 🍂
      </footer>
    </div>
  );
}
