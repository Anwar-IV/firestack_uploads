import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthCtx } from "../contexts/AuthContext";
import { motion, spring } from "framer-motion";

export function Register() {
  const { registerUser, error, setError, user } = useAuthCtx();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setError(
        "Passwords do not match. Please make sure the password and confirm password fields match."
      );
      return;
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    const user = await registerUser(firstName, email, password);
    if (user) {
      navigate(`/${user.uid}/images`);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(`/${user.uid}/images`);
    }
  }, [user]);

  useEffect(() => {
    if (password.length > 3) {
      setError(null);
    }
  }, [password]);

  return (
    <form className="form" onSubmit={handleRegister}>
      <h1>Register</h1>
      <div className="form-control">
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          minLength={2}
          required
        />
      </div>
      <div className="form-control">
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          minLength={2}
          required
        />
      </div>
      <div className="form-control">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="register-infobar">
        <p>
          {" "}
          Already have an account with us? <Link to="/login">Log in</Link>
        </p>
        {error && (
          <motion.div
            initial={{ x: 10000 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="error-msg"
          >
            <p>{error}</p>
          </motion.div>
        )}
      </div>
      <button className="register-btn" type="submit">
        Register
      </button>
    </form>
  );
}
