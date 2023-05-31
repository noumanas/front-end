import React, { useState } from 'react'
import classess from "./style.module.scss";
import Button from '@mui/material/Button';
import { Box, Grid, MenuItem, Select } from '@mui/material';
import PdfImage from '../../assets/pdf-image.png'
import ArtistFrontImage from '../../assets/frontId.png'
import ArtistBackImage from '../../assets/backId.png'

const PaymentPreview = () => {
  return (
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
                Please verify details
              </span>
            </Box>
            <form action="" className={classess.page__fieldsContainer__form}>
              <Grid container spacing={4} rowSpacing={4}>
                <Grid item md={3} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%", height: '100%'}}
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
                      disabled={true}
                    />

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
                      disabled={true}
                    />
                    
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
                      type="text"
                      required
                      disabled={true}
                    />

                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Routing#
                    </label>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="1234567"
                      type="number"
                      required
                      disabled={true}
                    />

                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Bank Address
                    </label>
                    <p className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      style={{margin: '0px'}}
                      >
                        123 Blacklion Avenue Atlanta, GA 12345 United States
                      </p>

                    {/* <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="123 Blacklion Avenue Atlanta, GA 12345 United States"
                      type="text"
                      required
                      disabled={true}
                    /> */}
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%", gap: '70px' }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      W8-BEN
                    </label>
                    <Box
                      varient="div"
                      component="div"
                      className={classess.page__fieldsContainer__form__formfield__imagebox}
                      sx={{ width: "100%", }}
                    >
                    <img
                      src={PdfImage}
                      className={
                        classess.page__fieldsContainer__form__formfield__image
                      }
                    />
                    </Box>
                      <Button variant="contained" className={classess.page__fieldsContainer__form__formfield__download_btn}>Download</Button>
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%", gap: '70px' }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Artist's Photo ID (Front)
                    </label>
                    <Box
                      varient="div"
                      component="div"
                      className={classess.page__fieldsContainer__form__formfield__imagebox}
                      sx={{ width: "100%", }}
                    >
                    <img
                      src={ArtistFrontImage}
                      className={
                        classess.page__fieldsContainer__form__formfield__image
                      }
                    />
                    </Box>
                      <Button variant="contained" className={classess.page__fieldsContainer__form__formfield__download_btn}>Download</Button>
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%", gap: '70px' }}
                  >
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Artist's Photo ID (Back)
                    </label>
                    <Box
                      varient="div"
                      component="div"
                      className={classess.page__fieldsContainer__form__formfield__imagebox}
                      sx={{ width: "100%", }}
                    >
                    <img
                      src={ArtistBackImage}
                      className={
                        classess.page__fieldsContainer__form__formfield__image
                      }
                    />
                    </Box>
                      <Button variant="contained" className={classess.page__fieldsContainer__form__formfield__download_btn}>Download</Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default PaymentPreview