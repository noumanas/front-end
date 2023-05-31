import { useEffect } from "react";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import classess from "./style.module.scss";
import { Box, Button } from "@mui/material";
import ContractDetails from "../../../components/contract-details/ContractDetails";
import ContractPreview from "../../../components/contract-preview/ContractPreview";
import ContractSubmitPreview from "../../../components/contract-submit/ContractSubmitPreview";
import { useSelector } from "react-redux";
import axios from "axios";
import { config as URLConfig } from "../../../enviorment/enviorment";
import FileDownload from "js-file-download";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const steps = ["Contract Details", "Contract Preview", "Submit for Review"];

const SignStepper = (props) => {
  const childRef = useRef(null);
  const artist = useSelector((state) => state.artist.artist);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [contractLength, SetContractLength] = React.useState([]);
  const [getNumber, setGetNumber] = useState(0);
  const selected = useSelector((state) => state.artist.selectedTracks);
  const tracks = useSelector((state) => state.artist.tracks);
  const [contract, setContractData] = useState([]);
  const [selected_tracts, SetSelected_Tracts] = useState([]);
  const [formData, setFormData] = useState({});
  const [backDataSending, setBackDataSending] = useState({});


  const isStepOptional = (step) => {
    return step === 1;
  };

  const navigate = useNavigate();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  function getSingleTrack(id) {
    const { id: trackId, title,stream_income_share,isrc } = tracks.filter((track) => track.id === id)[0];
    return { trackId,title, stream_income_share,isrc};
  }
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0) {
      childRef.current.onSubmit();
    }
    if (activeStep === 2) {
      childRef.current.onSubmit();
      saveinfo(formData);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + getNumber);
    setSkipped(newSkipped);
  };
const saveinfo =async(info)=>{

  const res = await fetch(
    `${URLConfig.BASE_URL}/contracts/create`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    }
  );
  const data = await res.json();
  if (res.status == 200) {
    toast.success(`${data.message}`);
  } else {
    toast.error(`${data.message}`);
  }
}
  const handleBack = () => {
    setBackDataSending(formData);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  const handleReset = () => {
    setActiveStep(0);
  };
  function convertHtmlToDoc(contract) {
    const data = {
      name: contract?.artist_name,
      email: contract?.artist_email,
      legal_name: contract?.legel_name,
      address: contract?.recipient_address,
      city:contract?.city,
      country:contract?.country,
      zip_code: contract?.zip_code,
      contract_length : props.contract_length,
      selected_tracks: selected_tracts,
    };

    axios({
      url: `${URLConfig.BASE_URL}/contract-gen/convert`,
      data,
      method: "POST",
      responseType: "blob",
    })
      .then((response) => {
        FileDownload(response.data, `Contract_agreement_${contract?.artist_name}.docx`);
        // const reader = new FileReader();
        // reader.onload = () => {
        //   const base64String = reader.result.split(',')[1];
        //  console.log(base64String); // Log the base64 string to the console
        //  // setbase64(base64String) ;
        //   const data2 = {
        //     name: artist?.name,
        //     email: IsEmail ? IsEmail : artist?.email,
        //     sender_name: authUser?.firstName+' '+authUser?.lastName,
        //     sender_email :authUser?.email,
        //     file : base64String
        //   };
        //   sendContract(data2);

        //   // Send the base64 string to the backend API
        // };
        // reader.readAsDataURL(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const selecttacts = selected.map((e) => getSingleTrack(e));
    SetSelected_Tracts(selecttacts)
    setActiveStep((prevActiveStep) => prevActiveStep + getNumber);
  }, [getNumber])

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        className={classess.page__stepper_btn_wrapper}
      >
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
            <Step
              key={label}
              {...stepProps}
              className={classess.page__stepper_btn_wrapper__steps}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "#fff", // circle color (COMPLETED)
                },

                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "white", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#fff", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white", // Just text label (ACTIVE)
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "black", // circle's number (ACTIVE)
                },
              }}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography
            sx={{
              mt: 2,
              mb: 1,
              textAlign: "center",
              color: "#fff",
              padding: "30px",
              background: "#444c64",
              borderRadius: 4,
            }}
          >
            Contract Submitted for Review Successfully!
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              variant="contained"
              sx={{
                marginRight: "20px",
                backgroundColor: "#00cd99",
                textTransform: "capitalize",
                borderRadius: 2,
                minWidth: 100,
              }}
              onClick={() => navigate("/blig/home")}
            >
              Return Home
            </Button>
            <Button
              onClick={()=>convertHtmlToDoc(contract)}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: 2,
                minWidth: 100,
              }}
            >
              Download a Copy
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
         
          {/* {activeStep === 0 ? <ContractDetails ref={childRef} setGetNumber={setGetNumber}/> : null} */}
          {/* {activeStep === 1 ? <ContractPreview  /> : null} */}
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {activeStep === 0 ? <ContractDetails ref={childRef} setGetNumber={setGetNumber} setContractData={setContractData}  selected_tracts={selected_tracts} contract_length={props.contract_length} setFormData={setFormData} backDataSending={backDataSending}/> : null}
          {activeStep === 1 ? <ContractPreview contract={contract}  contract_length={props.contract_length} /> : null}
          {activeStep === 2 ? <ContractSubmitPreview ref={childRef} /> : null}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              mb: 2,
              pl: 2,
              pr: 2,
              justifyContent: "flex-end",
            }}
          >
            <Button
              color="primary"
              disabled={activeStep === 0 }
              onClick={handleBack}
              sx={{
                mr: 1,
                textTransform: "capitalize",
                borderRadius: 2,
                minWidth: 100,
                background: "#f15f3a",
              }}
              variant="contained"
            >
              Back
            </Button>

            {/* {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )} */}

            <Button
              onClick={handleNext}
              variant="contained"
              disabled={false}
              sx={{
                textTransform: "capitalize",
                borderRadius: 2,
                minWidth: 100,
              }}
            >
              {activeStep === steps.length - 0 ? "Save & Continue" : "Save"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default SignStepper;
