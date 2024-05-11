import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Sidemenu from "../components/Sidemenu";
import UserWidget from "./widgets/UserWidget";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // return (
  //   <>
  //     <Navbar />
  //     <div className="home">
  //       <div className="sub">
  //         <div className="sidemenu">
  //           <Sidemenu />
  //         </div>
  //         <Card />
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        ></Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default Home;
