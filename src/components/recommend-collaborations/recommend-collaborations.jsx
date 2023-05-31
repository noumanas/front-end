import { Box, Grid, Button, ButtonGroup } from "@mui/material";
import classess from "./style.module.scss";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Stack from "@mui/material/Stack";
import TourRecommendations from "../../containers/graph/tourRecommendations/graph";
import { searchArtist } from "../../api/spotify.api";
import axios from "axios";
import { config as URLconfig } from "../../enviorment/enviorment";
import { useDispatch, useSelector } from "react-redux";
import { getArtistById } from "../../redux/slice/artist";
import Skeleton from "@mui/material/Skeleton";

const RecommendCollaborations = ({ artist_collaborations }) => {
  const [collaborations, setCollaborations] = useState(
    artist_collaborations && artist_collaborations.length > 0
      ? artist_collaborations
      : []
  );
  const artist = useSelector((state) => state.artist.artist);
  const [collaboration, setCollaboration] = useState(true);
  const [financial, setFinancial] = useState(false);
  const [recommendations, setRecommendations] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let fetcher = () => {
    let arr = [];
    Promise.all(
      collaborations.map((e) => {
        searchArtist(e["title"])
          .then((res) => {
            const artist = res.artists.items[0];

            artist["title"] = e["title"];
            artist["whyis"] = e["description"];
            arr.push(artist);
          })
          .catch((err) => {
            console.log("Err: ", err);
          });
      })
    );
    setData(arr);
  };
  useEffect(() => {
    let isSubscribed = true;
    if (collaborations && Object.keys(collaborations).length > 0) {
      if (isSubscribed === true) {
        fetcher();
        return () => {
          isSubscribed = false;
        };
      }
    } else {
      refresh();
    }
  }, [collaborations]);

  const handleCollaboration = () => {
    setCollaboration(true);
    setFinancial(false);
    setRecommendations(false);
  };

  const handleFinancial = () => {
    setFinancial(true);
    setCollaboration(false);
    setRecommendations(false);
  };

  const handleRecommendation = () => {
    setRecommendations(true);
    setCollaboration(false);
    setFinancial(false);
  };

  const refresh = () => {
    setIsLoading(true);
    const payload = {
      spotify_id: `${artist?.spotify_id}`,
    };
    axios
      .put(
        `${URLconfig.BASE_URL}/artists/action/refresh-colloboration`,
        payload
      )
      .then((res) => {
        setCollaborations(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Box
        component="div"
        variant="div"
        className={classess.page__banner}
        mt={2}
        p={3}
      >
        <Box variant="div" component="div" sx={{ alignItems: "flex-start" }}>
          {/* <Box component="div" variant="div" sx={{ color: "#fff" }}>
            Smart Insights
          </Box> */}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            // columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12} sm={12} md={4} lg={12} xl={4}>
              <Box component="div" variant="div" sx={{ color: "#fff" }}>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classess.page__banner__insights_title}
                >
                  Smart Insights
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={12}
              xl={8}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <ButtonGroup
                aria-label=""
                className={classess.page__banner__btn_group}
                sx={{ gap: "9px" }}
              >
                <Button
                  className={classess.page__banner__btn_group__btn}
                  sx={
                    collaboration && { backgroundColor: "#1976d2 !important" }
                  }
                  onClick={handleCollaboration}
                >
                  Collaboration
                </Button>
                <Button
                  className={classess.page__banner__btn_group__btn}
                  sx={
                    recommendations && { backgroundColor: "#1976d2 !important" }
                  }
                  onClick={handleRecommendation}
                >
                  Tour Recommendations
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>

          <Box variant="div" component="div" mt={5}>
            {collaboration && (
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ overflowX: "scroll" }}
              >
                {data &&
                  data.map((artist, index) => {
                    return (
                      <Card
                        sx={{
                          maxWidth: 1200,
                          backgroundColor: "#0e141a",
                          color: "#fff",
                          flexBasis: "40%",
                          flexShrink: 0,
                          borderRadius: "12px",
                        }}
                        className={classess.page__banner_mb}
                        key={artist?.title}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={
                              artist?.images[0]?.url
                                ? artist?.images[0]?.url
                                : "https://via.placeholder.com/600x400?text=Not+Found"
                            }
                            alt="artist"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              // className={classess.page__banner__Title}
                            >
                              {artist?.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="#fff"
                              className={classess.page__banner__hoveradd}
                            >
                              {artist?.whyis}
                              <Box className={classess.page__banner__button}>
                                <Button
                                  onClick={() =>
                                    window.open(
                                      `https://open.spotify.com/search/${artist?.title}`
                                    )
                                  }
                                  variant="contained"
                                  type="button"
                                >
                                  View
                                </Button>
                              </Box>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    );
                  })}
              </Stack>
            )}
            {collaboration && data && (
              <Button disabled={isLoading} onClick={() => refresh()}>
                {isLoading ? "Please wait" : "Refresh"}
              </Button>
            )}

            {financial && <h2>Financial component</h2>}

            {recommendations && <TourRecommendations />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RecommendCollaborations;
