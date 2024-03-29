import React from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const GenreGraph = ({ artist }) => {
  return (
    <div>
      <Box
        component="div"
        variant="div"
        className={classess.page__banner}
        mt={2}
        p={3}
      >
        <Box
          variant="div"
          component="div"
          className={classess.page__banner__conatiner}
          sx={{ alignItems: "flex-start" }}
        >
          <Box component="div" variant="div" sx={{ color: "#fff" }}>
            Genres
          </Box>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid>
              <Box>
                <Stack
                   direction="row"
                   flexWrap={"wrap"}
                   alignContent="center"
                   alignItems="center"
                   sx={{ margin: "5px 5px 5px 5px"}}
                >
                  {artist?.genres.length > 0 ? (
                    artist?.genres.map((genres, index) => {
                      return (
                        <Chip
                        className={classess.page__banner__conatiner__chip}
                          key={index}
                          label={genres}
                          color="primary"
                          sx={{ color: "#fff" ,margin: "5px 5px 5px 5px"}}
                        ></Chip>
                      );
                    })
                  ) : (
                    <>
                      <Chip
                      className={classess.page__banner__conatiner__chip}
                        label={
                          Array.isArray(artist?.chartmetric?.genres?.primary)
                            ? artist?.chartmetric?.genres?.primary[0]?.name
                            : artist?.chartmetric?.genres?.primary?.name
                        }
                        color="primary"
                        sx={{ color: "#fff",margin: "5px 5px 5px 5px" }}
                      ></Chip>
                      <Chip
                      className={classess.page__banner__conatiner__chip}
                        label={
                          Array.isArray(artist?.chartmetric?.genres?.secondary)
                            ? artist?.chartmetric?.genres?.secondary[0]?.name
                            : artist?.chartmetric?.genres?.secondary?.name
                        }
                        color="primary"
                        sx={{ color: "#fff",margin: "5px 5px 5px 5px" }}
                      ></Chip>
                    </>
                  )}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default GenreGraph;
