import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList/EmployeeList";
import Home from "./pages/Home/Home";

const App = () => {
  // const context Value = {
  //   location: {
  //     name: "",
  //     abbreviation: "",
  //   },
  //   Department: "",
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
