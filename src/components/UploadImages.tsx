import { ChangeEventHandler, useEffect, useState } from "react";
import { HiCursorClick } from "react-icons/hi";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuthCtx } from "../contexts/AuthContext";
import { ImageGrid } from "./ImageGrid";
import { ProgressBar } from "./Progressbar";

export function UploadImages() {
  const navigate = useNavigate();
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [infobar, setInfobar] = useState<string | null>(null);
  const acceptableMimeTypes = ["image/jpeg", "image/png", "image/svg+xml"];
  const { user } = useAuthCtx();
  const { id } = useParams();
  useEffect(() => {
    if (!user || id !== user.uid) {
      navigate("/");
    }
  }, []);

  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (acceptableMimeTypes.includes(file!?.type)) {
      setInfobar(null);
      setLocalFile(file);
      console.log("Included!");
      return;
    } else {
      setInfobar("Please select a valid image type(.png, .jpg, .svg)");
    }
  };
  return (
    <div className="container">
      <h1 className="main-title">Welcome {user?.displayName}</h1>
      <form className="file-upload-form">
        <div className="upload-wrapper">
          <p>Select a file to Upload</p>
          <label htmlFor="upload-input" className="upload-label">
            <HiCursorClick size={28} color="lightblue" className="icon" />
          </label>
          <input
            type="file"
            className="upload-input"
            id="upload-input"
            onChange={uploadHandler}
            accept=".jpg, .png, .svg"
          />
        </div>
        {infobar ? (
          <div className="infobar">{infobar}</div>
        ) : (
          localFile && <p className="infobar">{localFile?.name}</p>
        )}
      </form>
      {localFile && (
        <ProgressBar file={localFile} setLocalFile={setLocalFile} />
      )}
      {user && <ImageGrid user={user} />}
      <Outlet />
    </div>
  );
}
