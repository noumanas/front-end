import React, { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import { CustomSliderWithStyles } from "../../../../custom-mui-style/custom-mui-styles";
import { setIsLoading } from "../../../../redux/slice/artist";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";

const CustomizedConfig = ({
  set_contract_length,
  set_catelog_income,
  included_music,
  contract_length,
  catelog_income,
  new_music_income,
  funding_metadata,
  set_funding_metadata,
  updateArtistFunding,
  calcalute_tracks_estimate,
  new_music_estimiate,
}) => {
  const [multiple, setMultiple] = useState(30);
  const [licenceType, setLicenceType] = useState("license");
  const dispatch = useDispatch();
  const tracks = useSelector((state) => state.artist.tracks);
  const selected = useSelector((state) => state.artist.selectedTracks);
  const newMusicTracks = useSelector((state) => state.artist.newMusicTracks);
  const authUser = useSelector((state) => state.auth.user);
  const [change_new_music_estimiate,set_change_new_music_estimiate] =useState()
  const [marketing_budget,set_marketing_budget] =useState()

  const [artist_advance,set_artist_advance] =useState()

  function getSingleTrack(id) {
    return tracks.filter((track) => track.id === id)[0];
  }

  const handleRadioChange = (event) => {
    setLicenceType(event.target.value);
  };
  const new_music_estimiate_given_market_budget = (value) => {
    const artist_advance_payment = (new_music_estimiate*value/100);
    set_artist_advance(artist_advance_payment);
  };
  const calculate_marketing_budget = (value) => {
    const cal_marketing_budget = (new_music_estimiate*value/100);
    set_marketing_budget(cal_marketing_budget);
  };

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box
        varient="div"
        component="div"
        className={classess.page__slider_container}
        mt={4}
      >
        <Box
          varient="div"
          component="div"
          className={classess.page__slider_container__slider_box}
        >
          <span className={classess.page__slider_container__slider_box__title}>
            License Type
          </span>
          <Stack direction="row" gap={3}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={licenceType}
                defaultValue={licenceType}
                name="radio-buttons-group"
                onChange={handleRadioChange}
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <FormControlLabel
                  value="license"
                  control={
                    <Radio
                      sx={{
                        color: grey[400],
                        "&.Mui-checked": { color: "#00cd98" },
                      }}
                    />
                  }
                  onChange={(e) => setLicenceType(e.target.value)}
                  label="License"
                />
                <FormControlLabel
                  value="buyout"
                  control={
                    <Radio
                      sx={{
                        color: grey[400],
                        "&.Mui-checked": { color: "#00cd98" },
                      }}
                    />
                  }
                  label="Buyout"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Box>
      </Box>

      {licenceType === "license" && (
        <>
          <Box
            varient="div"
            component="div"
            className={classess.page__slider_container}
            mt={2}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__slider_container__slider_box}
            >
              <span
                className={classess.page__slider_container__slider_box__title}
              >
                Length of Contract
              </span>
              <Box
                varient="div"
                component="div"
                className={classess.page__slider_container__slider_box__slider}
              >
                <CustomSliderWithStyles
                  defaultValue={3}
                  value={contract_length}
                  min={1}
                  max={12}
                  step={1}
                  marks
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  name="contract_length"
                  onChange={(e) => {
                    set_contract_length(e.target.value);
                  }}
                  onChangeCommitted={async (e, v) => {
                    setMultiple(v);

                    dispatch(setIsLoading(true));

                    let selected_tracks =
                      selected.length > 0
                        ? selected.map((e) => getSingleTrack(e))
                        : tracks;

                    const new_music = newMusicTracks.map((e) =>
                      getSingleTrack(e)
                    );

                    let val = {
                      included_music,
                      contract_length: v,
                      catelog_income,
                      new_music_income,
                      selected_tracks,
                      new_music_tracks: new_music,
                    };

                    calcalute_tracks_estimate(val);
                  }}
                />
                <span
                  component="div"
                  className={
                    classess.page__slider_container__slider_box__slider__text
                  }
                >
                  {contract_length} Years
                </span>
              </Box>
            </Box>
          </Box>

          <Box
            varient="div"
            component="div"
            className={classess.page__slider_container}
            mt={2}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__slider_container__slider_box}
            >
              <span
                className={classess.page__slider_container__slider_box__title}
              >
                RECOUPMENT RATE
              </span>
              <Box
                varient="div"
                component="div"
                className={classess.page__slider_container__slider_box__slider}
              >
                <CustomSliderWithStyles
                  defaultValue={10}
                  value={catelog_income}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={(e) => {
                    set_catelog_income(e.target.value);
                  }}
                  onChangeCommitted={async (e, v) => {
                    set_catelog_income(v);

                    dispatch(setIsLoading(true));

                    let selected_tracks =
                      selected.length > 0
                        ? selected.map((e) => getSingleTrack(e))
                        : tracks;

                    const new_music = newMusicTracks.map((e) =>
                      getSingleTrack(e)
                    );

                    let val = {
                      included_music,
                      contract_length,
                      catelog_income: v,
                      new_music_income,
                      selected_tracks,
                      new_music_tracks: new_music,
                    };

                    calcalute_tracks_estimate(val);
                  }}
                />
                <span
                  component="div"
                  className={
                    classess.page__slider_container__slider_box__slider__text
                  }
                >
                  {catelog_income} %
                </span>
              </Box>
            </Box>
          </Box>
{/* 
          <Box
            varient="div"
            component="div"
            className={classess.page__slider_container}
            mt={2}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__slider_container__slider_box}
            >
              <span
                className={classess.page__slider_container__slider_box__title}
              >
               Artist's Advance
              </span>
              <Box
                varient="div"
                component="div"
                className={classess.page__slider_container__slider_box__slider}
              >
                <CustomSliderWithStyles
                  defaultValue={100}
                  value={change_new_music_estimiate}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={(e) => {
                    set_change_new_music_estimiate(e.target.value);
                    new_music_estimiate_given_market_budget(e.target.value);
                  }}
                  
                />
                <span
                  component="div"
                  className={
                    classess.page__slider_container__slider_box__slider__text
                  }
                >
                   $ {artist_advance > 0 ? artist_advance : new_music_estimiate}
                </span>

              </Box>
            </Box>
          </Box> */}
         {/* <Box
            varient="div"
            component="div"
            className={classess.page__slider_container}
            mt={2}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__slider_container__slider_box}
            >
              <span
                className={classess.page__slider_container__slider_box__title}
              >
               Marketing Budget
              </span>
              <Box
                varient="div"
                component="div"
                className={classess.page__slider_container__slider_box__slider}
              >
                <CustomSliderWithStyles
                  defaultValue={0}
                  value={marketing_budget}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={(e) => {
                    set_marketing_budget(e.target.value);
                    calculate_marketing_budget(e.target.value);
                  }}
                  
                />
                <span
                  component="div"
                  className={
                    classess.page__slider_container__slider_box__slider__text
                  }
                >
                   $ {marketing_budget > 0 ? marketing_budget : 0} 
                </span>

              </Box>
            </Box>
          </Box> */}
          {authUser.role === "admin" && (
            <Box varient="div" component="div" className={classess.page__field}>
              <span className={classess.page__field__title}>
                Blended DSP Rate
              </span>
              <input
                className={classess.page__field__input}
                defaultValue={funding_metadata?.dsp_rate}
                value={funding_metadata?.dsp_rate}
                min={0}
                max={0.005}
                maxLength={6}
                minLength={3}
                onChange={(e) => {
                  if (e.target.value <= 0.005) {
                    set_funding_metadata((prevState) => ({
                      ...prevState,
                      dsp_rate: e.target.value,
                    }));
                  } else {
                    toast.warning("DPS Rate invalid");
                  }
                }}
              />
            </Box>
          )}
          {authUser.role === "admin" && (
            <Box varient="div" component="div" className={classess.page__field}>
              <span className={classess.page__field__title}>
                Missing Report Compensation Rate
              </span>
              <input
                className={classess.page__field__input}
                defaultValue={funding_metadata?.missing_reports_compensation}
                value={funding_metadata?.missing_reports_compensation}
                max={3.5}
                maxLength={4}
                minLength={1}
                onChange={(e) => {
                  if (e.target.value <= 3.5) {
                    set_funding_metadata((prevState) => ({
                      ...prevState,
                      missing_reports_compensation: e.target.value,
                    }));
                  } else {
                    toast.warning("Missing Reports Compensation value invalid");
                  }
                }}
              />
            </Box>
          )}
          {authUser.role === "admin" && (
            <button
              onClick={() => updateArtistFunding()}
              className={classess.page__button}
            >
              Save
            </button>
          )}
        </>
      )}

      {licenceType === "buyout" && (
        <Box
          varient="div"
          component="div"
          className={classess.page__slider_container}
          mt={2}
        >
          <Box
            varient="div"
            component="div"
            className={classess.page__slider_container__slider_box}
          >
            <span
              className={classess.page__slider_container__slider_box__title}
            >
              Multiple
            </span>
            <Box
              varient="div"
              component="div"
              className={classess.page__slider_container__slider_box__slider}
            >
              <CustomSliderWithStyles
                defaultValue={30}
                min={1}
                max={30}
                value={multiple}
                aria-label="Default"
                valueLabelDisplay="auto"
                onChange={(e) => setMultiple(e.target.value)}
                onChangeCommitted={async (e, v) => {
                  setMultiple(v);

                  dispatch(setIsLoading(true));

                  let selected_tracks =
                    selected.length > 0
                      ? selected.map((e) => getSingleTrack(e))
                      : tracks;

                  // await Promise.all(
                  //   selected.map((y) => {
                  //     tracks
                  //       .filter((track) => track.id === y)
                  //       .map((e) => {
                  //         selected_tracks.push(e);
                  //       });
                  //   })
                  // );

                  const new_music = newMusicTracks.map((e) =>
                    getSingleTrack(e)
                  );

                  let val = {
                    included_music,
                    contract_length: 1,
                    catelog_income,
                    new_music_income: 100,
                    selected_tracks,
                    multiple: v,
                    new_music_tracks: new_music,
                  };
                  set_contract_length(1);
                  calcalute_tracks_estimate(val);
                }}
              />
              <span
                component="div"
                className={
                  classess.page__slider_container__slider_box__slider__text
                }
              >
                {multiple}x
              </span>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CustomizedConfig;
