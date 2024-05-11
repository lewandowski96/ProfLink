import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setRideSharePost } from "../../store/reducers/rideShare.slice";
import Friend from "./Friend";
import RideShareMessageRoomWidget from "./RideShareMessageRoomWidget";

const RideShareMyAcceptedPostViewWidget = ({
  postId,
  postUserId,
  posterName,
  posterImage,
  userImage,
  userName,
  title,
  start,
  destination,
  rideDate,
  vehicle,
  vehicleType,
  peopleCount,
  applied,
  appliedUsersList,
  accepted,
  acceptedUsersList,
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

  const [open, setOpen] = useState(false);

  const functionopenpopup = () => {
    setOpen(true);
  };
  const functionclosepopup = () => {
    setOpen(false);
  };

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

  const handleDecline = async (postId, userId) => {
    const response = await fetch(`/api/rideSharing/decline/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: postId, userId: userId }),
    });
    const updatedPost = await response.json();
    dispatch(setRideSharePost({ rideSharePost: updatedPost }));
  };

  const handleAccept = async (postId, userId) => {
    const response = await fetch(`/api/rideSharing/accept/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: postId, userId: userId }),
    });
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
      <Box m="1rem 0" />
      <Divider />
      <Typography variant="h4" color={main} sx={{ mt: "1rem" }}>
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
      <Box m="1rem 0" />
      <Divider />
      {applied.length > 0 && (
        <>
          <Typography variant="h4" color={main} sx={{ mt: "1rem" }}>
            Applicants
          </Typography>
          <Box m="1rem 0" />
          <Divider />
          {applied.map((appliedUser) => (
            <>
              <Box m="1rem 0" />
              <FlexBetween gap="0.5rem">
                <UserImage image={appliedUser.userImage} />
                <Typography color={main}>
                  {appliedUser.firstName} {appliedUser.lastName}
                </Typography>
                <FlexBetween gap="0.5rem">
                  <Button
                    onClick={() => handleAccept(postId, appliedUser.userId)}
                    sx={{
                      // margin: "auto",
                      backgroundColor: "green",
                      color: palette.background.alt,
                      "&:hover": {
                        backgroundColor: palette.primary.main,
                      },
                    }}
                  >
                    ACCEPT
                  </Button>
                  <Typography></Typography>
                  <Button
                    onClick={() => handleDecline(postId, appliedUser.userId)}
                    sx={{
                      // margin: "auto",
                      backgroundColor: "red",
                      color: palette.background.alt,
                      "&:hover": {
                        backgroundColor: palette.primary.main,
                      },
                    }}
                  >
                    DECLINE
                  </Button>
                </FlexBetween>
              </FlexBetween>
            </>
          ))}
          <Box m="2rem 0" />
          <Divider />
        </>
      )}

      <Box m="1rem 0" />
      {accepted && accepted.length > 0 && (
        <>
          <Typography variant="h5" color={main} sx={{ mt: "1rem" }}>
            You have been accepted by the poster. Click on the message button to
            start a conversation.
          </Typography>
          <Box m="1rem 0" />
          <Divider />
          <Box m="1rem 0" />
          <FlexBetween gap="0.5rem">
            <Button
              onClick={functionopenpopup}
              sx={{
                // margin: "auto",
                backgroundColor: "blue",
                color: palette.background.alt,
                "&:hover": {
                  backgroundColor: palette.primary.main,
                },
              }}
            >
              MESSAGE
            </Button>
          </FlexBetween>
          <Dialog open={open} fullWidth>
            <DialogTitle textAlign="center">Group Chat - {title}</DialogTitle>

            <RideShareMessageRoomWidget
              postId={postId}
              userId={postUserId}
              userName={userName}
              userImage={userImage}
            />
            <DialogActions>
              <Button
                // disabled={!post}
                onClick={functionclosepopup}
                sx={{
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem",
                }}
              >
                <Typography
                  // fontSize="clamp(1rem, 2rem, 2.25rem)"
                  color="white"
                  sx={{ alignItems: "right" }}
                >
                  CANCEL
                </Typography>
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </WidgetWrapper>
  );
};

export default RideShareMyAcceptedPostViewWidget;
