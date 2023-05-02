import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList/EmployeeList";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empliyee-list" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
