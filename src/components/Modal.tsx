import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthCtx } from "../contexts/AuthContext";

export function Modal() {
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log({ location });
  const { user } = useAuthCtx();
  useEffect(() => {
    if (redirect) {
      setRedirect(false);
      navigate(`/${user?.uid!}/images`);
    }
  }, [redirect]);

  const randomize = () => {
    const random = Math.random();
    if (random < 0.25) {
      return { x: -1000 };
    } else if (random < 0.5) {
      return { x: 1000 };
    } else if (random < 0.75) {
      return { y: -1000 };
    }
    return { y: 1000 };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="backdrop"
      onClick={() => {
        setRedirect(true);
      }}
    >
      <motion.div
        className="picture-wrapper"
        initial={randomize()}
        animate={{ y: 0, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {<img src={location.state} alt="picture" className="picture" />}
      </motion.div>
    </motion.div>
  );
}
