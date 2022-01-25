import { Box, Container, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HomageTable from "../components/Table";
import { AppStateContext } from "../Context";

function AllBookingList() {
  const [bookingList, setBookingList] = useState([]);
  const navigate = useNavigate();
  const { setAppState } = useContext(AppStateContext);

  const getBookingList = useCallback(() => {
    axios
      .get("http://localhost:4000/api/booking-list")
      .then((res) => {
        setBookingList(res.data);
        setAppState(res.data);
      })
      .catch((err) => console.log(err));
  }, [setAppState]);

  useEffect(() => {
    getBookingList();
  }, [getBookingList]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/booking-list/${id}`)
      .then((res) => {
        console.log(res.data);
        getBookingList();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    navigate(`/registration/${id}`);
    console.log(id);
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        {bookingList.length > 0 ? (
          <HomageTable
            data={bookingList}
            onEditClick={(id) => handleEdit(id)}
            onDeleteClick={(id) => handleDelete(id)}
          />
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
      </Box>
    </Container>
  );
}

export default AllBookingList;
