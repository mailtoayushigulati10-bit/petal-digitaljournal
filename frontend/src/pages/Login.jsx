import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {

    e.preventDefault();

    if (!identifier || !password) return;

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/login",
        {
          identifier,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/feed");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <main
      style={{
        maxWidth: 420,
        margin: "0 auto",
        padding: "4rem 1.5rem"
      }}
    >

      <div className="card-soft">

        <div style={{ textAlign: "center" }}>

          <div style={{ fontSize: "1.85rem" }}>
            🌸
          </div>

          <h1
            style={{
              marginTop: "0.5rem",
              fontSize: "1.85rem"
            }}
          >
            welcome back
          </h1>

          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--muted)"
            }}
          >
            log in to your petal diary
          </p>

        </div>

        <form
          onSubmit={onSubmit}
          style={{
            marginTop: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}
        >

          <input
            className="input-soft"
            type="text"
            placeholder="email or username"
            value={identifier}
            onChange={(e) =>
              setIdentifier(e.target.value)
            }
          />

          <input
            className="input-soft"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="btn-rose"
            style={{ width: "100%" }}
          >

            {
              loading
                ? "logging in..."
                : "log in"
            }

          </button>

        </form>

        <p
          style={{
            marginTop: "1rem",
            fontSize: "0.9rem",
            textAlign: "center",
            color: "var(--muted)"
          }}
        >

          new here?{" "}

          <Link
            to="/register"
            style={{
              color: "var(--rose)",
              fontWeight: 600
            }}
          >
            join petal
          </Link>

        </p>

      </div>

    </main>

  );

}