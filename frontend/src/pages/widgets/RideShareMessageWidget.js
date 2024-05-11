import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/GeneralFlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const RideShareMessageWidget = ({ text, userId, image, userName }) => {
  const user = useSelector((state) => state.user.user);

  console.log("passed user", user.user.user_id);
  console.log("firestore user", userId);

  const messageClass = userId === user.user.user_id ? "sent" : "received";

  return (
    <>
      <WidgetWrapper>
        {messageClass === "sent" ? (
          <Box ml="60%">
            <Typography>{userName}</Typography>
            <FlexBetween>
              <FlexBetween gap="1rem">
                <img
                  width="40px"
                  height="40px"
                  src={
                    image ||
                    "https://api.adorable.io/avatars/23/abott@adorable.png"
                  }
                  alt="ns"
                />
                <Typography>{text}</Typography>
              </FlexBetween>
            </FlexBetween>
          </Box>
        ) : (
          <Box>
            <Typography>{userName}</Typography>
            <FlexBetween>
              <FlexBetween gap="1rem">
                <img
                  width="40px"
                  height="40px"
                  src={
                    image ||
                    "https://api.adorable.io/avatars/23/abott@adorable.png"
                  }
                  alt="ns"
                />
                <Typography>{text}</Typography>
              </FlexBetween>
            </FlexBetween>
          </Box>
        )}
      </WidgetWrapper>
    </>
  );
};

export default RideShareMessageWidget;
