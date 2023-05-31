import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Grid";
import appleMusicIcon from "../../../../src/assets/social/social-icon1.png";
import youtubeIcon from "../../../../src/assets/social/social-icon2.png";
import spotifyIcon from "../../../../src/assets/social/social-icon3.png";
import deezerIcon from "../../../../src/assets/social/social-icon5.png";
import amazonMusicIcon from "../../../../src/assets/social/social-icon6.png";
import tidalIcon from "../../../../src/assets/social/social-icon7.png";
import tiktokIcon from "../../../../src/assets/social/social-icon8.png";
import instagramIcon from "../../../../src/assets/social/social-icon9.png";
import twitterIcon from "../../../../src/assets/social/social-icon10.png";
import { getArtistById } from "../../../redux/slice/artist";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AddTracks from "../../../components/add-track/add-track";
import axios from "axios";
import { config as URLconfig } from "../../../enviorment/enviorment";

const FundingDetails = ({
  contract_length,
  artist,
  internationalNumberFormat,
  totalFunding,
  totalTracks,
  new_music_estimiate,
  setValue,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoading = useSelector((state) => state.artist.isLoading);
  const selectedTracksCount = useSelector(
    (state) => state.artist.selectedTracksCount
  );
  const [open, setOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);

  const reports = useSelector((state) => state.artist.reports);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (new_music_estimiate < 0) {
      toast.error("Please adjust the contract length or Release Date");
    }
  }, [new_music_estimiate]);

  useEffect(() => {
    if (id) {
      initUIData();
    }
  }, [id]); // eslint-disable-next-line

  const initUIData = () => {
    dispatch(
      getArtistById({
        id,
      })
    );
  };

  const handleOpen = () => setOpen(true);

  const handleClose = (res) => {
    setOpen(false);
    if (res) {
      initUIData();
    }
  };

  useEffect(() => {
    if (artist) {
      axios
        .get(`${URLconfig.BASE_URL}/artist-stats/${artist?.spotify_id}`)
        .then((res) => {
          let socialLinks = res?.data?.data?.links;
          setSocialLinks(
            socialLinks.filter(
              (item) =>
                item.source === "youtube" ||
                item.source === "deezer" ||
                item.source === "spotify" ||
                item.source === "tidal" ||
                item.source === "amazon" ||
                item.source === "apple_music"
            )
          );
        })
        .catch((error) => {
          console.log("artist stats error", error);
        });
    }
  }, [artist]); // eslint-disable-next-line

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Grid container className={classess.page__funding}>
        <Grid
          item
          xs={12}
          lg={12}
          xl={4}
          className={classess.page__funding__contain}
        >
          <Grid container className={classess.page__funding__image}>
            <Grid xs={5} sm={3} md={3} lg={3} xl={5}>
              <Avatar
                className={classess.page__funding__image__outer__inner__avatar}
                src={artist?.avatar}
                alt={artist?.name}
              />
               <div className={classess.page__funding__MLH}>{internationalNumberFormat.format(artist?.chartmetric?.cm_statistics?.sp_monthly_listeners)}</div>
               <div className={classess.page__funding__MLB}>Monthly listeners</div> 

            </Grid>
            <Grid
              item
              xs={7}
              sm={9}
              md={9}
              lg={9}
              xl={7}
              className={classess.page__funding__detail}
            >
              <Box varient="div" component="div">
                <Typography
                  variant="h1"
                  component="h1"
                  className={classess.page__funding__detail__title}
                >
                  {artist?.name}
                </Typography>
              </Box>
              <Box varient="div" component="div" mt={3}>
                <span className={classess.page__funding__estimate__title}>
                  Find them on:
                </span>
                <Box>
                  <span className={classess.page__funding__detail__icons_box}>
                    {socialLinks?.map((item) => {
                      return (
                        <img
                          style={{ cursor: "pointer" }}
                          key={item.id}
                          src={
                            (item.source === "deezer" && deezerIcon) ||
                            (item.source === "spotify" && spotifyIcon) ||
                            (item.source === "amazon" && amazonMusicIcon) ||
                            (item.source === "tidal" && tidalIcon) ||
                            (item.source === "tiktok" && tiktokIcon) ||
                            (item.source === "apple_music" && appleMusicIcon) ||
                            (item.source === "twitter" && twitterIcon) ||
                            (item.source === "instagram" && instagramIcon) ||
                            (item.source === "youtube" && youtubeIcon)
                          }
                          className={
                            classess.page__funding__estimate__social_icons
                          }
                          alt={`${item.source}`}
                          onClick={() => openInNewTab(`${item.url}`)}
                        />
                      );
                    })}
                  </span>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          lg={12}
          xl={8}
          item
          className={classess.page__funding__artist}
        >
          <Grid container className={classess.page__funding__container}>
            <Grid
              item
              md={5}
              className={`${classess.page__funding__estimate} ${classess.page__funding__border}`}
            >
              <span className={classess.page__funding__estimate__title}>
                Funding Estimate
              </span>

              <Box
                varient="div"
                component="div"
                className={classess.page__funding__estimate__amount}
              >
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__funding__estimate__amount__value}
                  >
                    <span>$ </span>
                    {new_music_estimiate < 0
                      ? internationalNumberFormat.format(totalFunding)
                      : internationalNumberFormat.format(
                          new_music_estimiate + totalFunding
                        )}
                    <br />
                  </Box>
                )}
              </Box>

              <span className={classess.page__funding__estimate__text}>
                <span
                  className={classess.page__funding__estimate__text__sm_title}
                >
                  Catalogue Income
                </span>
                <br></br>
                <span>$</span>
                {internationalNumberFormat.format(totalFunding)}
              </span>

              <span className={classess.page__funding__estimate__text}>
                <span
                  className={classess.page__funding__estimate__text__sm_title}
                >
                  New Music Income
                </span>
                <br></br>
                <span>$</span>
                {new_music_estimiate < 0
                  ? 0
                  : internationalNumberFormat.format(new_music_estimiate)}
              </span>
            </Grid>
            <Grid md={7} className={classess.page__funding__estimate} gap={4}>
              <Box
                varient="div"
                component="div"
                className={classess.page__funding__artist__estimate_wrapper}
              >
                <span className={classess.page__funding__estimate__title}>
                  Actual Earnings
                </span>

                {reports.length > 0 && (
                  <>
                    <span
                      className={
                        classess.page__funding__estimate__title__verify
                      }
                    >
                      <CheckIcon
                        sx={{
                          fontSize: "15px",
                          border: "1px solid #fff",
                          borderRadius: "100px",
                        }}
                      />
                      Verified
                    </span>
                  </>
                )}
              </Box>

              <Box varient="div" component="div">
                <span className={classess.page__funding__estimate__text}>
                  <span>$</span>
                  {reports.length > 0 ? (
                    <>
                      {internationalNumberFormat.format(
                        Math.round(
                          reports[reports.length - 1]["income_report"][0]
                            .amount +
                            reports[reports.length - 1]["income_report"][1]
                              .amount +
                            reports[reports.length - 1]["income_report"][2]
                              .amount +
                            reports[reports.length - 1]["income_report"][3]
                              .amount
                        )
                      )}
                    </>
                  ) : (
                    0
                  )}
                </span>
              </Box>

              <Box
                varient="div"
                component="div"
                className={classess.page__funding__artist__details_wrapper}
              >
                <Box varient="div" component="div">
                  <span className={classess.page__funding__artist__details}>
                    Total Tracks:
                  </span>
                  <Tooltip title="Total tracks of the artist">
                    <span
                      className={
                        classess.page__funding__artist__details__pointer
                      }
                    >
                      {totalTracks}
                    </span>
                  </Tooltip>
                  <span
                    className={classess.page__funding__artist__details__pointer}
                  >
                    {" "}
                    ~
                  </span>
                  <Tooltip title="Number of selected tracks">
                    <span
                      className={
                        classess.page__funding__artist__details__pointer
                      }
                    >
                      {" "}
                      {selectedTracksCount}
                    </span>
                  </Tooltip>
                </Box>
                <Box varient="div" component="div">
                  <span className={classess.page__funding__artist__details}>
                    Length of Contract:
                  </span>
                  <span className={classess.page__funding__estimate__text}>
                    {contract_length} years
                  </span>
                  <Box></Box>
                </Box>
              </Box>
              <Box varient="div" component="div" sx={{ width: "100%" }}>
                <button
                  className={classess.page__funding__estimate__text__button}
                  onClick={() => setValue("4")}
                >
                  Add New Music
                  <ArrowForwardIcon />
                </button>
                <span
                  className={
                    classess.page__funding__estimate__text__button__note
                  }
                >
                  *New tracks will improve artist funding estimates
                </span>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AddTracks
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        spotifyId={artist?.spotify_id}
      />
    </Box>
  );
};

export default FundingDetails;
