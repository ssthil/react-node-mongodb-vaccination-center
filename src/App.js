import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import VaccineCenterList from "./pages/VaccineCenterList";
import AllBookingList from "./pages/AllBookingList";
import VaccineRegistration from "./pages/VaccineRegistration";
import { AppStateContext } from "./Context";
import "./App.css";

const EditVaccineRegistration = () => <div>Edit Vaccine Registration</div>;

function App() {
  const [appState, setAppState] = useState();
  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/vaccine-center-list" element={<VaccineCenterList />} />
          <Route path="/all-bookings" element={<AllBookingList />} />
          <Route
            path="/all-bookings/:bookingId"
            element={<EditVaccineRegistration />}
          />
          <Route path="/registration" element={<VaccineRegistration />} />
          <Route path="/" element={<Navigate replace to="/registration" />} />
          <Route path="/registration/:id" element={<VaccineRegistration />} />
        </Routes>
      </BrowserRouter>
    </AppStateContext.Provider>
  );
}

export default App;
