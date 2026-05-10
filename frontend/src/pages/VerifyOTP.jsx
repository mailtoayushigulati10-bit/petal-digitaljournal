// src/pages/VerifyOTP.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!email || !otp) return;
    setLoading(true);
    try {
      const res = await API.post("/auth/verify", { email, otp });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "something went wrong 🌧️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-6 py-16">
      <div className="card-soft">
        <div className="text-center">
          <div className="text-4xl">✉️🌸</div>
          <h1 className="mt-2 text-3xl font-serif-display">verify your petal</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            we sent a little code to your email
          </p>
        </div>

        <form onSubmit={verifyOTP} className="mt-6 space-y-3">
          <input
            className="input-soft"
            type="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-soft text-center tracking-[0.5em] font-semibold"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="• • • • • •"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          />
          <button type="submit" disabled={loading} className="btn-rose w-full">
            {loading ? "verifying…" : "verify 🌷"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[var(--muted-foreground)]">
          didn't get a code?{" "}
          <Link to="/register" className="text-[var(--rose-soft)] font-semibold">
            try again
          </Link>
        </p>
      </div>
    </main>
  );
}
