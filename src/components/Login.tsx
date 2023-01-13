import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthCtx } from "../contexts/AuthContext";
import { motion } from "framer-motion";

export function Login() {
  const { loginUser, loginError, loading, user } = useAuthCtx();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    await loginUser(email, password);
    if (!loading && user) {
      console.log({
        userfromlogin: user,
        loading,
        navigatelink: `/${user.uid}/images`,
      });
    } else {
      console.log("Something went wrong here in login");
    }
  };

  useEffect(() => {
    if (user) {
      navigate(`/${user.uid}/images`);
    }
  }, [user]);

  return (
    <form className="form" onSubmit={loginHandler}>
      <h1>Login</h1>
      <div className="form-control">
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="register-infobar">
        <p>
          {" "}
          Don't have an account with us? <Link to="/register">Register</Link>
        </p>
        {loginError && (
          <motion.div
            initial={{ x: 10000 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="error-msg"
          >
            <p>{loginError}</p>
          </motion.div>
        )}
      </div>
      <button className="register-btn" type="submit">
        Login
      </button>
    </form>
  );
}
