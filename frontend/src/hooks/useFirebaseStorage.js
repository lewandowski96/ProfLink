import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebase/config";

import { v4 as uuid4 } from "uuid";

const useFirebaseStorage = (setError) => {
  const startUpload = (file, setProfileImageUrl) => {
    if (!file) {
      return;
    }
    const fileId = uuid4();
    const fileFormat = file.type.split("/")[1];
    const storageRef = ref(storage, `images/${fileId}.${fileFormat}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setProgress(progress);
      },
      (error) => {
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfileImageUrl(downloadURL);
        });
      }
    );
  };

  return { startUpload };
};
export default useFirebaseStorage;
