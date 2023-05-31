import React from "react";
import { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CancelIcon from '@mui/icons-material/Cancel';

const PaymentSubmit = () => {

  const [email, setEmail] = useState('')
  const [list, setList] = useState([])
  const [addEmail, setAddEmail] = useState(false)

  const handleAddEmail = () => {
    // setAddEmail('true')
    setList([...list, {email}])
    console.log('list', list)
    setEmail('')
  }

  const handleRemoveEmail = (e) => {
    const email = e.target.getAttribute("email")
    setList(list.filter(item => item.email !== email))
  }

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
                Please enter email address
              </span>
            </Box>
            <form action="" className={classess.page__fieldsContainer__form}>
              <Grid container spacing={4} rowSpacing={4}>
                <Grid item md={6} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    {
                      list &&
                      list.map((el, index1) => (
                        <>
                          <Grid container spacing={2}>
                          <Grid item md={8}>
                          <input
                            className={
                              classess.page__fieldsContainer__form__formfield__input
                            }
                            name="name"
                            placeholder="jb@blacklion.xyz"
                            type="email"
                            required
                            value={el.email}
                            defaultValue={el.email}
                            disabled={true}
                            onChange={(e) => {
                              let newList = list.map((obj) => {
                                if (obj.email === el.email) {
                                  return {...obj, email: e.target.value}
                                }
                                return obj
                              })
                              setList(newList)
                            }}
                          />
                          </Grid>
                          <Grid item md={1} sx={{position: 'relative'}}>
                            <span sx={{position: 'absolute', top: '10px'}}
                            >
                              <CancelIcon
                                email={el.email}
                                onClick={handleRemoveEmail}
                                className={
                                  classess.page__fieldsContainer__form__formfield__remove
                                }
                                // sx={{color: '#222',cursor: 'pointer',marginTop: '12px', transform: 'translateX(-50px)'}}
                              />
                            </span>
                          </Grid>
                          </Grid>
                        </>
                      ))
                    }
                    {/* {
                  addEmail &&
                  <>
                    <Grid container spacing={2}>
                    <Grid item md={8}>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="jb@blacklion.xyz"
                      type="email"
                      required
                    />
                    </Grid>
                    <Grid item md={1} sx={{position: 'relative'}}>
                      <span sx={{position: 'absolute', top: '10px'}}>
                        <CancelIcon
                          sx={{color: '#222',cursor: 'pointer',marginTop: '10px', transform: 'translateX(-50px)'}}
                          onClick={() => {setAddEmail(!addEmail)}}
                        />
                      </span>
                    </Grid>
                    </Grid>
                  </>
                  } */}
                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Email address
                    </label>
                    <Grid container spacing={2}>
                    <Grid item md={8}>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="jb@blacklion.xyz"
                      type="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    </Grid>
                    <Grid item md={4}>
                     <Button variant="contained" component="label" sx={{height: 46}}  className={
                        classess.page__fieldsContainer__form__formfield__button
                      }
                      onClick={handleAddEmail}
                      disabled={!email.length ? true : false}
                      >
                      Add Email
                    </Button>
                    </Grid>
                    </Grid>
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

export default PaymentSubmit