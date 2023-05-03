import React from "react";
import styles from "./TableLine.module.scss";

const TableLine = ({ employee, index }) => {
  console.log(employee);
  return (
    <>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.startDate}</td>
      <td>{employee.department}</td>
      <td>{employee.dateOfBirth}</td>
      <td>{employee.street}</td>
      <td>{employee.city}</td>
      <td>{employee.State}</td>
      <td>{employee.zipCode}</td>
    </>
  );
};

export default TableLine;
