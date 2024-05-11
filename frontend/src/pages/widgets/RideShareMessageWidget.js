import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/GeneralFlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const RideShareMessageWidget = ({ text, userId, image, userName }) => {
  const user = useSelector((state) => state.user.user);

  const messageClass = userId === user.userId ? "sent" : "received";

  return (
    <>
      <WidgetWrapper>
        <FlexBetween gap="0.2rem">
          <Box>
            <img
              width="40px"
              height="40px"
              src={
                image || "https://api.adorable.io/avatars/23/abott@adorable.png"
              }
              alt="ns"
            />
            <Typography>{userName}</Typography>
          </Box>
          <Box>
            <Typography>{text}</Typography>
          </Box>
        </FlexBetween>
      </WidgetWrapper>
    </>
  );
};

export default RideShareMessageWidget;
