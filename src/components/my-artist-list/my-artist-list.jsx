import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArtist,
  emptySingularArtist,
  getArtist,
} from "../../redux/slice/artist";
import classess from "./style.module.scss";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { muiTableCellUseStyles } from "../../custom-mui-style/custom-mui-styles";
import { scrollTopObserver, tableSortingAlgo } from "../../utils/helper";
import DeleteConformationDialog from "../../dialogs/delete-conformation-dialog/delete-conformation-dialog";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";

const MyArtistList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchRef = useRef(dispatch);
  const artist = useSelector((state) => state.artist.artists);
  const artistApiStatus = useSelector((state) => state.artist.status);
  const [artistList, setArtistList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedArtistToDelete, setSelectedArtistToDelete] = useState({});
  const cellUseStyles = muiTableCellUseStyles();

  const initUIData = () => {
    dispatch(getArtist());
  };

  const deleteArtistByID = (id) => {
    dispatch(
      deleteArtist({
        id,
      })
    ).then(() => {
      initUIData();
    });
  };

  useEffect(() => {
    dispatchRef.current(getArtist());
  }, [dispatchRef]);

  useEffect(() => {
    setArtistList(artist);
  }, [artist]);

  const getEmail = (email, name) => {
    if (email) {
      return email;
    }
    const newName = name.replace(/\s+/, "");
    return `${newName}@spotify.com`;
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value && value.length >= 3) {
      const target = artist.filter((e) =>
        e.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      const newList = tableSortingAlgo(target, "name");
      setArtistList(newList);
    } else {
      setArtistList(artist);
    }
  };

  const handleOpenDeleteDialog = (artist) => {
    setSelectedArtistToDelete(artist);
    setOpen(true);
  };
  const handleCloseDeleteDialog = (res) => {
    setOpen(false);
    if (res) {
      deleteArtistByID(selectedArtistToDelete?._id);
    }
  };

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box
        varient="div"
        component="div"
        className={classess.page__statusBar}
        sx={{ position: "relative" }}
      >
        {/* <Typography
          variant="h5"
          gutterBottom
          component="div"
          className={classess.page__statusBar__title}
        >
          All Artist
        </Typography> */}
        <Box varient="div" component="div" sx={{ position: "relative" }}>
          <input
            className={classess.page__actionBar__search}
            placeholder="Search..."
            type="search"
            onInput={(e) => handleSearch(e)}
            required
          />
          <SearchIcon
            sx={{
              color: "white",
              position: "absolute",
              top: "8px",
              right: "-3px",
            }}
          />
        </Box>
        <Button
          variant="contained"
          className={classess.page__statusBar__action}
          onClick={() => {
            navigate("/blig/add-artist");
            scrollTopObserver();
          }}
        >
          + Add New
        </Button>
      </Box>

      {artistList && artistList.length ? (
        <>
          <Paper
            className="container"
            sx={{
              borderRadius: "20px",
              background: "transparent",
              overflow: "hidden",
            }}
          >
            <TableContainer>
              <Table
                className={classess.page__table}
                stickyHeader={true}
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    {/* <TableCell className={classess.page__table__head}>ID</TableCell> */}
                    <TableCell className={classess.page__table__head}>
                      Name
                    </TableCell>
                    <TableCell className={classess.page__table__head}>
                      Email
                    </TableCell>
                    {/* <TableCell className={classess.page__table__head}>Funding Estimate</TableCell> */}
                    <TableCell className={classess.page__table__head}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {artistList.map((row, index) => (
                    <TableRow
                      key={index}
                      className={cellUseStyles.row}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/* <TableCell className={classess.page__table__row} component="th" scope="row">
                        {row?._id}
                      </TableCell>                     */}
                      <TableCell className={classess.page__table__row}>
                        <div className={classess.page__table__row__placement}>
                          <Avatar
                            src={row?.avatar}
                            alt={row?.name}
                            className={
                              classess.page__table__row__placement__artist_image
                            }
                          />
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate(`/blig/view-artist/${row?._id}`);
                              scrollTopObserver();
                            }}
                          >
                            {row?.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className={classess.page__table__row}>
                        {getEmail(row?.email, row?.name)}
                      </TableCell>
                      {/* <TableCell className={classess.page__table__row}>${internationalNumberFormat.format(Math.round(row?.totalFunding))}</TableCell> */}
                      <TableCell className={classess.page__table__row}>
                        <Stack spacing={2} direction="row">
                          <IconButton
                            style={{ backgroundColor: "#ffffff20" }}
                            onClick={() => {
                              navigate(`/blig/view-artist/${row?._id}`);
                              scrollTopObserver();
                            }}
                          >
                            <VisibilityIcon
                              style={{ color: "#858997" }}
                              className={classess.page__table__row__icon}
                            />
                          </IconButton>
                          <IconButton
                            style={{ backgroundColor: "#ffffff20" }}
                            onClick={() => {
                              dispatch(emptySingularArtist());
                              navigate(`/blig/edit-artist/${row?._id}`);
                              scrollTopObserver();
                            }}
                          >
                            <EditIcon
                              style={{ color: "#2F3443" }}
                              className={classess.page__table__row__icon}
                            />
                          </IconButton>
                          <IconButton
                            style={{ backgroundColor: "#F6400020" }}
                            onClick={() => handleOpenDeleteDialog(row)}
                          >
                            <DeleteIcon
                              style={{ color: "#F64000" }}
                              className={classess.page__table__row__icon}
                            />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      ) : artistList &&
        artistList.length === 0 &&
        artistApiStatus === "loading" ? (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ color: "#d6d6d6" }}
          >
            <CircularProgress size={40} color="secondary" />
          </Typography>
        </Box>
      ) : artistList &&
        artistList.length === 0 &&
        artistApiStatus === "succeeded" ? (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ color: "#d6d6d6" }}
          >
            No Artist Found.
          </Typography>
        </Box>
      ) : artistList &&
        artistList.length === 0 &&
        artistApiStatus === "failed" ? (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ color: "#d6d6d6" }}
          >
            Error Cannot Load Artist.
          </Typography>
        </Box>
      ) : (
        <></>
      )}
      <DeleteConformationDialog
        onClose={handleCloseDeleteDialog}
        open={open}
        artist={selectedArtistToDelete}
      />
    </Box>
  );
};

export default MyArtistList;
