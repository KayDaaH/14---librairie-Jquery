import React, { useState } from "react";
import TableLine from "../TableLine/TableLine";
import styles from "./Table.module.scss";

const Table = ({ data }) => {
  const [orderBy, setOrderBy] = useState("");
  const tableHeader = [
    "First Name",
    "Last Name",
    "Start Date",
    "Department",
    "Date of Birth",
    "Street",
    "City",
    "State",
    "Zip Code",
  ];

  console.log(data);

  return (
    <div className={styles.main}>
      <div className={styles.topSearchTable}>
        <div className={styles.selectEntries}>
          <label htmlFor="search">Show </label>
          <select name="search" id="search">
            <option value="100">100</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <p>entries</p>
        </div>
        <form>
          <label htmlFor="search">Search : </label>
          <input type="text" id="search" />
        </form>
      </div>
      <table>
        <thead>
          <tr>
            {tableHeader.map((title) => (
              <th key={title} className={styles.tableHeader}>
                <input
                  type="radio"
                  name="header-title"
                  id={title}
                  defaultChecked={
                    title === orderBy || title === orderBy + "reverse"
                      ? true
                      : false
                  }
                  onClick={() => {
                    if (orderBy === title) {
                      setOrderBy(title + "reverse");
                    } else {
                      setOrderBy(title);
                    }
                  }}
                />
                <label htmlFor={title}>{title}</label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((employee, index) => (
              <tr key={employee._id}>
                <TableLine employee={employee} index={index} />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
