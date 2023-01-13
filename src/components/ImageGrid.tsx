import { Link } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { motion } from "framer-motion";
import { User } from "firebase/auth";
import { useEffect } from "react";

type ImageGridProps = {
  user: User | null;
};

export function ImageGrid({ user }: ImageGridProps) {
  const { docs } = useFirestore(user?.uid!);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc: any) => (
          <Link to={`${user?.uid!}`} key={doc.id} state={doc.value}>
            <motion.div
              whileHover={{ opacity: 1 }}
              layout
              className="grid-child"
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                src={doc.value}
                alt="some image"
                className="img"
              />
            </motion.div>
          </Link>
        ))}
    </div>
  );
}
