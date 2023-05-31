import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Circle from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { config as URLconfig } from "../../enviorment/enviorment";
import { useNavigate } from "react-router-dom";
import AuthEnum from "../../enums/auth.enum";
import { getItemToLocalStorage } from "../../services/storage";

const ArtistContractList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    axios({
      url: `${URLconfig.BASE_URL}/contracts`,
      method: "GET",
      headers: {
        authorization: `Bearer ${getItemToLocalStorage(AuthEnum.TOKEN)}`,
      },
    })
      .then((response) => {
        if (isSubscribed) {
          setList(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box component="div" varient="div" className={classess.page__list}>
        <TableContainer className={classess.table}>
          <Table stickyHeader={true} aria-label="sticky table">
            <TableHead className={classess.table__head}>
              <TableRow>
                <TableCell className={classess.table__col}>
                  Artist Name
                </TableCell>
                <TableCell className={classess.table__col}>
                  Created On
                </TableCell>
                <TableCell className={classess.table__col}>Status</TableCell>
                <TableCell className={classess.table__col}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classess.table__brow}>
              {list.map((row, index) => (
                <TableRow>
                  <TableCell
                    className={classess.table__row}
                    sx={{ maxWidth: 50 }}
                  >
                    <span className={classess.table__row__artistname}>
                      <a className={classess.table__row__href} href={'/blig/view-artist/'+row?.artist_id} target="_blank" rel="noopener noreferrer">{row?.artist_name}</a>
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__row}>
                    <span className={classess.table__row__Date}>
                      {new Date(row?.createdAt).toLocaleDateString({
                        weekday: "short",
                        year: "numeric",
                        month: "2-digit",
                        day: "numeric",
                      })}
                    </span>
                  </TableCell>
                  <TableCell
                    className={classess.table__row}
                    sx={{ maxWidth: 50 }}
                  >
                    <span className={classess.table__row__status}>
                      <Chip
                        variant="outlined"
                        icon={
                          <Circle
                            sx={{
                              fill:
                                row?.status === "PENDING" ||
                                row?.status === "Approved"
                                  ? "green"
                                  : "Orange",
                              fontSize: "14px",
                            }}
                          />
                        }
                        label={row?.status}
                        sx={{ color: "#fff", borderColor: "transparent" }}
                      />
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__row}>
                    <span className={classess.table__row__action}>
                      <Button
                        sx={{
                          color: "#fff",
                          borderColor: "#fff",
                          borderRadius: "8px",
                          textTransform: "capitalize",
                        }}
                        variant="outlined"
                        endIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/blig/contracts/${row._id}`)}
                      >
                        View
                      </Button>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ArtistContractList;
