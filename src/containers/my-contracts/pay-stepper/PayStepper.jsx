import React, {useState} from 'react'
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import classess from "./style.module.scss";
import { Box, Grid, Button, ButtonGroup } from "@mui/material";
import PaymentDetails from '../../../components/payment-details/paymentDetails';
import PaymentPreview from '../../../components/payment-preview/PaymentPreview';
import PaymentSubmit from '../../../components/payment-submit/PaymentSubmit';
import ContractSuccess from '../../../components/contract-success/ContractSuccess';
import { useNavigate } from 'react-router-dom';

const steps = ['Bank Details', 'Preview', 'Submit for Review'];

const PayStepper = () => {

  const navigate = useNavigate()

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  
  return (
    <Box sx={{ width: '100%' }} className={classess.page}>
    <Stepper activeStep={activeStep} className={classess.page__stepper_btn_wrapper}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        // if (isStepOptional(index)) {
        //   labelProps.optional = (
        //     <Typography variant="caption">Optional</Typography>
        //   );
        // }
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label} {...stepProps} className={classess.page__stepper_btn_wrapper__steps} sx={{
            '& .MuiStepLabel-root .Mui-completed': {
              color: '#1976d2', // circle color (COMPLETED)
            },
            '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
              {
                color: 'white', // Just text label (COMPLETED)
              },
            '& .MuiStepLabel-root .Mui-active': {
              color: '#fff', // circle color (ACTIVE)
            },
            '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
              {
                color: 'common.white', // Just text label (ACTIVE)
              },
            '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
              fill: 'black', // circle's number (ACTIVE)
            },
          }}>
            <StepLabel {...labelProps} >{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
    {activeStep === steps.length ? (
      <React.Fragment>
        <ContractSuccess content='Payment Information submitted for review successfully!'/>
        {/* <Typography sx={{ mt: 2, mb: 1 }}>
          All steps completed - you&apos;re finished
        </Typography> */}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          {/* <Button onClick={handleReset}>Reset</Button> */}
          {/* <Button onClick={() => navigate('/blig/home')} variant="contained" className={classess.page__back_btn}>Return Home</Button>
          <Button variant="contained" className={classess.page__download_btn}>Download a copy</Button> */}
          <Button onClick={() => navigate('/blig/home')} variant="contained" sx={{fontSize: '16px', fontWeight: 'normal', marginRight: '20px', backgroundColor:'#00cd99',textTransform: 'capitalize', borderRadius: '12px', minWidth: 100}}>Return Home</Button>
          <Button variant="contained" sx={{fontSize: '16px', fontWeight: 'normal', textTransform: 'none', borderRadius: '12px', minWidth: 100, width: '249px'}}>Download a copy</Button>
        </Box>
      </React.Fragment>
    ) : (
      <React.Fragment>
        {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
        {
          activeStep === 0 ?
          <PaymentDetails />
          :
          null
        }
        {
          activeStep === 1 ?
          <PaymentPreview />
          :
          null
        }
        {
          activeStep === 2 ?
          <PaymentSubmit />
          :
          null
        }
        
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mb: 2, pl: 2, pr: 2 , justifyContent:
      'flex-end'}}>
          <Button
            color="primary"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1, textTransform: 'capitalize', borderRadius: 2, minWidth: 100, background: '#f15f3a'}}
            variant="contained"
          >
           Back
          </Button>

          {/* {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )} */}
          <Button onClick={handleNext} variant="contained" sx={{textTransform: 'capitalize', borderRadius: 2, minWidth: 100}}>
            {activeStep === steps.length - 3 ? 'Save' : null}
            {activeStep === steps.length - 1 ? 'Save for Preview' : null}
            {activeStep === steps.length - 2 ? 'Save & Continue' : null}
          </Button>
        </Box>
      </React.Fragment>
    )}
  </Box>
  )
}
export default PayStepper