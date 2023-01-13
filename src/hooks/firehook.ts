import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { root_storage_ref, firestore_instance } from "../config/firebase";

export function useFirehook(file: File, uid: string) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    //metadata
    const metadata = { contentType: file?.type! };

    //references
    const imageRef = ref(root_storage_ref, `images/${file?.name!}`);

    //uploadBytesResumable
    const uploadTask = uploadBytesResumable(imageRef, file!);

    //Upload On
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        throw error;
      },
      () => {
        getDownloadURL(imageRef)
          .then(async (value) => {
            try {
              const firestore_ref = doc(firestore_instance, uid, file.name);
              await setDoc(firestore_ref, {
                value,
                timestamp: serverTimestamp(),
              });
            } catch (error) {
              throw error;
            }
          })
          .catch((err) => console.error(err));
      }
    );
  }, [file]);

  return { progress, setProgress };
}
