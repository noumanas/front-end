import React, { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { addArtist } from "../../../redux/slice/artist";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { searchArtist } from "../../../api/spotify.api";
import SearchAutcomplete from "../../../components/search-autcomplete/search-autcomplete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { config as URLconfig } from "../../../enviorment/enviorment";
import { scrollTopObserver } from "../../../utils/helper";
import PhoneInput from "react-phone-number-input";
import SpotifySvg from "../../../assets/spotify.svg";
import axiosRetry from "axios-retry";

const AddArtist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [genres, setgenres] = useState([]);
  const [telephone, setTelephone] = useState("");
  const [country, setCountry] = useState("");
  const [spotify_id, setSpotify_id] = useState("");
  const [search, setSearch] = useState("");
  const [searchedArtistList, setSearchedArtistList] = useState([]);
  const [spotifyDisabled, setSpotifyDisabled] = useState(false);
  const [manual, setManual] = useState(true);
  const allCountries = useSelector((state) => state.country.countries);

  // const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  //OnSubmit btn..
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSpotifyDisabled(false);

    const payload = {
      artist: {
        name,
        email,
        telephone,
        country,
        spotify_id,
        avatar: image,
        genres,
      },
    };
    let response = dispatch(
      addArtist({
        data: payload,
      })
    );

    response
      .then(async (res) => {
        if (res.payload.message === "artist created") {
          toast.message("New Artist Adding");
        }
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        navigate("/blig/my-artist");
      });
  };

  const emptyFields = () => {
    setName("");
    setEmail("");
    setTelephone("");
    setCountry("");
    setSpotify_id("");
    setSearch("");
    setImage("");
    setSearchedArtistList("");
  };

  const mapSearchArtist = (item) => {
    let obj = {};

    obj.id = item?.id;
    obj.name = item?.name;
    obj.genres = item?.genres;

    if (item?.images && item?.images.length) {
      obj.image = item?.images[0].url;
    } else {
      obj.image = "";
    }

    return obj;
  };

  const handleSearch = (event) => {
    const toSearch = event.target.value;
    setSearch(toSearch);
    setSpotifyDisabled(true);
    if (toSearch.length >= 3) {
      searchArtist(toSearch)
        .then((res) => {
          const artist = res.artists.items;
          setSearchedArtistList([...artist.map(mapSearchArtist)]);
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    } else {
      setSearchedArtistList([]);
    }
  };

  const handleSearchItem = (artist) => {
    setSearch("");
    emptyFields();
    setSearchedArtistList([]);
    setImage(artist.image);
    setName(artist.name);
    setSpotify_id(artist.id);
    setgenres(artist.genres);
    setManual(false);
  };

  return (
    <Container maxWidth="xl">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <Box component="span">
          <center>
            <CircularProgress color="inherit" />
          </center>
        </Box>
      </Backdrop>

      <Box varient="div" component="div" className={classess.page}>
        <Box varient="div" component="div" className={classess.page__title_bar}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            className={classess.page__title_bar__title}
          >
            Add New Artist
          </Typography>
        </Box>

        <Box
          varient="div"
          component="div"
          sx={{ p: { xs: 2, sm: 3, lg: 5 }, mt: 3 }}
          className={classess.page__fieldsContainer}
        >
          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "column", lg: "row" },
              gap: { xs: 2, sm: 2, lg: 15 },
              alignItems: { xs: "center", sm: "center", lg: "flex-start" },
              marginBottom: 5,
            }}
          >
            <SearchAutcomplete
              onInput={handleSearch}
              search={search}
              list={searchedArtistList}
              handleSearchItem={handleSearchItem}
            />
            {!manual && (
              <Box variant="div" component="div">
                <Avatar
                  sx={{ height: "120px", width: "120px" }}
                  src={image}
                  alt={name}
                />
              </Box>
            )}
          </Stack>

          {!manual && (
            <form
              action=""
              className={classess.page__fieldsContainer__form}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Stack
                direction="row"
                sx={{
                  gap: { xs: 3, sm: 8, lg: 15 },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Artist Name *
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    autoComplete="off"
                    value={name}
                    maxLength={100}
                    onInput={(event) => setName(event.target.value)}
                    placeholder="Enter Artist Name"
                    type="text"
                    required
                  />
                </Box>
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Phone
                  </label>
                  <PhoneInput
                    international
                    className={
                      classess.page__fieldsContainer__form__formfield__phoneinput
                    }
                    defaultCountry="US"
                    placeholder="Enter phone number"
                    value={telephone}
                    name="telephone"
                    onChange={setTelephone}
                    autoComplete="off"
                    required
                  />
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  gap: { xs: 3, sm: 8, lg: 15 },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    E-mail Address
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    maxLength={80}
                    value={email}
                    onInput={(event) => setEmail(event.target.value)}
                    placeholder="Enter Email Address"
                    type="email"
                  />
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  gap: { xs: 3, sm: 8, lg: 15 },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    <img
                      className={
                        classess.page__fieldsContainer__form__formfield__label__image
                      }
                      src={SpotifySvg}
                      alt="spotify"
                    />
                    <>Spotify ID *</>
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    disabled={spotifyDisabled}
                    value={spotify_id}
                    onInput={(event) => setSpotify_id(event.target.value)}
                    placeholder="Enter Spotify Id"
                    required
                  />
                </Box>
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Country *
                  </label>
                  <select
                    value={country}
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    onChange={(event) => setCountry(event.target.value)}
                    required
                  >
                    {allCountries && allCountries.length ? (
                      <>
                        <option value="">Select Country</option>
                        {allCountries.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option value="">Select Country</option>
                    )}
                  </select>
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  gap: { xs: 3, sm: 8, lg: 15 },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                  alignItems: "flex-end",
                }}
              >
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <Stack direction="row" gap={5}>
                    <Button
                      type="button"
                      variant="contained"
                      className={
                        classess.page__fieldsContainer__form__cancel_btn
                      }
                      onClick={() => {
                        navigate("/blig/home");
                        scrollTopObserver();
                      }}
                    >
                      Cancel
                    </Button>
                    <LoadingButton
                      type="submit"
                      loading={isLoading}
                      className={
                        classess.page__fieldsContainer__form__submit_btn
                      }
                      variant="contained"
                    >
                      Submit
                    </LoadingButton>
                  </Stack>
                </Box>
              </Stack>
            </form>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AddArtist;
