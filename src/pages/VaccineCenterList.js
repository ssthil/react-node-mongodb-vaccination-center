import { Box, Container, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import VaccinationCenterCard from "../components/Card";
import { AppStateContext } from "../Context";

function VaccineCenterList() {
  const [vaccinationCenterList, setVaccinationCenterList] = useState([]);
  const { appState } = useContext(AppStateContext);

  const vaccinationCenterNames = appState?.map(
    (item) => item.vaccinationCenter
  );

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/vaccination-center")
      .then((res) => setVaccinationCenterList(res.data));
  }, []);

  return (
    <Container maxWidth="md">
      {vaccinationCenterList.length > 0 ? (
        <Box sx={{ flexGrow: 1 }}>
          {vaccinationCenterList.map((item) => {
            const availableSlots =
              item.allocatedSlots -
              vaccinationCenterNames.filter((element) => element === item.name)
                .length;
            return (
              <VaccinationCenterCard
                data={item}
                key={item.name}
                availableSlots={availableSlots}
              />
            );
          })}
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
  );
}

export default VaccineCenterList;
