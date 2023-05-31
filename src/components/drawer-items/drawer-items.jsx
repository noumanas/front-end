import React from "react";
import classess from "./style.module.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { sideBarUseStyles } from "../../custom-mui-style/custom-mui-styles";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteIcon from "@mui/icons-material/Note";
import { scrollTopObserver } from "../../utils/helper";
import logo from "./../../assets/logo/logo-trans.png";
import Box from "@mui/material/Box";
import HeaderMenu from "../header-menu/header-menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const DrawerItems = ({ handleClose }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const handleNavigate = (route) => {
    navigation(route);
    handleClose();
    scrollTopObserver();
  };

  const config = {
    primaryMenu: [
      {
        name: "Dashboard",
        path: "/blig/home",
        icon: <HomeIcon sx={{ color: "white", fontSize: 24 }} />,
      },
      {
        name: "Artists",
        path: "/blig/my-artist",
        icon: <PersonIcon sx={{ color: "white", fontSize: 24 }} />,
      },
      ,
      {
        name: "Contracts",
        path: "/blig/contracts",
        icon: <ReceiptLongIcon sx={{ color: "white", fontSize: 24 }} />,
      },
      // {
      //   name: "Docu Sign",
      //   path: "/blig/docu-sign",
      //   icon: <NoteIcon sx={{ color: "white", fontSize: 24 }} />,
      // },
    ],
  };

  const styles = sideBarUseStyles();

  return (
    user && (
      <>
        <Box
          variant="div"
          component="div"
          className={styles.root}
          sx={{
            background: "#393E4F",
            padding: "25px 30px",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            borderBottom: "1px solid #5e5e5e",
          }}
        >
          <img src={logo} height="35" alt="logo" />
        </Box>

        <List className={classess.mainMenu}>
          {user.role !== "artist" && (
            <>
              {config.primaryMenu.map((menu, index) => (
                <ListItem key={menu.name} className={classess.mainMenu__list}>
                  <ListItemButton
                    className={classess.mainMenu__button}
                    onClick={() => {
                      handleNavigate(menu.path);
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        background:
                          location.pathname === menu.path && "#DE3870",
                        padding:
                          location.pathname === menu.path ? "10px" : "10px",
                        minWidth:
                          location.pathname === menu.path ? "50px" : "50px",
                        borderTopRightRadius:
                          location.pathname === menu.path && "20px",
                        borderBottomRightRadius:
                          location.pathname === menu.path && "20px",
                      }}
                    >
                      {menu.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={menu.name}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        marginLeft: "10px",
                        fontWeight: "400",
                        fontFamily: "DM Sans",
                      }}
                      sx={{
                        color: location.pathname === menu.path && "#DE3870",
                      }}
                    />
                    <ChevronRightIcon
                      fontSize="small"
                      sx={{ marginRight: "10px" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}

          <ListItem key={"Logout"} className={classess.mainMenu__list}>
            <ListItemButton
              onClick={() => {
                dispatch(logout());
                navigation("/login");
              }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: "white", fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText
                className={classess.mainMenu__list__text}
                primary={"Logout"}
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontFamily: "DM Sans",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Box
          variant="div"
          component="div"
          sx={{
            textAlign: "center",
            background: "#393E4F",
            padding: "20px",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            borderTop: "1px solid #5e5e5e",
          }}
        >
          <HeaderMenu />
        </Box>
      </>
    )
  );
};

export default DrawerItems;
