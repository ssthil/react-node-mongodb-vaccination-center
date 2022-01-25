import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "100px" }}>
      <AppBar position="fixed" sx={{ bgcolor: "#553db5" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Homage Covid-19 Vaccine Center
          </Typography>

          <MenuBar />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const MenuBar = () => (
  <Box sx={{ display: { xs: "none", md: "flex" } }}>
    <Button
      key="availableSlots"
      sx={{ my: 2, color: "white", display: "block" }}
      component={Link}
      to="/vaccine-center-list"
    >
      Vaccine Center List
    </Button>
    <Button
      key="allBooking"
      sx={{ my: 2, color: "white", display: "block" }}
      component={Link}
      to="/all-bookings"
    >
      All Booking List
    </Button>
    <Button
      key="registration"
      variant="contained"
      component={Link}
      to="/registration"
      sx={{
        my: 2,
        color: "white",
        display: "block",
        bgcolor: "warning.main",
        marginLeft: "50px",
      }}
    >
      Registration
    </Button>
  </Box>
);
export default NavBar;
