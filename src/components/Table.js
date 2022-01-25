import * as React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const TableHeaderCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2676af",
    color: "white",
  },
}));

export default function HomageTable({ data, onEditClick, onDeleteClick }) {
  return (
    <>
      <h2>Active Booking List</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>NRIC Number</TableHeaderCell>
              <TableHeaderCell>Center Name</TableHeaderCell>
              <TableHeaderCell>Booking Time</TableHeaderCell>
              <TableHeaderCell align="center">Edit</TableHeaderCell>
              <TableHeaderCell align="center">Delete</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow
                  key={row.fullName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.fullName}
                  </TableCell>
                  <TableCell>{row.nricNumber}</TableCell>
                  <TableCell>{row.vaccinationCenter}</TableCell>
                  <TableCell>{row.bookingDate}</TableCell>
                  <TableCell align="center">
                    <i
                      className="fas fa-edit icon-cursor"
                      onClick={() => onEditClick(row._id)}
                    ></i>
                  </TableCell>
                  <TableCell align="center">
                    <i
                      className="fas fa-trash-alt icon-cursor"
                      onClick={() => onDeleteClick(row._id)}
                    ></i>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
