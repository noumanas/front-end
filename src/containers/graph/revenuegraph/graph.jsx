import React from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { abbreviateNumber } from "../../../utils/helper";
import { config as URLconfig } from "../../../enviorment/enviorment";

const RevenueGraph = ({ artist }) => {
  const [youtube_data, set_youtube_data] = useState(0);
  const [titok_data, set_titok_data] = useState(0);
  const [spotify_data, set_spotify_data] = useState(0);
  const [deezer_data, set_deezer_data] = useState(0);

  const data = [
    [
      "Views",
      "Stream",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ["Tiktok", titok_data, "#3b5998", abbreviateNumber(titok_data)],
    ["Youtube", youtube_data, "#d62976", abbreviateNumber(youtube_data)],
    ["Spotify", spotify_data, "#00acee", abbreviateNumber(spotify_data)],
    ["Deezer", deezer_data, "orange", abbreviateNumber(deezer_data)],
  ];

  const options = {
    backgroundColor: "transparent",

    legend: { position: "none" },
    hAxis: {
      textStyle: { color: "white" },
    },
    vAxis: {
      textStyle: { color: "white" },
    },
  };

  async function drawChart() {
    var lables = [];

    var spotify_data = 0;
    var youtube_data = 0;
    var titok_data = 0;
    var deezer = 0;

    // Create the data table.
    const response = await fetch(
      `${URLconfig.BASE_URL}/artist-tracks/${artist?.spotify_id}`
    );
    const datalocal = await response.json();

    for (let i = 0; i < datalocal.data.length; i++) {
      lables.push(datalocal.data[i].title);
      spotify_data = spotify_data + datalocal.data[i].spotify_streams_total;
      youtube_data = youtube_data + datalocal.data[i].youtube_video_views_total;
      titok_data = titok_data + datalocal.data[i].tiktok_views_total;
      deezer = deezer + datalocal.data[i].deezer_reach_total;
    }
    set_youtube_data(youtube_data);
    set_spotify_data(spotify_data);
    set_titok_data(titok_data);
    set_deezer_data(deezer);
  }

  useEffect(() => {
    if (artist) {
      drawChart();
    }
  }, [artist]);

  const totalViews = titok_data + youtube_data + spotify_data + deezer_data;
  const formattedViews = totalViews.toLocaleString("en-US");

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
            All Platforms Total Streams
          </Box>
          <Box
            component="div"
            variant="div"
            sx={{ color: "#fff" }}
            className={classess.page__banner__views}
          >
            <span style={{ margin: "0" }}>{formattedViews}</span>
          </Box>

          <Grid sx={{ marginTop: "-40px", width: "100%" }}>
            <Chart
              chartType="BarChart"
              data={data}
              options={options}
              width={"100%"}
              height={"220px"}
            />
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default RevenueGraph;
