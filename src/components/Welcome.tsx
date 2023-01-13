import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthCtx } from "../contexts/AuthContext";

export function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const [signedOut, setSignedOut] = useState(false);
  const { user, _signOut } = useAuthCtx();
  const signoutHandler = () => {
    _signOut();
    setSignedOut(true);
  };

  useEffect(() => {
    if (!user && signedOut) {
      navigate("/");
      setSignedOut(false);
    }
  }, [user, signedOut]);

  return (
    <>
      <div className="navbar">
        <Link to={"/"}>
          <h1 className="welcome-logo">FireStack Uploads</h1>
        </Link>
        {user && (
          <button className="logout-btn" type="button" onClick={signoutHandler}>
            Sign Out
          </button>
        )}
      </div>
      <div className="welcome-container">
        {location.pathname === "/" ? (
          <div className="welcome-textbox">
            <p>
              Welcome to FireStack Uploads, where we believe memories are
              priceless; and so we went ahead and created a secure platform for
              uploading all your priceless collection of memories. We have also
              made it easier than ever to access where everything you need is
              only a click of a button away.
            </p>
            <div className="btn-wrapper">
              <Link to="/register" className="btn">
                Register
              </Link>
              <Link to="/login" className="btn">
                Login
              </Link>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}
