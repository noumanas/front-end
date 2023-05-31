import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import Grid from "@mui/material/Grid";
import { Chart } from "react-google-charts";
import axios from "axios";
import { config as URLconfig } from "../../../../src/enviorment/enviorment";
import { Button } from "@mui/material";
import { abbreviateNumber } from "../../../utils/helper";
const SocialMediaGraph = (artist) => {
  const [spotify_followrs, setSpotify_followers] = useState(0);
  const [
    spotify_monthly_listeners_current,
    set_spotify_monthly_listeners_current,
  ] = useState(0);
  const [spotify_popularity_current, set_spotify_popularity_current] =
    useState(0);
  const [daily_listeners_current, set_spotify_daily_listeners_current] =
    useState(0);
  const [instagram_followrs, setInstagram_followers] = useState(0);
  const [Instagram_views_total, setInstagram_views_total] = useState(0);
  const [Instagram_likes_total, setInstagram_likes_total] = useState(0);
  const [Instagram_comments_total, setInstagram_comments_total] = useState(0);
  const [Instagram_video_reach_total, setInstagram_video_reach_total] =
    useState(0);
  const [Instagram_video_videos_total, setInstagram_videos_total] = useState(0);
  const [youtube_subscribers_total, setyoutube_subscribers_total] = useState(0);
  const [youtube_video_views_total, setyoutube_video_views_total] = useState(0);
  const [youtube_video_likes_total, setyoutube_video_likes_total] = useState(0);
  const [youtube_video_comments_total, setyoutube_video_comments_total] =
    useState(0);
  const [youtube_shorts_total, setyoutube_shorts_total] = useState(0);
  const [youtube_video_reach_total, setyoutube_video_reach_total] = useState(0);
  const [youtube, setYoutube] = useState(false);
  const [spotify, setSpotify] = useState(true);
  const [tiktok, setTiktok] = useState(false);
  // const [tiktok_comments_total,settiktok_comments_total]=useState(0);
  const [tiktok_followers_total, settiktok_followers_total] = useState(0);
  const [tiktok_likes_total, settiktok_likes_total] = useState(0);
  // const [tiktok_profile_likes_total ,settiktok_profile_likes_total]=useState(0);
  // const [tiktok_profile_videos_total ,settiktok_profile_videos_total]=useState(0);
  const [tiktok_shares_total, settiktok_shares_total] = useState(0);
  // const [tiktok_video_reach_total,settiktok_video_reach_total]=useState(0);
  const [tiktok_videos_total, settiktok_videos_total] = useState(0);
  const [tiktok_views_total, settiktok_views_total] = useState(0);

  const [Instagram, setInstagram] = useState(false);
  const spotify_data = [
    ["Platforms", "Growth"],
    [
      "Spotify Followers " + abbreviateNumber(spotify_followrs),
      spotify_followrs,
    ],
    [
      "Total Listeners " + abbreviateNumber(spotify_monthly_listeners_current),
      spotify_monthly_listeners_current,
    ],
    [
      "popularity " + abbreviateNumber(spotify_popularity_current),
      spotify_popularity_current,
    ],
    [
      "Daily Listeners " + abbreviateNumber(daily_listeners_current),
      daily_listeners_current,
    ],
  ];
  const Instagram_Data = [
    ["Platforms", "Growth"],
    [
      "Followers " + abbreviateNumber(youtube_subscribers_total),
      youtube_subscribers_total,
    ],
    [
      "Views Total " + abbreviateNumber(Instagram_views_total),
      Instagram_views_total,
    ],
    [
      "Likes Total " + abbreviateNumber(Instagram_likes_total),
      Instagram_likes_total,
    ],
    [
      "Comments Total " + abbreviateNumber(Instagram_comments_total),
      Instagram_comments_total,
    ],
    [
      "Videos Reach Total " + abbreviateNumber(Instagram_video_reach_total),
      Instagram_video_reach_total,
    ],
    [
      "videos_total " + abbreviateNumber(Instagram_video_videos_total),
      Instagram_video_videos_total,
    ],
  ];
  const Titkok_Data = [
    ["Platforms", "Growth"],
    // [
    //   "Comments Total" + abbreviateNumber(tiktok_comments_total),
    //   tiktok_comments_total,
    // ],
    [
      "Followers Total " + abbreviateNumber(tiktok_followers_total),
      tiktok_followers_total,
    ],
    [
      "Likes Total " + abbreviateNumber(tiktok_likes_total || 0),
      tiktok_likes_total || 0,
    ],
    // [
    //   "Profile Likes Total" + abbreviateNumber(tiktok_profile_likes_total || 0),
    //   tiktok_profile_likes_total || 0,
    // ],
    // [
    //   "Profile Videos Total" + abbreviateNumber(tiktok_profile_videos_total || 0),
    //   tiktok_profile_videos_total || 0,
    // ],
    [
      "Shares Total" + abbreviateNumber(tiktok_shares_total || 0),
      tiktok_shares_total || 0,
    ],
    // [
    //   "Video Reach Total" + abbreviateNumber(tiktok_video_reach_total || 0),
    //   tiktok_video_reach_total || 0,
    // ],
    [
      "Videos Total" + abbreviateNumber(tiktok_videos_total || 0),
      tiktok_videos_total || 0,
    ],
    [
      "views Total" + abbreviateNumber(tiktok_views_total || 0),
      tiktok_views_total || 0,
    ],
  ];
  const Youtube_Data = [
    ["Platforms", "Growth"],
    ["Subscribers " + abbreviateNumber(instagram_followrs), instagram_followrs],
    [
      "Video Views Total " + abbreviateNumber(youtube_video_views_total),
      youtube_video_views_total,
    ],
    [
      "Likes Total " + abbreviateNumber(youtube_video_likes_total),
      youtube_video_likes_total,
    ],
    [
      "Comments Total " + abbreviateNumber(youtube_video_comments_total || 0),
      youtube_video_comments_total || 0,
    ],
    [
      "Shorts Total " + abbreviateNumber(youtube_shorts_total || 0),
      youtube_shorts_total || 0,
    ],
    [
      "Video Reach Total " + abbreviateNumber(youtube_video_reach_total || 0),
      youtube_video_reach_total || 0,
    ],
  ];
  const options = {
    backgroundColor: "transparent",

    is3D: false,
    pieHole: 0.4,
    titleTextStyle: { color: "#FFFFFF" },
    slices: {
      0: { color: "#3b5998" },
      1: { color: "#d62976" },
      2: { color: "#00acee" },
    },
    pieSliceBorderColor: "none",

    pieSliceTextStyle: {
      color: "white",
      fontSize: "14",
    },
    animation: {
      duration: 1000,
      easing: "in",
      startup: true,
    },
    legend: {
      textStyle: { color: "white", fontSize: "14" },
      alignment: "left",
    },
    chartArea: { left: 10, top: 20, width: "100%", height: "100%" },
  };

  async function getdrawdata(spotify_id) {
    const repsonse = await axios.get(
      `${URLconfig.BASE_URL}/artist-stats/${spotify_id}`
    );
    if (repsonse.status === 200) {
      setSpotify_followers(repsonse.data.data.stats[0].data.followers_total);
      setInstagram_followers(repsonse.data.data.stats[4].data.followers_total);
      setInstagram_views_total(repsonse.data.data.stats[4].data.views_total);
      setInstagram_likes_total(repsonse.data.data.stats[4].data.likes_total);
      setInstagram_comments_total(
        repsonse.data.data.stats[4].data.comments_total
      );
      setInstagram_video_reach_total(
        repsonse.data.data.stats[4].data.video_reach_total
      );
      setInstagram_videos_total(repsonse.data.data.stats[4].data.videos_total);
      setyoutube_video_comments_total(
        repsonse.data.data.stats[6].data.video_comments_total
      );
      setyoutube_subscribers_total(
        repsonse.data.data.stats[6].data.subscribers_total
      );
      setyoutube_video_views_total(
        repsonse.data.data.stats[6].data.video_views_total
      );
      setyoutube_video_likes_total(
        repsonse.data.data.stats[6].data.video_likes_total
      );
      setyoutube_shorts_total(repsonse.data.data.stats[6].data.shorts_total);
      setyoutube_video_reach_total(
        repsonse.data.data.stats[6].data.video_reach_total
      );
      set_spotify_monthly_listeners_current(
        repsonse.data.data.stats[0].data.monthly_listeners_current
      );
      set_spotify_popularity_current(
        repsonse.data.data.stats[0].data.popularity_current
      );
      set_spotify_daily_listeners_current(
        repsonse.data.data.stats[0].data.daily_listeners_current
      );
      // settiktok_comments_total(repsonse.data.data.stats[5].data.comments_total);
      settiktok_followers_total(
        repsonse.data.data.stats[5].data.followers_total
      );
      settiktok_likes_total(repsonse.data.data.stats[5].data.likes_total);
      // settiktok_profile_likes_total(repsonse.data.data.stats[5].data.profile_likes_total);
      // settiktok_profile_videos_total(repsonse.data.data.stats[5].data.profile_videos_total);
      settiktok_shares_total(repsonse.data.data.stats[5].data.shares_total);
      // settiktok_video_reach_total(repsonse.data.data.stats[5].data.video_reach_total);
      settiktok_videos_total(repsonse.data.data.stats[5].data.videos_total);
      settiktok_views_total(repsonse.data.data.stats[5].data.views_total);
    }
  }

  useEffect(() => {
    if (artist) {
      getdrawdata(artist.artist?.spotify_id);
    }
  }, [artist]);

  const handleSpotify = () => {
    setSpotify(true);
    setInstagram(false);
    setYoutube(false);
    setTiktok(false);
  };

  const handleInstagram = () => {
    setInstagram(true);
    setSpotify(false);
    setYoutube(false);
    setTiktok(false);
  };
  const handleYoutube = () => {
    setInstagram(false);
    setSpotify(false);
    setYoutube(true);
    setTiktok(false);
  };
  const handleTiktok = () => {
    setInstagram(false);
    setSpotify(false);
    setYoutube(false);
    setTiktok(true);
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
        <Box
          variant="div"
          component="div"
          className={classess.page__banner__conatiner}
          sx={{ alignItems: "flex-start" }}
        >
          <Box
            variant="div"
            component="div"
            pb={1}
            className={classess.page__banner__conatiner__button_wrapper}
          >
            <Button
              onClick={handleSpotify}
              className={
                classess.page__banner__conatiner__button_wrapper__button
              }
            >
              Spotify
            </Button>
            <Button
              onClick={handleInstagram}
              className={
                classess.page__banner__conatiner__button_wrapper__button
              }
            >
              Instagram
            </Button>
            <Button
              onClick={handleYoutube}
              className={
                classess.page__banner__conatiner__button_wrapper__button
              }
            >
              Youtube
            </Button>
            <Button
              onClick={handleTiktok}
              className={
                classess.page__banner__conatiner__button_wrapper__button
              }
            >
              Tiktok
            </Button>
          </Box>
          <Box
            variant="div"
            component="div"
            className={classess.page__banner__conatiner}
            sx={{ alignItems: "flex-start" }}
          >
            <Box component="div" variant="div" sx={{ color: "#fff" }}>
              Social Media Insights
            </Box>
          </Box>
          {spotify && (
            <Grid sx={{ width: "100%" }}>
              <Chart
                chartType="PieChart"
                data={spotify_data}
                options={options}
                width={"100%"}
                height={"250px"}
              />
            </Grid>
          )}

          {Instagram && (
            <Grid sx={{ width: "100%" }}>
              <Chart
                chartType="PieChart"
                data={Instagram_Data}
                options={options}
                width={"100%"}
                height={"250px"}
              />
            </Grid>
          )}
          {youtube && (
            <Grid sx={{ width: "100%" }}>
              <Chart
                chartType="PieChart"
                data={Youtube_Data}
                options={options}
                width={"100%"}
                height={"250px"}
              />
            </Grid>
          )}
          {tiktok && (
            <Grid sx={{ width: "100%" }}>
              <Chart
                chartType="PieChart"
                data={Titkok_Data}
                options={options}
                width={"100%"}
                height={"250px"}
              />
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SocialMediaGraph;
