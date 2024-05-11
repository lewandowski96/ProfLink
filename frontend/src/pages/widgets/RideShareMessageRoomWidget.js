import { Button, Typography } from "@mui/material";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import FlexBetween from "../../components/GeneralFlexBetween";
import { firestore } from "../../firebase/config";
import RideShareMessageWidget from "./RideShareMessageWidget";

const RideShareMessageRoomWidget = ({
  postId,
  userId,
  userImage,
  userName,
}) => {
  const dummy = useRef();
  const collectionName = postId + userId;
  const messagesRef = collection(firestore, collectionName);
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await addDoc(messagesRef, {
      text: formValue,
      userName: userName,
      createdAt: serverTimestamp(),
      userId,
      userImage,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="ride-share-msg">
        <section>
          <main>
            {messages &&
              messages.map((msg) => (
                <RideShareMessageWidget
                  key={msg.id}
                  text={msg.text}
                  userId={msg.userId}
                  image={msg.userImage}
                  userName={msg.userName}
                />
              ))}

            <span ref={dummy}></span>
            <form onSubmit={sendMessage}>
              <FlexBetween gap="2rem">
                <input
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  placeholder="say something nice"
                />

                <Button
                  type="submit"
                  disabled={!formValue}
                  sx={{
                    color: "blue",
                    backgroundColor: "blue",
                    borderRadius: "3rem",
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    // fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="white"
                    sx={{
                      alignItems: "right",
                    }}
                  >
                    SEND
                  </Typography>
                </Button>
                {/* <button type="submit" disabled={!formValue}>
                  SEND
                </button> */}
              </FlexBetween>
            </form>
          </main>
        </section>
      </div>
    </>
  );
};

export default RideShareMessageRoomWidget;
