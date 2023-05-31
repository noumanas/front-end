import React ,{useEffect,useState} from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../linear-progress-bar/linear-progress-bar";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Skeleton, Typography } from "@mui/material";

const ArtistTopTracks = ({
  tracks,
  loader,
  toptrackfunding,
  sortedTopTract,
  internationalNumberFormat,}) =>
 {


  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box component="div" varient="div" className={classess.page__list}>
        {sortedTopTract && sortedTopTract.length > 0 && (
          <TableContainer className={classess.table}>
            <Table stickyHeader={true} aria-label="sticky table">
              <TableHead className={classess.table__head}>
                <TableRow>
                  <TableCell className={classess.table__col}>#</TableCell>
                  <TableCell className={classess.table__col}>Title</TableCell>
                  <TableCell className={classess.table__col}>Type</TableCell>
                  <TableCell className={classess.table__col}>
                    Est{" "}
                    <span className={classess.table__col__lastdays}>
                      {" "}
                      Last 60 days
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    Share Of Streaming
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTopTract.map((track, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                        maxWidth: 50,
                      },
                    }}
                  >
                    <TableCell
                      className={classess.table__row}
                      sx={{ maxWidth: 50 }}
                    >
                      <Avatar
                        src={track?.image}
                        alt={track?.name}
                        sx={{
                          height: 50,
                          width: 50,
                          transform: "translateX(-12px)",
                        }}
                      />
                    </TableCell>
                    <TableCell className={classess.table__row}>
                      <span
                        className={classess.page__list__ul__li__name}
                        title={track?.name}
                      >
                        {track?.name}
                      </span>
                    </TableCell>
                    <TableCell
                      className={classess.table__row}
                      sx={{ maxWidth: 50 }}
                    >
                      <span
                        className={classess.page__list__ul__li__tracktype}
                        title={track?.track_type}
                      >
                        {track?.track_type}
                      </span>
                    </TableCell>
                    <TableCell
                      className={classess.table__row}
                      sx={{ maxWidth: 50 }}
                    >
                      <span className={classess.page__list__ul__li__tracktype}>
                        <span style={{ color: "green" }}>$</span>{" "}
                        {internationalNumberFormat.format(track?.funding)}
                      </span>
                    </TableCell>
                    <TableCell className={classess.table__row}>
                      <LinearProgressWithLabel
                        value={track?.stream_income_share}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {loader === false && sortedTopTract && sortedTopTract.length < 1 && (
          <Box component="div" varient="div">
            <p
              style={{
                color: "#ccc",
                fontSize: "12px",
                textAlign: "center",
                marginTop: 150,
              }}
            >
              There is no tracks
            </p>
          </Box>
        )}

        {loader && (
          <Box
            component="div"
            varient="div"
            className={classess.page__list__loader}
          >
            <CircularProgress size={40} color="secondary" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ArtistTopTracks;
