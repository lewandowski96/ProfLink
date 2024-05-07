import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// material-ui
import BusinessIcon from "@mui/icons-material/Business";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

// components
import Sidemenu from "../../../components/Sidemenu";

// store
import Navbar from "../../../components/Navbar";
import { useDispatch, useSelector } from "../../../store";
import { fetchBusiness } from "../../../store/reducers/business";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Page = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { business } = useSelector((state) => state.business);

  // API calls
  useEffect(() => {
    dispatch(fetchBusiness(id));
  }, [dispatch, id]);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = business
    ? business.advertisementDetails
      ? business.advertisementDetails.length
      : 0
    : 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <Navbar />
      <div className="company-listing">
        <h2 className="relative left-10 -top-3 text-balck mx-auto mt-4 mb-6 text-center text-4xl font-extrabold font-mono">
          Page Businesses
        </h2>

        <div className="sub w-full">
          <div className="sidemenu">
            <Sidemenu />
          </div>
          <div className="w-full ">
            <div className="w-full px-20  h-[500px] overflow-auto py-5">
              <Paper sx={{ p: 5 }}>
                <Grid container spacing={2}>
                  {/* basic details section */}
                  <Grid
                    item
                    xs={12}
                    sx={{ paddingBottom: "20px", backgroundColor: "#ffffff" }}
                  >
                    {business && (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            variant="h5"
                            sx={{
                              marginBottom: "8px",
                              color: "#333",
                              fontWeight: "bold",
                            }}
                          >
                            {business.basicDetails && business.basicDetails.name
                              ? business.basicDetails.name
                              : "-"}
                          </Typography>
                          <Typography
                            mt={1}
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "#777",
                            }}
                          >
                            <BusinessIcon
                              fontSize="small"
                              sx={{ marginRight: "6px" }}
                            />{" "}
                            {business.basicDetails &&
                            business.basicDetails.industry
                              ? business.basicDetails.industry
                              : "-"}
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{
                                ml: "8px",
                                mr: "8px",
                                backgroundColor: "#ccc",
                              }}
                            />
                            <BusinessCenterIcon
                              fontSize="small"
                              sx={{ marginRight: "6px" }}
                            />{" "}
                            {business.basicDetails &&
                            business.basicDetails.organizationType
                              ? business.basicDetails.organizationType
                              : "-"}
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{
                                ml: "8px",
                                mr: "8px",
                                backgroundColor: "#ccc",
                              }}
                            />
                            <PeopleIcon
                              fontSize="small"
                              sx={{ marginRight: "6px" }}
                            />{" "}
                            {business.basicDetails &&
                            business.basicDetails.organizationSize
                              ? business.basicDetails.organizationSize
                              : "-"}
                          </Typography>
                          <Typography variant="body1" component="div" mt={1}>
                            {business.basicDetails &&
                              business.basicDetails.tagline &&
                              business.basicDetails.tagline.map((tag) => (
                                <Chip
                                  key={tag}
                                  label={`# ${tag}`}
                                  variant="outlined"
                                  style={{
                                    marginRight: "8px",
                                    backgroundColor: "#D7E5F0",
                                  }}
                                />
                              ))}
                          </Typography>
                          <Typography
                            variant="body1"
                            component="div"
                            mt={3}
                            style={{ color: "#444", fontSize: "14px" }}
                          >
                            {business.basicDetails &&
                            business.basicDetails.description
                              ? business.basicDetails.description
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  {/* advertisement details section */}
                  <Grid
                    item
                    xs={12}
                    sx={{ paddingBottom: "20px", backgroundColor: "#ffffff" }}
                  >
                    {business && (
                      <>
                        <Typography
                          variant="h5"
                          gutterBottom
                          align="center"
                          sx={{ fontWeight: "bold" }}
                        >
                          Advertisements
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                          <AutoPlaySwipeableViews
                            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                          >
                            {business.advertisementDetails.map(
                              (step, index) => (
                                <div key={step.label}>
                                  {Math.abs(activeStep - index) <= 2 ? (
                                    <>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          height: 400,
                                          overflow: "hidden",
                                          width: "100%",
                                          backgroundColor: "#fff", // Add background color if needed
                                        }}
                                      >
                                        <Box
                                          component="img"
                                          sx={{
                                            height: 400,
                                            display: "block",
                                            // maxWidth: 1200,
                                            overflow: "hidden",
                                            width: "100%",
                                          }}
                                          src={step.image}
                                          alt={step.title}
                                        />
                                        <Box
                                          sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            padding: 2,
                                            background: "rgba(0, 0, 0, 0.5)", // Add background color to the overlay
                                            color: "#fff",
                                            width: "100%",
                                          }}
                                        >
                                          <Typography>{step.title}</Typography>
                                          <Typography>
                                            {step.description}
                                          </Typography>
                                          <Typography>
                                            Budget: {step.budget}
                                          </Typography>
                                          <Typography>
                                            Target Audience:{" "}
                                            {step.targetAudience}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </>
                                  ) : null}
                                </div>
                              )
                            )}
                          </AutoPlaySwipeableViews>
                          <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                              <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                              >
                                Next
                                {theme.direction === "rtl" ? (
                                  <KeyboardArrowLeft />
                                ) : (
                                  <KeyboardArrowRight />
                                )}
                              </Button>
                            }
                            backButton={
                              <Button
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                              >
                                {theme.direction === "rtl" ? (
                                  <KeyboardArrowRight />
                                ) : (
                                  <KeyboardArrowLeft />
                                )}
                                Back
                              </Button>
                            }
                          />
                        </Box>
                      </>
                    )}
                  </Grid>
                  {/* product details section */}
                  <Grid
                    item
                    xs={12}
                    sx={{ paddingBottom: "20px", backgroundColor: "#FAF9F6" }}
                  >
                    {business && (
                      <>
                        <Typography
                          variant="h5"
                          gutterBottom
                          align="center"
                          sx={{ fontWeight: "bold" }}
                        >
                          Products
                        </Typography>
                        <Grid container spacing={2} sx={{ overflowX: "auto" }}>
                          {business.productDetails.map((product) => (
                            <Grid item key={product._id}>
                              <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                  component="img"
                                  height="140"
                                  image={product.image}
                                  alt={product.name}
                                  sx={{ maxHeight: "140px" }}
                                />
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                  >
                                    {product.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {product.description}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    )}
                  </Grid>
                  {/* achievement details section */}
                  <Grid
                    item
                    xs={12}
                    sx={{ paddingBottom: "20px", backgroundColor: "#ffffff" }}
                  >
                    {business && (
                      <>
                        <Typography
                          variant="h5"
                          gutterBottom
                          align="center"
                          sx={{ fontWeight: "bold" }}
                        >
                          Achievements
                        </Typography>
                        <Grid container spacing={2} sx={{ overflowX: "auto" }}>
                          {business.achievementDetails.map((achievement) => (
                            <Grid item key={achievement._id}>
                              <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                  component="img"
                                  height="140"
                                  image={achievement.image}
                                  alt={achievement.title}
                                />
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                  >
                                    {achievement.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {achievement.description}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    )}
                  </Grid>
                  {/* customer testimonials section */}
                  <Grid
                    item
                    xs={12}
                    sx={{ paddingBottom: "20px", backgroundColor: "#FAF9F6" }}
                  >
                    {business && (
                      <>
                        <Typography
                          variant="h5"
                          gutterBottom
                          align="center"
                          sx={{ fontWeight: "bold" }}
                        >
                          Customer Testimonials
                        </Typography>
                        <Container>
                          <Box
                            sx={{
                              display: "flex",
                              overflowX: "auto",
                              "&::-webkit-scrollbar": {
                                display: "none",
                              },
                              scrollbarWidth: "none",
                            }}
                          >
                            {business.customerTestimonials.map(
                              (testimonial) => (
                                <Card
                                  sx={{
                                    minWidth: 275,
                                    maxWidth: 300,
                                    marginRight: 2,
                                  }}
                                >
                                  <CardContent>
                                    <Typography variant="h6" component="div">
                                      {testimonial.name}
                                    </Typography>
                                    <Typography
                                      color="text.secondary"
                                      gutterBottom
                                    >
                                      {testimonial.email}
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 1,
                                      }}
                                    >
                                      <Rating
                                        name="rating"
                                        value={testimonial.rating}
                                        readOnly
                                        precision={0.5}
                                      />
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        ({testimonial.rating})
                                      </Typography>
                                    </Box>
                                    <Typography variant="body2" component="div">
                                      {testimonial.description}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              )
                            )}
                          </Box>
                        </Container>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
