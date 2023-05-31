import React, { useEffect, useRef, useState } from "react";
import classess from "./style.module.scss";
import classes from "../../home/style.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import AddMyArtist from "../../../components/add-my-artist-popup/add-my-artist";
import SimilarArtist from "../../../components/similar-artist/similar-artist";
import ArtistTopTracks from "../../../components/artist-top-tracks/artist-top-tracks";
import axios from "axios";
import useGetSimilarArtist from "../../../hooks/useGetSimilarArtist";
import ViewGraph from "../../graph/viewsgraph/graph";
import RevenueGraph from "../../graph/revenuegraph/graph";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import GenreGraph from "../../graph/streamGraph/graph";
import BubbleMaps from "../../graph/stats/statsGraph";
import SocialMediaGraph from "../../graph/socialMediaGraph/graph";
import { useQuery } from "@tanstack/react-query";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArtistById } from "../../../redux/slice/artist";
import { config as URLconfig } from "../../../enviorment/enviorment";
import { CircularProgress, Skeleton } from "@mui/material";
import { viewArtistUseStyles } from "../../../custom-mui-style/custom-mui-styles";
import RecommendCollaborations from "../../../components/recommend-collaborations/recommend-collaborations";

const ViewArtist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const artist = useSelector((state) => state.artist.artist);
  const status = useSelector((state) => state.artist.status);
  const authUser = useSelector((state) => state.auth.user);
  const similarArtist = useSelector(
    (state) => state.similar_artist.similarArtist
  );
  const [queue, setQueue] = useState(null);
  const [isLoadedQueue, setIsLoadedQueue] = useState(false);
  const [tracks, settracks] = useState([]);
  const [toptrackfunding, settoptrackfunding] = useState([]);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const similarArtistHook = useGetSimilarArtist();
  const [sortedTopTract, setSortedTopTract] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const internationalNumberFormat = new Intl.NumberFormat("en-US");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (id) {
      dispatch(getArtistById({ id }));
    }
  }, [id]);

  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((on) => !on);
  };
  const [clicked, setClicked] = React.useState(true);
  const handleClicked = () => {
    setClicked((off) => !off);
  };

  const getSimilarArtistForCurrentArtist = (id) => {
    similarArtistHook.similarArtists(id);
  };

  const mapTracks = (artistTrack) => ({
    id: artistTrack._id,
    name: artistTrack.title,
    image: artistTrack.track_img,
    stream_income_share: artistTrack.stream_income_share,
    spotify_streams_total: artistTrack.spotify_streams_total,
    youtube_video_views_total: artistTrack.youtube_video_views_total,
    tiktok_views_total: artistTrack.tiktok_views_total,
    deezer_reach_total: artistTrack.deezer_reach_total,
    isrc: artistTrack.isrc,
    release_date: artistTrack.release_date,
    track_type: artistTrack.track_type,
    last_streams_growth: artistTrack.last_streams_growth,
    historic: artistTrack.historic,
  });

  //calculate the top10track Funding for last 60 days
  async function calcalute_tracks_estimate(tracks) {
    axios
      .post(
        `${URLconfig.BASE_URL}/artist-funding/${artist?.spotify_id}/track`,
        tracks
      )
      .then((res) => {
        settoptrackfunding(res.data.data.funding);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    const filteredData = tracks.map((item) => {
      const fundingItem = toptrackfunding.find(
        (funding) => funding.TrackID === item.id
      );
      if (fundingItem) {
        return {
          ...item,
          funding: fundingItem.funding,
        };
      } else {
        return item;
      }
    });
    setSortedTopTract(filteredData.sort((a, b) => b.funding - a.funding));
  }, [tracks, toptrackfunding]);
  useEffect(() => {
    if (artist && Object.keys(artist).length) {
      let isApiSubscribed = true;

      axios(
        `${URLconfig.BASE_URL}/artist-tracks/top/tracks/${artist.spotify_id}`
      ).then(async (res) => {
        if (isApiSubscribed) {
          const artistTracks = res.data.data.top10tracks;
          settracks([...artistTracks.map(mapTracks)]);
          calcalute_tracks_estimate(artistTracks.map(mapTracks));
          setLoader(false);
        }
      });

      if (isApiSubscribed) {
        getSimilarArtistForCurrentArtist(artist?.spotify_id);
      }

      return () => {
        isApiSubscribed = false;
      };
    }
  }, [artist]); // eslint-disable-next-line

  useEffect(() => {
    if (artist && queue !== 0) {
      const intervalId = setInterval(() => {
        axios
          .get(`${URLconfig.BASE_URL}/songstats/counter/${artist?.spotify_id}`)
          .then((response) => {
            let result = response.data;
            setQueue(result.data?.count);
            setIsLoadedQueue(true);
          });
      }, 3000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [artist, queue]);

  const styles = viewArtistUseStyles();

  return (
    <Container maxWidth="xxl" className={styles.root}>
      <Grid container spacing={2} className={classess.page}>
        <Grid item sm={12} lg={3} xl={3} className={classess.page__artist}>
          <Box
            varient="div"
            component="div"
            className={classess.page__artist__box}
          >
            <Box className={classes.page}>
              <Box sx={{ width: "100%" }}>
                <Box className={classes.page__banner}>
                  <Box
                    variant="div"
                    component="div"
                    className={classes.page__banner__conatiner}
                  >
                    <Box
                      varient="div"
                      component="div"
                      className={classes.page__banner__conatiner__bg}
                    ></Box>
                    <Box
                      variant="div"
                      component="div"
                      className={classes.page__banner__conatiner__image}
                    >
                      <Box
                        variant="div"
                        component="div"
                        className={
                          classes.page__banner__conatiner__image__outer_layer
                        }
                      >
                        <Box
                          variant="div"
                          component="div"
                          className={
                            classes.page__banner__conatiner__image__outer_layer__inner_layer
                          }
                        >
                          {status === "succeeded" ? (
                            <Avatar
                              src={artist?.avatar}
                              alt={artist?.name}
                              sx={{ height: 100, width: 100 }}
                            />
                          ) : (
                            <Skeleton
                              variant="circular"
                              width={100}
                              height={100}
                              sx={{ bgcolor: "grey.700" }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      variant="div"
                      component="div"
                      className={classes.page__banner__conatiner__content}
                    >
                      <Box
                        variant="div"
                        component="div"
                        className={
                          classes.page__banner__conatiner__content__details
                        }
                      >
                        <Box
                          variant="div"
                          component="div"
                          className={
                            classes.page__banner__conatiner__content__details__box
                          }
                        >
                          <Box
                            variant="div"
                            component="div"
                            className={
                              classes.page__banner__conatiner__content__details__box__value__name
                            }
                          >
                            {artist?.name}
                          </Box>
                        </Box>
                        <Box
                          variant="div"
                          component="div"
                          className={
                            classes.page__banner__conatiner__content__details__box
                          }
                        >
                          <Box
                            variant="div"
                            component="div"
                            className={
                              classes.page__banner__conatiner__content__details__box__value__country
                            }
                          >
                            {artist?.country}
                          </Box>
                        </Box>
                        <Box
                          variant="div"
                          component="div"
                          className={
                            classes.page__banner__conatiner__content__details__box
                          }
                        >
                          <Box
                            variant="div"
                            component="div"
                            className={
                              classes.page__banner__conatiner__content__details__box__value__country
                            }
                          >
                            {artist?.email}
                          </Box>
                        </Box>

                        <Box
                          variant="div"
                          component="div"
                          className={
                            classes.page__banner__conatiner__content__details__box
                          }
                          sx={{ flexDirection: "column", marginTop: "10px" }}
                        >
                          {isLoadedQueue ? (
                            <span style={{ color: "#FFF" }}>
                              {queue === 0 ? (
                                <Chip
                                  color="primary"
                                  label="Active"
                                  sx={{ padding: 2 }}
                                />
                              ) : (
                                <Chip
                                  color="warning"
                                  label={`Pending ${queue}`}
                                />
                              )}
                            </span>
                          ) : (
                            <CircularProgress size={40} color="secondary" />
                          )}
                          <Stack
                            direction="column"
                            gap={2}
                            className={
                              classess.page__artist__box__btn_container__funding_btn_wrapper
                            }
                          >
                            <Button
                              type="button"
                              onClick={() =>
                                navigate(`/blig/view-funding-dashboard/${id}`)
                              }
                              className={
                                classess.page__artist__box__btn_container__btn_pink
                              }
                              sx={{ opacity: queue !== 0 ? 0.3 : 1 }}
                              disabled={
                                isLoadedQueue && queue === 0 ? false : true
                              }
                            >
                              View Funding Dashboard
                            </Button>
                            {user.role !== "artist" && (
                              <Button
                                type="button"
                                variant="outlined"
                                onClick={() =>
                                  navigate(`/blig/edit-artist/${id}`)
                                }
                                className={
                                  classess.page__details__box__adetails__header__btn
                                }
                                sx={{
                                  margin: "0 auto",
                                  width: "100%",
                                }}
                              >
                                Edit Artist
                              </Button>
                            )}

                            {authUser.role === "admin" && (
                              <Button
                                type="button"
                                onClick={() =>
                                  navigate(`/blig/view-artist/${id}/users`)
                                }
                                className={
                                  classess.page__artist__box__btn_container__btn
                                }
                              >
                                View A&R Users
                              </Button>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Box>
                    <Box variant="div" component="div" pl={3} pb={1}>
                      <FormControlLabel
                        sx={{ color: "white" }}
                        control={
                          <Switch checked={checked} onChange={handleChange} />
                        }
                        label="Platform Chart"
                      />
                      <FormControlLabel
                        sx={{ color: "white" }}
                        control={
                          <Switch checked={clicked} onChange={handleClicked} />
                        }
                        label="Total Streams"
                      />
                    </Box>
                  </Box>
                </Box>
                <Box component="div" variant="div">
                  <GenreGraph artist={artist} />
                </Box>
                <Box
                  className={`${classess.page__details} ${classess.tabDisplay}`}
                  mt={2}
                >
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
                          Top Tracks
                        </span>
                        <Button
                          type="button"
                          onClick={() => navigate(`/blig/artist-tracks/${id}`)}
                          className={
                            classess.page__details__box__adetails__header__btn
                          }
                        >
                          View All
                        </Button>
                      </Box>
                      <ArtistTopTracks
                        loader={loader}
                        tracks={tracks}
                        artist={artist}
                        toptrackfunding={toptrackfunding}
                        sortedTopTract={sortedTopTract}
                        internationalNumberFormat={internationalNumberFormat}
                      />
                    </Box>
                  </Box>

                  <Box>
                    <BubbleMaps artist={artist} />
                    <RecommendCollaborations
                      collaborations={artist?.collaborations}
                    />
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__similar__box}
                    mt={2}
                  >
                    <SimilarArtist similarArtist={similarArtist} />
                  </Box>
                </Box>

                <Collapse in={checked}>
                  <Box component="div" variant="div">
                    <ViewGraph artist={artist} />
                  </Box>
                </Collapse>
                <Collapse in={clicked}>
                  <Box component="div" variant="div">
                    <RevenueGraph artist={artist} />
                  </Box>
                </Collapse>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          lg={6}
          xl={6}
          className={`${classess.page__details} ${classess.tabHide} `}
        >
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
                  Top Tracks
                </span>
                <Button
                  type="button"
                  onClick={() => navigate(`/blig/artist-tracks/${id}`)}
                  className={classess.page__details__box__adetails__header__btn}
                >
                  View All
                </Button>
              </Box>
              <ArtistTopTracks
                loader={loader}
                tracks={tracks}
                artist={artist}
                toptrackfunding={toptrackfunding}
                sortedTopTract={sortedTopTract}
                internationalNumberFormat={internationalNumberFormat}
              />
            </Box>
          </Box>

          <Box>
            <BubbleMaps artist={artist} />
            {artist && (
              <RecommendCollaborations
                artist_collaborations={artist?.collaborations}
              />
            )}
          </Box>
        </Grid>
        <Grid item sm={12} lg={3} xl={3} className={classess.page__similar}>
          <Box
            varient="div"
            component="div"
            className={`${classess.page__similar__box} ${classess.tabHide} `}
          >
            <SimilarArtist similarArtist={similarArtist} />
          </Box>

          <Grid item sm={12} lg={12} xl={12} className={classess.page__similar}>
            <Box
              varient="div"
              component="div"
              className={classess.page__similar__box}
            >
              <SocialMediaGraph artist={artist} />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <AddMyArtist
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default ViewArtist;
