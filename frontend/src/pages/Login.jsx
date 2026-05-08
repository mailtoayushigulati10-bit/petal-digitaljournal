import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    // 🔌 plug your backend call here:
    // const res = await fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
    localStorage.setItem("petal_user", email);
    navigate("/feed");
  };

  return (
    <main style={{ maxWidth: 420, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <div className="card-soft">
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.85rem" }}>🌸</div>
          <h1 style={{ marginTop: "0.5rem", fontSize: "1.85rem" }}>welcome back</h1>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>log in to your petal diary</p>
        </div>
        <form onSubmit={onSubmit} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input className="input-soft" type="email" placeholder="your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input-soft" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn-rose" style={{ width: "100%" }}>log in</button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", textAlign: "center", color: "var(--muted)" }}>
          new here? <Link to="/register" style={{ color: "var(--rose)", fontWeight: 600 }}>join petal</Link>
        </p>
      </div>
    </main>
  );
}
