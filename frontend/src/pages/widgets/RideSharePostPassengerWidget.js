import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/GeneralFlexBetween";
// import Friend from "components/Friend";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";
// import datefns from "date-fns";
import formatISO from "date-fns/formatISO";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setRideSharePost } from "../../store/reducers/rideShare.slice";
import Friend from "./Friend";

const RideSharePostPassengerWidget = ({
  postId,
  postUserId,
  posterName,
  posterImage,
  title,
  start,
  destination,
  rideDate,
  vehicle,
  vehicleType,
  peopleCount,
  applied,
  appliedUsersList,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // const loggedInUserId = useSelector((state) => state.user.user.id);
  // const isLiked = Boolean(likes[loggedInUserId]);
  // const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const datefns = require("date-fns");

  const handleApply = async () => {
    const response = await fetch(
      `http://localhost:4000/api/rideSharing/apply/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: postId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setRideSharePost({ rideSharePost: updatedPost }));
  };

  const handleWithdraw = async () => {
    const response = await fetch(
      `http://localhost:4000/api/rideSharing/withdraw/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: postId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setRideSharePost({ rideSharePost: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={posterName}
        userPicturePath={posterImage}
        // hideFriendAddButton={hideFriendAddButton}
      />
      <Box m="1rem 0" />
      <Divider />

      <Typography variant="h3" color={main} sx={{ mt: "1rem" }}>
        {title}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        From - {start}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        To - {destination}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        Scheduled Date - {datefns.format(new Date(rideDate), "yyyy-MM-dd pp")}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        Vehicle Information
      </Typography>
      <Box m="1rem 0" />
      <Divider />
      <Typography color={main} sx={{ mt: "1rem" }}>
        Type - {vehicleType}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        Model - {vehicle}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        Passenger Count - {peopleCount}
      </Typography>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            {/* <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton> */}
            {/* <Typography>{likeCount}</Typography> */}
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        {!appliedUsersList.includes(user.user.user_id) && (
          <Button
            onClick={handleApply}
            sx={{
              color: palette.background.dark,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            <Typography
              fontWeight="bold"
              // fontSize="clamp(1rem, 2rem, 2.25rem)"
              color="white"
              sx={{
                alignItems: "right",
                "&:hover": {
                  color: palette.primary.dark,
                  cursor: "pointer",
                },
              }}
            >
              APPLY
            </Typography>
          </Button>
        )}
        {appliedUsersList.includes(user.user.user_id) && (
          <>
            {/* <Button
              onClick={handleApply}
              sx={{
                color: palette.background.dark,
                backgroundColor: "red",
                borderRadius: "3rem",
              }}
            > */}
            <Typography
              fontWeight="medium"
              // fontSize="clamp(1rem, 2rem, 2.25rem)"
              color="black"
              sx={{ alignItems: "left" }}
            >
              Applied. Pending acceptance ...
            </Typography>
            {/* <Button/> */}
            <Button
              onClick={handleWithdraw}
              sx={{
                color: palette.background.dark,
                backgroundColor: "red",
                borderRadius: "3rem",
              }}
            >
              <Typography
                fontWeight="bold"
                // fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="white"
                sx={{
                  alignItems: "right",
                  "&:hover": {
                    color: palette.primary.dark,
                    cursor: "pointer",
                  },
                }}
              >
                WITHDRAW
              </Typography>
            </Button>
          </>
        )}
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default RideSharePostPassengerWidget;
