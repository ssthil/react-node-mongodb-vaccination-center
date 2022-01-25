import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppStateContext } from "../Context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function VaccineRegistration() {
  const [nricNumber, setNRICNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [vaccinationCenter, setVaccinationCenter] = useState(
    "SengKang Community Centre"
  );
  const [bookingDate, setBookingDate] = useState(
    new Date("2022-01-10T11:11:54")
  );
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState(true);
  const [message, setMesage] = useState("");
  const { appState, setAppState } = useContext(AppStateContext);

  const getBookingList = useCallback(() => {
    axios
      .get("http://localhost:4000/api/vaccination-center")
      .then((res) => {
        setAppState(res.data);
      })
      .catch((err) => console.log(err));
  }, [setAppState]);

  useEffect(() => {
    getBookingList();
  }, [getBookingList]);

  function handleChangeNRICNumber(event) {
    setNRICNumber(event.target.value);
  }

  function handleChangeFullName(event) {
    setFullName(event.target.value);
  }

  function handleSelectCenter(event) {
    setVaccinationCenter(event.target.value);
  }

  function handleDateChange(value) {
    setBookingDate(value);
  }

  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const registerData = {
      nricNumber,
      fullName,
      vaccinationCenter,
      bookingDate,
    };
    if (!id) {
      axios
        .post("http://localhost:4000/api/registration", registerData)
        .then((res) => {
          console.log("Submitted", res);
          setOpen(true);
          setMesage("Registration succesful!");
        })
        .catch((err) => {
          setSeverity(false);
          setOpen(true);
          setMesage("This user has already been registered!");
        });
    } else {
      axios
        .patch(`http://localhost:4000/api/registration/${id}`, registerData)
        .then((res) => {
          console.log("Submitted", res);
          setOpen(true);
          setMesage("Registration succesful!");
        })
        .catch((err) => {
          setSeverity(false);
          setOpen(true);
          setMesage("This user has already been registered!");
        });
    }

    setNRICNumber("");
    setFullName("");
    setVaccinationCenter(appState[0].name);
    setBookingDate(new Date("2022-01-10T11:11:54"));
    setSeverity(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/api/booking-list/${id}`)
        .then((res) => {
          console.log("Update", res.data);
          const { nricNumber, fullName, vaccinationCenter, bookingDate } =
            res.data;
          setNRICNumber(nricNumber);
          setFullName(fullName);
          setVaccinationCenter(vaccinationCenter);
          setBookingDate(new Date(bookingDate));
        })
        .catch((err) => console.log(err));
    } else {
      setNRICNumber("");
      setFullName("");
      setVaccinationCenter("SengKang Community Centre");
      setBookingDate();
    }
  }, [id, appState]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {appState !== undefined ? (
          <Box
            component="form"
            sx={{
              mt: 8,
            }}
          >
            <Typography component="h1" variant="h5">
              Book a slot
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nric"
              label="NRIC Number"
              name="NRIC"
              autoComplete="nric"
              sx={{ mb: 2 }}
              autoFocus
              value={nricNumber}
              onChange={handleChangeNRICNumber}
            />
            <TextField
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              sx={{ mb: 2 }}
              value={fullName}
              onChange={handleChangeFullName}
            />
            <InputLabel id="vaccineCenterLabel">Vaccine Center</InputLabel>

            <Select
              labelId="vaccineCenterLabel"
              label="Vaccine Center"
              required
              fullWidth
              id="vaccineCenter"
              value={vaccinationCenter}
              onChange={handleSelectCenter}
              sx={{ mb: 2 }}
            >
              {appState.map((obj, id) => {
                return (
                  <MenuItem key={id} value={obj.name}>
                    {obj.name}
                  </MenuItem>
                );
              })}
            </Select>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Select a Slot"
                value={bookingDate}
                onChange={handleDateChange}
                required
              />
            </LocalizationProvider>

            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              size="large"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Register!
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            <CircularProgress color="warning" />
          </Box>
        )}
      </Container>
      {open && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </React.Fragment>
  );
}
