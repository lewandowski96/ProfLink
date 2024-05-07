import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50" }}
        width={size}
        height={size}
        alt=""
        // src={
        //   `${process.env.REACT_APP_BACKEND_URL}/assets/${image}` ||
        //   `${process.env.REACT_APP_BACKEND_UR}/assets/prof_pic_placeholder.png`
        // }
        src={
          `http://localhost:4000/assets/${image}` ||
          `http://localhost:4000/assets/prof_pic_placeholder.png`
        }
      />
    </Box>
  );
};

export default UserImage;
