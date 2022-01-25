import * as React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function VaccinationCenterCard({ data, availableSlots }) {
  return (
    <Box sx={{ minWidth: 275, marginBottom: 2 }}>
      <Card variant="outlined">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="#455a64" gutterBottom>
              Vaccine Center
            </Typography>
            <Typography sx={{ mb: 4.5 }} variant="h5" component="div">
              {data.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="#e65100">
              Address
            </Typography>
            <Typography variant="body2">{data.address}</Typography>
            <Typography variant="body2">{data.country}</Typography>
          </CardContent>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="primary">
              Daily Nurses Count
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="body1" component="div">
              {data.dailyNurses}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="#c51162" gutterBottom>
              Operating Hours
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5 }}>
              {data.operatingHours}
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Available Slots
            </Typography>
            <Typography
              sx={{ fontWeight: 700, color: "#2e7d32" }}
              variant="body0"
            >{`${availableSlots} / ${data.allocatedSlots}`}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
