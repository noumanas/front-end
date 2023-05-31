import React, { useEffect, useRef } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import homeBannerIcon from "../../assets/avatar/avatar2.avif";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import ArtistViewConatiner from "../../views/artist-view-conatiner/artist-view-conatiner";
import {
  setSelectedTrackCount,
  setSelectedTracks,
  setTracks,
} from "../../redux/slice/artist";

const Home = () => {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatchRef.current(setSelectedTrackCount(0));
    dispatchRef.current(setSelectedTracks([]));
    dispatchRef.current(setTracks([]));
  }, [dispatchRef]);

  return (
    <Container maxWidth="xxl">
      <span className={classess.page__banner__conatiner__content__main_heading}>
        Welcome to Black Lion.
      </span>
      <Grid container spacing={2}  className={classess.page}>
        <Grid item xs={12} md={12} lg={3}>
          <Box component="div" variant="div" className={classess.page__banner}>
            <Box
              variant="div"
              component="div"
              className={classess.page__banner__conatiner}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__banner__conatiner__bg}
              ></Box>
              <Box
                variant="div"
                component="div"
                className={classess.page__banner__conatiner__image}
              >
                <Box
                  variant="div"
                  component="div"
                  className={
                    classess.page__banner__conatiner__image__outer_layer
                  }
                >
                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__banner__conatiner__image__outer_layer__inner_layer
                    }
                  >
                    <Avatar
                      src={
                        user?.profilePicture
                          ? user?.profilePicture
                          : homeBannerIcon
                      }
                      alt={user?.firstName ? user?.firstName : "User Image"}
                      sx={{ height: 100, width: 100 }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                variant="div"
                component="div"
                className={classess.page__banner__conatiner__content}
              >
                <Box
                  variant="div"
                  component="div"
                  className={classess.page__banner__conatiner__content__details}
                >
                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__banner__conatiner__content__details__box
                    }
                  >
                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__banner__conatiner__content__details__box__value__name
                      }
                    >
                      {user?.firstName || "N/A"} {user?.lastName || "N/A"}
                    </Box>
                  </Box>

                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__banner__conatiner__content__details__box
                    }
                  >
                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__banner__conatiner__content__details__box__value__username
                      }
                    >
                      {user?.username || "N/A"}
                    </Box>
                  </Box>
                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__banner__conatiner__content__details__box
                    }
                  >
                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__banner__conatiner__content__details__box__value__company
                      }
                    >
                      Black Lion
                    </Box>
                  </Box>

                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__banner__conatiner__content__details__box
                    }
                  >
                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__banner__conatiner__content__details__box__value__country
                      }
                    >
                      London, United Kingdom
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          component="div"
          variant="div"
          className={classess.page__main_content}
          sm={12}
          md={12}
          lg={9}
        >
          <Grid>
            <ArtistViewConatiner selectedView="list" />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
