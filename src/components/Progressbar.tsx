import { useEffect } from "react";
import { useFirehook } from "../hooks/firehook";
import { motion } from "framer-motion";
import { useAuthCtx } from "../contexts/AuthContext";

type ProgressBarProps = {
  file: File | null;
  setLocalFile: React.Dispatch<React.SetStateAction<File | null>>;
};
export function ProgressBar({ file, setLocalFile }: ProgressBarProps) {
  const { user } = useAuthCtx();
  const { progress } = useFirehook(file!, user?.uid!);

  useEffect(() => {
    console.log({ progress });
    if (progress === 100) {
      setTimeout(() => {
        setLocalFile(null);
        console.log(progress);
      }, 1500);
    }
  }, [progress, setLocalFile]);
  return (
    <div
      style={{
        width: "300px",
        height: "15px",
        border: "2px solid steelblue",
        marginTop: "10px",
      }}
    >
      {progress > 1 ? (
        <motion.div
          layout
          animate={{ width: progress + "%" }}
          className="progressbar-child"
          style={{
            height: "15px",
            backgroundColor: "steelblue",
          }}
        ></motion.div>
      ) : (
        <div style={{ height: "15px" }}></div>
      )}
    </div>
  );
}
