import React, { useState, useEffect } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CustomSliderWithStyles } from "../../custom-mui-style/custom-mui-styles";
import FormControl from "@mui/material/FormControl";
import { grey } from "@mui/material/colors";
import { getFullYearWithRange, monthsOptions } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNewMusic,
  getNewMusicByID,
  postNewMusic,
  updateNewMusic,
} from "../../redux/slice/new-music";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteNewMusicRecordDialog from "../../dialogs/delete-new-music-record-dialog/delete-new-music-record-dialog";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

const NewMusic = ({
  newMusicIncomeArtistKeeps,
  new_music_income,
  artist_id,
  getArtistFunding,
  set_new_music_income,
}) => {
  const dispatch = useDispatch();
  const newMusicData = useSelector((state) => state.new_music.newMusic);
  const [includeMusicActive, setIncludeMusicActive] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState();
  const [radioValue, setRadioValue] = useState("single");
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState();
  const [delete_new_music_records, setdelete_new_music_records] = useState();
  const [open, setOpen] = useState(false);

  const initUIData = () => {
    dispatch(
      getNewMusicByID({
        id: artist_id,
      })
    );
  };

  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (isEdit) {
      updateNewMusicRelease();
    } else {
      postNewMusicRelease();
    }

    getArtistFunding();
  };

  const postNewMusicRelease = () => {
    const current_date = new Date();
    const selected_date = new Date();
    selected_date.setMonth(parseInt(month));
    selected_date.setFullYear(parseInt(year));

    if (selected_date <= current_date) {
      toast.error("You cannot select past date.");
      setIsLoading(false);
    } else {
      const payload = {
        year,
        month: monthsOptions[parseInt(month)].value,
        music: radioValue,
        artist_id,
      };
      const request = dispatch(
        postNewMusic({
          data: payload,
        })
      );

      request
        .then(() => {
          setIsLoading(false);
          initUIData();
          emptyFields();
          setIncludeMusicActive(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
          emptyFields();
          setIncludeMusicActive(false);
        });
    }
  };

  const updateNewMusicRelease = () => {
    const current_date = new Date();
    const selected_date = new Date();
    selected_date.setMonth(parseInt(month));
    selected_date.setFullYear(parseInt(year));

    if (selected_date <= current_date) {
      toast.error("You cannot select past date.");
      setIsLoading(false);
    } else {
      const payload = {
        year,
        month: monthsOptions[month].value,
        music: radioValue,
        artist_id: editRecord?.artist_id,
      };
      const request = dispatch(
        updateNewMusic({
          data: payload,
          id: editRecord?._id,
        })
      );

      request
        .then(() => {
          setIsLoading(false);
          initUIData();
          emptyFields();
          setIsEdit(false);
          setIncludeMusicActive(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
          emptyFields();
          setIsEdit(false);
          setIncludeMusicActive(false);
        });
    }
  };
  const handleOpenDeleteDialog = (new_misic) => {
    setdelete_new_music_records(new_misic);
    setOpen(true);
  };
  const handleCloseDeleteDialog = (res) => {
    setOpen(false);
    if (res) {
      deleteNewMusicRelease(delete_new_music_records);
    }
  };
  const deleteNewMusicRelease = (id) => {
    const request = dispatch(
      deleteNewMusic({
        id: id,
      })
    );
    request
      .then(() => {
        initUIData();
        getArtistFunding();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (record) => {
    setIsEdit(true);
    setEditRecord(record);
    setYear(record?.year);
    let index = monthsOptions.findIndex((e) => e.value === record?.month);
    setMonth(index);
    setRadioValue(record?.music);
    setIncludeMusicActive(true);
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const cancelForm = () => {
    emptyFields();
    setIncludeMusicActive(false);
  };

  const emptyFields = () => {
    setMonth("");
    setYear(undefined);
    setRadioValue("single");
  };

  useEffect(() => {
    initUIData();
  }, []);

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__new_music}>
        <Typography varient="overline" component="p" sx={{ fontSize: "12px" }}>
          <b>Note:</b> new music projects are based on historical tracks public
          training data; it is important to select tracks that would fairly
          represent the upcoming music. Please select new music tracks that best
          represent your next release(S)
        </Typography>
        {/* {newMusicData && newMusicData.length ? (
              <Box
                varient="div"
                component="div"
                className={
                  classess.page__music_container__button_container__slider_box
                }
                mt={3}
              >
                <span
                  className={classess.page__slider_container__slider_box__title}
                >
                  New Music Income Artist Keeps
                </span>
                <Box
                  varient="div"
                  component="div"
                  className={
                    classess.page__music_container__button_container__slider_box__slider
                  }
                >
                  <CustomSliderWithStyles
                    defaultValue={80}
                    value={new_music_income}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    name="new_music_income"
                    onChange={(e) => set_new_music_income(e.target.value)}
                    onChangeCommitted={(e, v) =>
                      newMusicIncomeArtistKeeps(e, v)
                    }
                  />
                  <span
                    component="div"
                    className={
                      classess.page__music_container__button_container__slider_box__slider__text
                    }
                  >
                    {new_music_income} %
                  </span>
                </Box>
              </Box>
            ) : null} */}
        {includeMusicActive && (
          <Box
            varient="div"
            component="div"
            className={classess.page__new_music__main}
          >
            <Stack direction="row" gap={3}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={radioValue}
                  defaultValue={radioValue}
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
                    value="single"
                    control={
                      <Radio
                        sx={{
                          color: grey[400],
                          "&.Mui-checked": { color: "#00cd98" },
                        }}
                      />
                    }
                    label="Single"
                  />
                  <FormControlLabel
                    value="ep"
                    control={
                      <Radio
                        sx={{
                          color: grey[400],
                          "&.Mui-checked": { color: "#00cd98" },
                        }}
                      />
                    }
                    label="EP"
                  />
                  <FormControlLabel
                    value="album"
                    control={
                      <Radio
                        sx={{
                          color: grey[400],
                          "&.Mui-checked": { color: "#00cd98" },
                        }}
                      />
                    }
                    label="Album"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <form
              autoComplete="off"
              className={classess.page__new_music__main__form}
              onSubmit={onSubmit}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__new_music__main__form__form_fields}
              >
                <select
                  type="text"
                  name="month"
                  placeholder="Month"
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                  }}
                  className={
                    classess.page__new_music__main__form__form_fields__select
                  }
                  required
                >
                  <option value="">Select Month</option>
                  {monthsOptions.map((month, index) => (
                    <option value={index}>{month.key}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min={getFullYearWithRange(0)}
                  maxLength={4}
                  minLength={4}
                  max={2033}
                  name="year"
                  placeholder="Year"
                  value={year}
                  onInput={(event) => setYear(event.target.value)}
                  className={
                    classess.page__new_music__main__form__form_fields__input
                  }
                  requried
                />
              </Box>
              <Box
                varient="div"
                component="div"
                className={classess.page__new_music__main__form__form_fields}
              >
                <Button
                  type="submit"
                  variant="contained"
                  className={classess.page__new_music__main__form__button}
                  disabled={isLoading}
                >
                  {isLoading && <CircularProgress size={25} color="inherit" />}
                  Confirm Addition
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  className={classess.page__new_music__main__form__button}
                  disabled={isLoading}
                  onClick={cancelForm}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Box>
      <Box
        varient="div"
        component="div"
        className={classess.page__music_container}
      >
        {!includeMusicActive && (
          <Box
            varient="div"
            component="div"
            className={classess.page__music_container__button_container}
          >
            <Button
              type="button"
              variant="contained"
              onClick={() => setIncludeMusicActive(true)}
              className={
                classess.page__music_container__button_container__button
              }
            >
              Add Another Release
            </Button>
            {newMusicData && newMusicData.length ? (
              <Box
                varient="div"
                component="div"
                className={
                  classess.page__music_container__button_container__slider_box
                }
              >
                <span
                  className={classess.page__slider_container__slider_box__title}
                >
                  RECOUPMENT RATE
                </span>
                <Box
                  varient="div"
                  component="div"
                  className={
                    classess.page__music_container__button_container__slider_box__slider
                  }
                >
                  <CustomSliderWithStyles
                    defaultValue={80}
                    value={new_music_income}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    name="new_music_income"
                    onChange={(e) => set_new_music_income(e.target.value)}
                    onChangeCommitted={(e, v) =>
                      newMusicIncomeArtistKeeps(e, v)
                    }
                  />
                  <span
                    component="div"
                    className={
                      classess.page__music_container__button_container__slider_box__slider__text
                    }
                  >
                    {new_music_income} %
                  </span>
                </Box>
              </Box>
            ) : null}
          </Box>
        )}
      </Box>
      {!includeMusicActive && (
        <Box
          varient="div"
          component="div"
          className={classess.page__music_details}
        >
          {newMusicData && newMusicData.length ? (
            <Box
              varient="div"
              component="div"
              className={classess.page__music_details__main_container}
            >
              {newMusicData.map((music) => (
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__music_details__main_container__box}
                >
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__music_details__main_container__box__details
                    }
                  >
                    <span
                      className={
                        classess.page__music_details__main_container__box__details__text
                      }
                    >
                      {music?.year}
                    </span>
                    <span
                      className={
                        classess.page__music_details__main_container__box__details__text
                      }
                    >
                      {music?.music}
                    </span>
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__music_details__main_container__box__actions
                    }
                  >
                    <IconButton
                      aria-label="fingerprint"
                      color="primary"
                      style={{ backgroundColor: "#ffffff20" }}
                      onClick={() => handleEdit(music)}
                    >
                      <EditIcon style={{ color: "#2F3443" }} />
                    </IconButton>
                    <IconButton
                      aria-label="fingerprint"
                      color="error"
                      style={{ backgroundColor: "#F6400020" }}
                      onClick={() => handleOpenDeleteDialog(music?._id)}
                    >
                      <CloseIcon style={{ color: "#F64000" }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>
      )}
      <DeleteNewMusicRecordDialog
        onClose={handleCloseDeleteDialog}
        open={open}
        track={delete_new_music_records}
      />
    </Box>
  );
};

export default NewMusic;
