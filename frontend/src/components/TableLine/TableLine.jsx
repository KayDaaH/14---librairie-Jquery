import React from "react";
import styles from "./TableLine.module.scss";

const TableLine = ({ employee, index }) => {
  return (
    <>
      <td data-title={employee.firstName}>{employee.firstName}</td>
      <td data-title={employee.lastName}>{employee.lastName}</td>
      <td data-title={employee.startDate}>{employee.startDate}</td>
      <td data-title={employee.department}>{employee.department}</td>
      <td data-title={employee.dateOfBirth}>{employee.dateOfBirth}</td>
      <td data-title={employee.street}>{employee.street}</td>
      <td data-title={employee.city}>{employee.city}</td>
      <td data-title={employee.State}>{employee.State}</td>
      <td data-title={employee.zipCode}>{employee.zipCode}</td>
    </>
  );
};

export default TableLine;
