import React, { useState } from 'react'
import classess from "./style.module.scss";
import Button from '@mui/material/Button';
import { Box, Grid, MenuItem, Select } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';


const PaymentDetails = () => {

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // const [isFormFill, setIsFormFill] = useState(false)
  // const [isPreview, setIsPreview] = useState(false)

  // const handleFormfill = () => {
  //   setIsFormFill(true)
  //   setIsPreview(true)
  // }

  // const handleBack = () => {
  //   setIsFormFill(false)
  //   setIsPreview(true)
  // }

  // const handleSubmitReview = () => {
  //   setIsPreview(true)
  //   setIsFormFill(false)
  // }

  return (
    <>
    <Grid container spacing={2} className={classess.page}>
      <Grid item sm={12} lg={12} xl={12} className={classess.page__details}>
        <Box
          varient="div"
          component="div"
          className={classess.page__details__box}
        >
          <Box
            varient="div"
            component="div"
            className={classess.page__details__box__tracks}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__details__box__tracks__header}
            >
              <span
                className={classess.page__details__box__adetails__header__title}
              >
                Please enter payment details
              </span>
            </Box>
            <form action="" className={classess.page__fieldsContainer__form}>
              <Grid container spacing={4} rowSpacing={4}>
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Bank Name
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="Bank of America"
                      type="text"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Account Holder's Name
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="Justin Beiber"
                      type="text"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Bank Account Number
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="1234567890"
                      type="number"
                      required
                    />
                  </Box>
                </Grid>
                
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Routing #
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="1234567"
                      type="number"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      SWIFT/BIC Code
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="John Doe"
                      type="text"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      IBAN<sub>(if applicable)</sub>
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="phone"
                      placeholder="123-456-7890"
                      type="number"
                      required
                    />
                  </Box>
                </Grid>
                {/* <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Artist's Representative Email
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="Enter"
                      type="email"
                      required
                    />
                  </Box>
                </Grid> */}
                <Grid item md={8} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Bank Address
                    </label>

                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="phone"
                      placeholder="123 Blacklion Avenue"
                      type="text"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      City
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="Atlanta"
                      type="text"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Zip/Postal Code
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="12345"
                      type="email"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Country
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="phone"
                      placeholder="United States"
                      type="text"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  {/* <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Country
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="phone"
                      placeholder="United States"
                      type="number"
                      required
                    />
                  </Box> */}
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                      varient="div"
                      component="div"
                      className={classess.page__fieldsContainer__form__formfield}
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Upload W8-BEN
                      </label>
                      <Button variant="contained" component="label"  className={
                          classess.page__fieldsContainer__form__formfield__button
                        }>
                        <span><UploadFileIcon className={classess.page__fieldsContainer__form__formfield__button__upload} /></span> Drag & Drop files here
                        <input hidden accept="image/*" multiple type="file" />
                      </Button>
                    </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                <Box
                      varient="div"
                      component="div"
                      className={classess.page__fieldsContainer__form__formfield}
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Copy of Artist's Photo ID<small>(Front)</small>
                      </label>
                      <Button variant="contained" component="label"  className={
                          classess.page__fieldsContainer__form__formfield__button
                        }>
                        <span><UploadFileIcon className={classess.page__fieldsContainer__form__formfield__button__upload} /></span> Drag & Drop files here
                        <input hidden accept="image/*" multiple type="file" />
                      </Button>
                    </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                <Box
                      varient="div"
                      component="div"
                      className={classess.page__fieldsContainer__form__formfield}
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Copy of Artist's Photo ID<small>(Back)</small>
                      </label>
                      <Button variant="contained" component="label"  className={
                          classess.page__fieldsContainer__form__formfield__button
                        }>
                        <span><UploadFileIcon className={classess.page__fieldsContainer__form__formfield__button__upload} /></span> Drag & Drop files here
                        <input hidden accept="image/*" multiple type="file" />
                      </Button>
                    </Box>
                </Grid>
                {/* <Grid item xs={12} md={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Upload Distribution Agreement
                    </label>
                    <Button variant="contained" component="label"  className={
                        classess.page__fieldsContainer__form__formfield__button
                      }>
                      Drag & Drop files here or click to select files
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                  </Box>
                </Grid> */}
                {/* <Grid item md={8} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Receipient Address
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="Enter"
                      type="text"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      City
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="Enter"
                      type="text"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Zip/Postal Code
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="Enter"
                      type="number"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Country
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="Enter"
                      type="text"
                      required
                    />
                  </Box>
                </Grid> */}
                
              </Grid>
            </form>
          </Box>
        </Box>
      </Grid>
    </Grid>
    </>
  )
}

export default PaymentDetails