import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem("petal_user"));
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("petal_user");
    // also clear your auth token here if you have one, e.g. localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const isActive = (p) => location.pathname === p;

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 40,
      backdropFilter: "blur(10px)",
      background: "rgba(255,255,255,0.7)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        maxWidth: 1024, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 1.5rem",
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", textDecoration: "none" }}>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.85rem", color: "var(--rose)", lineHeight: 1 }}>
            petal 🌸
          </span>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem", color: "var(--muted)" }}>
            a tiny digital journal
          </span>
        </Link>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {user ? (
            <>
              <Link to="/feed" className={isActive("/feed") ? "btn-rose" : "btn-ghost"}>feed</Link>
              <Link to="/create" className={isActive("/create") ? "btn-rose" : "btn-ghost"}>+ new</Link>
              <button onClick={logout} className="btn-ghost">log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className={isActive("/login") ? "btn-rose" : "btn-ghost"}>log in</Link>
              <Link to="/register" className={isActive("/register") ? "btn-rose" : "btn-ghost"}>register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
