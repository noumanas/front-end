import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setReload,
  setSearchResultTracks,
  setSelectedTrackCount,
  setSelectedTracks,
  setShowSelectedTracksFunding,
  setTotalTracks,
  setTracks,
} from "../../redux/slice/artist";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Clear";
import axios from "axios";
import Slider from "../view-funding-dashboard-items/verify/slider/slider";
import Grid from "@mui/material/Grid";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import TablePagination from "@mui/material/TablePagination";
import DeleteTrackDialog from "../../dialogs/delete-track-dialog/delete-track-dialog";
import PlaceHolderImage from "../../placeholder.png";
import { abbreviateNumber } from "../../utils/helper";
import { muiTableCellUseStyles } from "../../custom-mui-style/custom-mui-styles";
import { config as URLconfig } from "../../enviorment/enviorment";
import { IconButton } from "@mui/material";
import { openModal } from "../../redux/slice/modal";
import { toast } from "react-toastify";
import { getItemToLocalStorage } from "../../services/storage";
export default function BasicTable({
  included_music,
  contract_length,
  catelog_income,
  new_music_income,
  calcalute_tracks_estimate,
  searchTracks,
}) {
  const cellUseStyles = muiTableCellUseStyles();
  const dispatch = useDispatch();
  const dispatchref = useRef(dispatch);
  const artist = useSelector((state) => state.artist.artist);
  const tracks = useSelector((state) => state.artist.tracks);
  const selected = useSelector((state) => state.artist.selectedTracks);
  const newMusicTracks = useSelector((state) => state.artist.newMusicTracks);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const showSelectedTracksFunding = useSelector(
    (state) => state.artist.showSelectedTracksFunding
  );
  const [open, setOpen] = useState(false);
  const [selectedTrackToDelete, setSelectedTrackToDelete] = useState({});
  const reload = useSelector((state) => state.artist.reload);

  useEffect(() => {
    dispatchref.current(setSelectedTrackCount(selected.length));
    dispatchref.current(setSelectedTracks(selected));
    getArtistFunding();
  }, [selected, dispatchref]);

  useEffect(() => {
    if (tracks.length && reload) {
      getArtistFunding();
      dispatchref.current(setReload(false));
    }
  }, [tracks, reload, dispatchref]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isSelected = (id) => selected.includes(id);

  const handleSelectAllClick = (event) => {
    dispatch(setIsLoading(true));

    if (event.target.checked) {
      const newSelected = tracks.map((n) => n.id);
      dispatch(setSelectedTracks(newSelected));
      getArtistFunding();
      return;
    }

    dispatch(setSelectedTracks([]));
  };

  const handleSingleSelect = (id) => {
    dispatch(setIsLoading(true));

    if (isSelected(id)) {
      console.log("unselected: ", id);
      dispatch(setSelectedTracks(selected.filter((ids) => ids !== id)));
    } else {
      console.log("selected: ", id);
      dispatch(setSelectedTracks([...selected, id]));
    }
  };

  const onChangeHandler = async (track_id, stream_income_share) => {
    let update_tracks = tracks.map((elem) => {
      if (elem.id === track_id) {
        return {
          ...elem,
          stream_income_share,
        };
      }
      return elem;
    });
    dispatch(setTracks(update_tracks));

    let update_search_tracks = searchTracks.map((elem) => {
      if (elem.id === track_id) {
        return {
          ...elem,
          stream_income_share,
        };
      }
      return elem;
    });

    dispatch(setSearchResultTracks(update_search_tracks));

    dispatch(setReload(true));

    const payload = {
      stream_income_share,
    };

    let endpoint = `${URLconfig.BASE_URL}/artist-tracks/${track_id}/stream-income-share`;

    const token = getItemToLocalStorage("accessToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios.put(endpoint, payload, config).then(() => {
      console.log("success");
    });
  };

  function getSingleTrack(id) {
    return tracks.filter((track) => track.id === id)[0];
  }

  const getArtistFunding = async () => {
    const selected_tracks =
      selected.length > 0
        ? selected.map((e) => getSingleTrack(e))
        : showSelectedTracksFunding
        ? tracks
            .filter((track) => track.is_selected === 1)
            .map((checkedtracks) => checkedtracks)
        : tracks;

    const new_music = newMusicTracks.map((e) => getSingleTrack(e));

    dispatch(setShowSelectedTracksFunding(false));

    const val = {
      included_music,
      contract_length,
      catelog_income,
      new_music_income,
      selected_tracks: selected_tracks,
      new_music_tracks: new_music,
    };

    calcalute_tracks_estimate(val);
  };

  const handleOpenDeleteDialog = (track) => {
    setSelectedTrackToDelete(track);
    setOpen(true);
  };

  const handleCloseDeleteDialog = (res) => {
    setOpen(false);
    if (res) {
      deleteTrack(selectedTrackToDelete?.id);
    }
  };

  const deleteTrack = async (trackId) => {
    let filter_tracks = tracks.filter((el) => el.id !== trackId);
    dispatch(setTracks(filter_tracks));
    dispatch(setTotalTracks(filter_tracks.length));

    let filter_selected_tracks = selected.filter((ids) => ids !== trackId);
    dispatch(setSelectedTracks(filter_selected_tracks));
    dispatch(setSelectedTrackCount(filter_selected_tracks.length));
    dispatch(setReload(true));

    const token = getItemToLocalStorage("accessToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${URLconfig.BASE_URL}/artist-tracks/${trackId}`, config)
      .then(() => {
        toast.success("Track has been deleted");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        background: "#2F3443",
        boxShadow: "none",
      }}
    >
      {artist && Object.keys(artist).length ? (
        <TableContainer className={classess.table}>
          <Table stickyHeader={true} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" className={classess.table__col}>
                  <Checkbox
                    // disabled={isLoading}
                    sx={{ color: "#FFFFFF" }}
                    indeterminate={
                      selected.length > 0 && selected.length < tracks.length
                    }
                    checked={
                      tracks.length > 0 && selected.length === tracks.length
                    }
                    onClick={handleSelectAllClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell>
                <TableCell
                  className={classess.table__col}
                  sx={{ maxWidth: 50 }}
                >
                  #
                </TableCell>
                <TableCell className={classess.table__col}>
                  Top Tracks
                </TableCell>

                <TableCell className={classess.table__col}>
                  Growth Rate
                </TableCell>

                <TableCell className={classess.table__col}>
                  Share of Streaming Income
                </TableCell>

                <TableCell className={classess.table__col}>Genres</TableCell>
                <TableCell className={classess.table__col} style={{width: '10%'}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* search tracks for look via map */}
              {searchTracks.map((row, index) => {
                const isItemSelected = isSelected(row?.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <LazyLoadComponent>
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className={cellUseStyles.row}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          sx={{ color: "#FFFFFF" }}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onClick={() => handleSingleSelect(row.id)}
                        />
                      </TableCell>
                      <TableCell
                        className={classess.table__row}
                        sx={{ maxWidth: 50 }}
                      >
                        <LazyLoadImage
                          key={index}
                          src={row.image}
                          width={50}
                          height={50}
                          style={{ borderRadius: "100%"}}
                          placeholderSrc={PlaceHolderImage}
                        />
                      </TableCell>
                      <TableCell className={classess.table__row}>
                        {row.title}
                      </TableCell>
                      <TableCell className={classess.table__row}>
                        <div
                          style={{ display: "flex", cursor: "pointer" }}
                          onClick={() =>
                            dispatch(
                              openModal({
                                name: "track-chart",
                                data: row,
                              })
                            )
                          }
                        >
                          {row?.last_streams_growth && (
                            <span
                              className={
                                row?.last_streams_growth?.growth_rate > 0
                                  ? classess.table__row__green
                                  : classess.table__row__red
                              }
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignContent: "center",
                                  justifyItems: "center",
                                  fontSize: "12px",
                                }}
                              >
                                <span>
                                  {row?.last_streams_growth?.growth_rate > 0 ? (
                                    <TrendingUpIcon fontSize="12" />
                                  ) : (
                                    <TrendingDownIcon fontSize="12" />
                                  )}
                                </span>
                                <span style={{ marginLeft: "2px" }}>
                                  {row?.last_streams_growth?.growth_rate}%
                                </span>
                              </div>
                            </span>
                          )}
                          <span style={{ marginLeft: "5px" }}>
                            {abbreviateNumber(
                              row.last_streams_growth?.last_month
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className={classess.table__row}>
                        <Slider onChangeHandler={onChangeHandler} row={row} />
                      </TableCell>
                      <TableCell className={classess.table__row}>
                        {row.genres}
                      </TableCell>
                      <TableCell className={classess.table__row}>
                        <Grid
                          container
                          rowSpacing={3}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          <Grid item xs={6}>
                            <IconButton
                              onClick={() =>
                                dispatch(
                                  openModal({
                                    name: "edit-track",
                                    data: row,
                                  })
                                )
                              }
                              
                              sx={{ backgroundColor: "#ffffff20" }}
                            >
                              <EditIcon style={{ color: "#2F3443" }} />
                            </IconButton>
                          </Grid>
                          <Grid item xs={6}>
                            <IconButton 
                              onClick={() => handleOpenDeleteDialog(row)}
                              sx={{ backgroundColor: "#F6400020" }}
                            >
                              <DeleteIcon sx={{ color: "#F64000" }} />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </LazyLoadComponent>
                );
              })}

              {/* if artist tracks 0 in the search, then loop the all tracks */}
              {searchTracks.length < 1 &&
                tracks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row?.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <LazyLoadComponent>
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className={cellUseStyles.row}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              sx={{ color: "#FFFFFF" }}
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={() => handleSingleSelect(row.id)}
                            />
                          </TableCell>
                          <TableCell
                            className={classess.table__row}
                            sx={{ maxWidth: 50 }}
                          >
                            <LazyLoadImage
                              src={row.image}
                              width={50}
                              height={50}
                              style={{ borderRadius: "100%" }}
                              placeholderSrc={PlaceHolderImage}
                            />
                          </TableCell>
                          <TableCell className={classess.table__row}>
                            {row.title}
                          </TableCell>
                          <TableCell className={classess.table__row}>
                            <div
                              style={{ display: "flex", cursor: "pointer" }}
                              onClick={() =>
                                dispatch(
                                  openModal({
                                    name: "track-chart",
                                    data: row,
                                  })
                                )
                              }
                            >
                              {row?.last_streams_growth && (
                                <span
                                  className={
                                    row?.last_streams_growth?.growth_rate > 0
                                      ? classess.table__row__green
                                      : classess.table__row__red
                                  }
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignContent: "center",
                                      justifyItems: "center",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <span>
                                      {row?.last_streams_growth?.growth_rate >
                                      0 ? (
                                        <TrendingUpIcon fontSize="12" />
                                      ) : (
                                        <TrendingDownIcon fontSize="12" />
                                      )}
                                    </span>
                                    <span style={{ marginLeft: "2px" }}>
                                      {row?.last_streams_growth?.growth_rate}%
                                    </span>
                                  </div>
                                </span>
                              )}
                              <span style={{ marginLeft: "5px" }}>
                                {abbreviateNumber(
                                  row.last_streams_growth?.last_month
                                )}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className={classess.table__row}>
                            <Slider
                              onChangeHandler={onChangeHandler}
                              row={row}
                            />
                          </TableCell>
                          <TableCell className={classess.table__row}>
                            {row.genres}
                          </TableCell>
                          <TableCell className={classess.table__row}>
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                              <Grid item xs={6}>
                                <IconButton
                                  onClick={() =>
                                    dispatch(
                                      openModal({
                                        name: "edit-track",
                                        data: row,
                                      })
                                    )
                                  }
                                  className={classess.table__row__editbutton}
                                  style={{ backgroundColor: "#ffffff20" }}
                                >
                                  <EditIcon style={{ color: "#2F3443" }} />
                                </IconButton>
                              </Grid>
                              <Grid item xs={6}>
                                <IconButton
                                  onClick={() => handleOpenDeleteDialog(row)}
                                  style={{ backgroundColor: "#F6400020" }}
                                >
                                  <DeleteIcon style={{ color: "#F64000" }} />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      </LazyLoadComponent>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ color: "#d6d6d6" }}
          >
            Waiting for the Response...
          </Typography>
        </Box>
      )}

      {/* Show only, all tracks */}
      {searchTracks.length < 1 ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          sx={{ color: "#d6d6d6" }}
          count={tracks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}

      <DeleteTrackDialog
        onClose={handleCloseDeleteDialog}
        open={open}
        track={selectedTrackToDelete}
      />
    </Paper>
  );
}
