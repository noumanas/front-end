import React, { useEffect } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MyArtistViewContainer from "../../views/my-artist-view-container/my-artist-view-conatiner";
import {
  setSelectedTrackCount,
  setSelectedTracks,
  setTracks,
} from "../../redux/slice/artist";
import { useDispatch } from "react-redux";

const MyArtist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedTrackCount(0));
    dispatch(setSelectedTracks([]));
    dispatch(setTracks([]));
  }, []); // eslint-disable-next-line

  return (
    <Container maxWidth="xxl">
      <Box varient="div" component="div" className={classess.page}>
        <Box className={classess.page__banner}>
          <Box variant="div" component="div" className={classess.page__banner__background}>
          <Box
            variant="div"
            component="div"
            className={classess.page__banner__background__conatiner}
          >
            <Typography
              variant="h5"
              gutterBottom
              className={classess.page__banner__background__conatiner__title}
            >
              
            </Typography>
            <Box
              variant="div"
              component="div"
              className={classess.page__banner__background__conatiner__content}
            >
              <span
                className={classess.page__banner__background__conatiner__content__title}
              >
                My Artists
              </span>
            </Box>
          </Box>
          </Box>
        </Box>
        <Box
          varient="div"
          component="div"
          className={classess.page__main_content}
        >
          <MyArtistViewContainer selectedView="list" />
        </Box>
      </Box>
    </Container>
  );
};

export default MyArtist;
