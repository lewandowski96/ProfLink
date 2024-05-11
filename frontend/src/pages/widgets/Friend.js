import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { setFriends } from "../../store/slices/user.slice";
import FlexBetween from "../../components/GeneralFlexBetween";
import UserImage from "../../components/UserImage";

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  hideFriendAddButton = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  // const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // const isFriend = friends.find((friend) => friend.id === friendId);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_API_URL;

  // const patchFriend = async () => {
  //   const response = await fetch(
  //     `${BACKEND_URL}/api/users/${user.user.id}/${friendId}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();

  //   dispatch(setFriends(data));
  // };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
        // onClick={() => {
        //   navigate(`/profile/${friendId}`);
        //   // navigate(0);
        // }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.dark,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Friend;
