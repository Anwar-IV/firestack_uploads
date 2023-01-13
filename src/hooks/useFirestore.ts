import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore_instance } from "../config/firebase";

export function useFirestore(uid: string) {
  const [docs, setDocs] = useState<any>([]);
  useEffect(() => {
    const collection_ref = collection(firestore_instance, uid);
    const q = query(collection_ref, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snaps) => {
      if (snaps.empty) console.log("Collection is empty");
      else {
        let documents: any = [];
        snaps.forEach((snap) => {
          documents.push({ ...snap.data(), id: snap.id });
        });
        setDocs(() => documents);
      }
    });
    return () => {
      unsub();
    };
  }, [collection]);

  return { docs };
}
