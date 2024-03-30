import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';

// project imports 
import AchievementDetailsForm from './AchievementDetailsForm';
import BasicDetailsForm from './BasicDetailsForm';
import ProductDetailsForm from './ProductDetailsForm';
import Review from './Review';

// third party

// store
import { dispatch } from '../../../store';
import { addBusiness } from '../../../store/reducers/business';

// step options
const steps = ['Basic Details', 'Product Details', 'Achievement Details', 'Review'];

const getStepContent = (
  step,
  handleNext,
  handleBack,
  setErrorIndex,
  basicDetailsData,
  setBasicDetailsData,
  productDetailsData,
  setProductDetailsData,
  achievementDetailsData,
  setAchievementDetailsData,
) => {
  switch (step) {
    case 0:
      return (
        <>
          <BasicDetailsForm
            handleNext={handleNext}
            setErrorIndex={setErrorIndex}
            basicDetailsData={basicDetailsData}
            setBasicDetailsData={setBasicDetailsData}
          />
        </>
      );
    case 1:
      return (
        <>
          <ProductDetailsForm
            handleNext={handleNext}
            handleBack={handleBack}
            setErrorIndex={setErrorIndex}
            productDetailsData={productDetailsData}
            setProductDetailsData={setProductDetailsData}
          />
        </>
      );
    case 2:
      return (
        <>
          <AchievementDetailsForm
            handleNext={handleNext}
            handleBack={handleBack}
            setErrorIndex={setErrorIndex}
            achievementDetailsData={achievementDetailsData}
            setAchievementDetailsData={setAchievementDetailsData}
          />
        </>
      );
    case 3:
      return (
        <Review
          basicDetailsData={basicDetailsData}
          productDetailsData={productDetailsData}
          achievementDetailsData={achievementDetailsData}
        />
      );
    default:
      throw new Error('Unknown step');
  }
};

// ==============================|| FORMS WIZARD - VALIDATION ||============================== //

const ValidationWizard = () => {
  const navigation = useNavigate()

  const [activeStep, setActiveStep] = useState(0);
  const [basicDetailsData, setBasicDetailsData] = useState({
    userId: "1",
    name: "",
    industry: "",
    organizationType: "",
    organizationSize: "",
    tagline: [],
    description: "",
    legalBackgroundVerification: false
  });
  const [productDetailsData, setProductDetailsData] = useState({
    products: []
  });
  const [achievementDetailsData, setAchievementDetailsData] = useState({
    achievements: []
  });
  const [errorIndex, setErrorIndex] = useState(null);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    const req = {
      userId: basicDetailsData.userId,
      basicDetails: {
        ...basicDetailsData,
        tagline: basicDetailsData.tagline && basicDetailsData.tagline != "" ? basicDetailsData.tagline.split(',').map(tag => tag.trim()) : [],
      },
      productDetails: productDetailsData.products,
      achievementDetails: achievementDetailsData.achievements
    }

    dispatch(addBusiness(req))

    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  }

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label, index) => {
          const labelProps = {};

          if (index === errorIndex) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Error
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Your business page has been created successfully.
            </Typography>
            <Typography variant="subtitle1">
              Your page details have been saved. You can now view your business page with the provided details.
            </Typography>
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setBasicDetailsData({
                    userId: "",
                    name: "",
                    industry: "",
                    organizationType: "",
                    organizationSize: "",
                    tagline: [],
                    description: " ",
                    legalBackgroundVerification: false
                  });
                  setProductDetailsData({
                    products: []
                  });
                  setAchievementDetailsData({
                    achievements: []
                  });
                  setActiveStep(0);
                  navigation(`/business/list`)
                }}
                sx={{ my: 3, ml: 1 }}
              >
                Reset & Back
              </Button>
            </Stack>
          </>
        ) : (
          <>
            {getStepContent(activeStep, handleNext, handleBack, setErrorIndex, basicDetailsData, setBasicDetailsData, productDetailsData, setProductDetailsData, achievementDetailsData, setAchievementDetailsData)}
            {activeStep === steps.length - 1 && (
              <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext} sx={{ my: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Stack>
            )}
          </>
        )}
      </>
    </>
  );
};

export default ValidationWizard;
