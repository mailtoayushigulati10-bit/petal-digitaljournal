import {

  Link,

  useLocation,

  useNavigate

} from "react-router-dom";

import {

  useEffect,

  useState

} from "react";

export default function Navbar() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );

    } else {

      setUser(null);

    }

  }, [location.pathname]);

  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    setUser(null);

    navigate("/");

  };

  const isActive = (p) =>
    location.pathname === p;

  // HIDE NAVBAR BUTTONS

  const hideButtons =

    location.pathname === "/" ||

    location.pathname === "/login" ||

    location.pathname === "/register" ||

    location.pathname === "/verify";

  return (

    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(10px)",
        background:
          "rgba(255,255,255,0.7)",
        borderBottom:
          "1px solid var(--border)"
      }}
    >

      <div
        style={{
          maxWidth: 1024,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          padding: "1rem 1.5rem"
        }}
      >

        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.75rem",
            textDecoration: "none"
          }}
        >

          <span
            style={{
              fontFamily:
                "'DM Serif Display', serif",

              fontSize: "1.85rem",

              color: "var(--rose)",

              lineHeight: 1
            }}
          >
            petal 🌸
          </span>

          <span
            style={{
              fontFamily:
                "'Caveat', cursive",

              fontSize: "1.2rem",

              color: "var(--muted)"
            }}
          >
            a tiny digital journal
          </span>

        </Link>

        {

          !hideButtons && user && (

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center"
              }}
            >

              <Link
                to="/feed"
                className={

                  isActive("/feed")

                    ? "btn-rose"

                    : "btn-ghost"

                }
              >
                feed
              </Link>

              <Link
                to="/create"
                className={

                  isActive("/create")

                    ? "btn-rose"

                    : "btn-ghost"

                }
              >
                + new
              </Link>

              <button
                onClick={logout}
                className="btn-ghost"
              >
                log out
              </button>

            </div>

          )

        }

      </div>

    </nav>

  );

}