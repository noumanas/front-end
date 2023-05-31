import React, { useEffect } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ArtistContractList from "../../components/ArtistContractList/ArtistContractList";

const MyContracts = () => {
  return (
    <Container maxWidth="xxl">
      <Grid container spacing={2} className={classess.page}>
        <Grid item sm={12} lg={12} xl={9} className={classess.page__details}>
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
                  className={
                    classess.page__details__box__adetails__header__title
                  }
                >
                  Contracts
                </span>
                {/* <Button
                  type="button"
                  onClick={() => navigate(`/blig/NewContract`)}
                  className={classess.page__details__box__adetails__header__btn}
                >
                  New Contract
                </Button> */}
              </Box>
              <ArtistContractList />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyContracts;
