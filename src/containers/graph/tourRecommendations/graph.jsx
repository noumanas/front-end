import React, { useEffect, useState } from "react";

import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import axios from "axios";
import { config as URLconfig } from "../../../enviorment/enviorment";
import { useSelector } from "react-redux";

const Graph = () => {
  const [data, setData] = useState(null);
  const artist = useSelector((state) => state.artist.artist);

  async function drawChart() {
    // Create the data table.
    const country_data_resp = await axios.get(
      `${URLconfig.BASE_URL}/audience/${artist?.spotify_id}`
    );

    let total_current_listner_US = 0;
    let total_current_listner_RU = 0;
    let total_current_listner_FR = 0;
    let total_current_listner_DE = 0;
    let total_current_listner_GB = 0;
    let total_current_listner_AU = 0;
    let total_current_listner_FI = 0;
    let total_current_listner_NO = 0;
    let total_current_listner_IE = 0;
    let total_current_listner_SE = 0;
    let total_current_listner_MX = 0;
    let total_current_listner_BR = 0;
    let total_current_listner_TR = 0;
    let total_current_listner_PL = 0;
    let total_current_listner_ES = 0;
    let total_current_listner_CA = 0;
    let total_current_listner_IN = 0;
    let total_current_listner_PK = 0;
    let total_current_listner_NG = 0;
    let total_current_listner_CB = 0;
    let total_current_listner_CN = 0;

    for (
      var i = 0;
      i < country_data_resp.data.data.audience[0].data.monthly_listeners.length;
      i++
    ) {
      let country_code =
        country_data_resp.data.data.audience[0].data.monthly_listeners[i]
          .country_code;
      let current_listenrs =
        country_data_resp.data.data.audience[0].data.monthly_listeners[i]
          .current_listeners;
      if (country_code === "US") {
        total_current_listner_US += current_listenrs;
      } else if (country_code === "RU") {
        total_current_listner_RU += current_listenrs;
      } else if (country_code === "FR") {
        total_current_listner_FR += current_listenrs;
      } else if (country_code === "DE") {
        total_current_listner_DE += current_listenrs;
      } else if (country_code === "GB") {
        total_current_listner_GB += current_listenrs;
      } else if (country_code === "AU") {
        total_current_listner_AU += current_listenrs;
      } else if (country_code === "FI") {
        total_current_listner_FI += current_listenrs;
      } else if (country_code === "NO") {
        total_current_listner_NO += current_listenrs;
      } else if (country_code === "IE") {
        total_current_listner_IE += current_listenrs;
      } else if (country_code === "SE") {
        total_current_listner_SE += current_listenrs;
      } else if (country_code === "MX") {
        total_current_listner_MX += current_listenrs;
      } else if (country_code === "BR") {
        total_current_listner_BR += current_listenrs;
      } else if (country_code === "TR") {
        total_current_listner_TR += current_listenrs;
      } else if (country_code === "PL") {
        total_current_listner_PL += current_listenrs;
      } else if (country_code === "ES") {
        total_current_listner_ES += current_listenrs;
      } else if (country_code === "CA") {
        total_current_listner_CA += current_listenrs;
      } else if (country_code === "IN") {
        total_current_listner_IN += current_listenrs;
      } else if (country_code === "PK") {
        total_current_listner_PK += current_listenrs;
      } else if (country_code === "CB") {
        total_current_listner_CB += current_listenrs;
      } else if (country_code === "NG") {
        total_current_listner_NG += current_listenrs;
      } else if (country_code === "FR") {
        total_current_listner_FR += current_listenrs;
      } else if (country_code === "CN") {
        total_current_listner_CN += current_listenrs;
      }

      const payload = [
        {
          country_code: "US",
          listners: total_current_listner_US,
        },
        {
          country_code: "UK",
          listners: total_current_listner_GB,
        },
        {
          country_code: "CA",
          listners: total_current_listner_CA,
        },
        {
          country_code: "AU",
          listners: total_current_listner_AU,
        },
        {
          country_code: "PK",
          listners: total_current_listner_PK,
        },
        {
          country_code: "IN",
          listners: total_current_listner_IN,
        },
        {
          country_code: "NG",
          listners: total_current_listner_NG,
        },
        {
          country_code: "CB",
          listners: total_current_listner_CB,
        },
        {
          country_code: "FR",
          listners: total_current_listner_FR,
        },
        {
          country_code: "CN",
          listners: total_current_listner_CN,
        },
        {
          country_code: "ES",
          listners: total_current_listner_ES,
        },
        {
          country_code: "DE",
          listners: total_current_listner_DE,
        },
      ];

      setData(payload);
    }
  }

  useEffect(() => {
    if (artist) {
      drawChart();
    }
  }, [artist]); // eslint-disable-next-line

  return (
    <>
      <Box
        component="div"
        variant="div"
        className={classess.page__banner}
        mt={2}
        p={3}
      >
        {data &&
          data.length &&
          data
            .sort((a, b) => b.listners - a.listners)
            .slice(0, 10)
            .map((el) => (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <div style={{ display: "flex", alignContent: "center" }}>
                  <img
                    src={`/flag/${el.country_code}.png`}
                    width={50}
                    height={50}
                  />
                  <p style={{ color: "#FFF", marginLeft: "10px" }}>
                    {el?.country_code}
                  </p>
                </div>
                <p style={{ color: "#FFF", marginLeft: "10px" }}>
                  {el?.listners}
                </p>
              </div>
            ))}
      </Box>
    </>
  );
};
export default Graph;
