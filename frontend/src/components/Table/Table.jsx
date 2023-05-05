import React, { useState } from "react";
import TableLine from "../TableLine/TableLine";
import styles from "./Table.module.scss";

const Table = ({ data }) => {
  const [orderBy, setOrderBy] = useState("");
  const [numItems, setNumItems] = useState(10);
  const [searchBar, setSearchBar] = useState("");

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

  console.log(searchBar);
  console.log(data);

  return (
    <div className={styles.main}>
      <div className={styles.topSearchTable}>
        <div className={styles.selectEntries}>
          <label htmlFor="search">Show </label>
          <select
            name="search"
            id="search"
            onChange={(e) => setNumItems(parseInt(e.target.value))}
          >
            ><option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <p>entries</p>
        </div>
        <form>
          <label htmlFor="search">Search : </label>
          <input
            type="text"
            id="search"
            onChange={(e) => setSearchBar(e.target.value)}
          />
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
                <label htmlFor={title} className={styles.tableHeaderTitle}>
                  <p>{title}</p>
                  <div className={styles.tableHeaderLogos}>
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      preserveAspectRatio="xMidYMid meet"
                      className={styles.tableHeaderLogoTop}
                    >
                      <polygon points="25 5 45 45 5 45" fill="#D8D8D8" />
                    </svg>
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      preserveAspectRatio="xMidYMid meet"
                      className={styles.tableHeaderLogoBot}
                    >
                      <polygon points="25 5 45 45 5 45" fill="#D8D8D8" />
                    </svg>
                  </div>
                </label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data
              .slice(0, numItems)
              .filter((item) =>
                Object.entries(item).some(
                  ([key, value]) =>
                    key !== "_id" &&
                    key !== "createdAt" &&
                    key !== "updatedAt" &&
                    key !== "__v" &&
                    value &&
                    value
                      .toString()
                      .toLowerCase()
                      .includes(searchBar.toString().toLowerCase())
                )
              )
              .sort((a, b) => {
                switch (orderBy) {
                  case "First Name":
                    return a.firstName && b.firstName
                      ? a.firstName.localeCompare(b.firstName)
                      : a.firstName
                      ? 1
                      : -1;
                  case "First Namereverse":
                    return a.firstName && b.firstName
                      ? b.firstName.localeCompare(a.firstName)
                      : b.firstName
                      ? 1
                      : -1;

                  case "Last Name":
                    return a.lastName && b.lastName
                      ? a.lastName.localeCompare(b.lastName)
                      : a.lastName
                      ? 1
                      : -1;
                  case "Last Namereverse":
                    return a.lastName && b.lastName
                      ? b.lastName.localeCompare(a.lastName)
                      : b.lastName
                      ? 1
                      : -1;
                  case "Start Date":
                    if (a.startDate && b.startDate) {
                      return Date.parse(a.startDate) - Date.parse(b.startDate);
                    } else if (!a.startDate) {
                      return -Number.MAX_SAFE_INTEGER;
                    } else {
                      return Number.MAX_SAFE_INTEGER;
                    }
                  case "Start Datereverse":
                    if (a.startDate && b.startDate) {
                      return Date.parse(b.startDate) - Date.parse(a.startDate);
                    } else if (!a.startDate) {
                      return Number.MAX_SAFE_INTEGER;
                    } else {
                      return -Number.MAX_SAFE_INTEGER;
                    }

                  case "Department":
                    return a.department && b.department
                      ? a.department.localeCompare(b.department)
                      : a.department
                      ? 1
                      : -1;
                  case "Departmentreverse":
                    return a.department && b.department
                      ? b.department.localeCompare(a.department)
                      : b.department
                      ? 1
                      : -1;

                  case "Date of Birth":
                    if (a.dateOfBirth && b.dateOfBirth) {
                      return (
                        Date.parse(a.dateOfBirth) - Date.parse(b.dateOfBirth)
                      );
                    } else if (!a.dateOfBirth) {
                      return -Number.MAX_SAFE_INTEGER;
                    } else {
                      return Number.MAX_SAFE_INTEGER;
                    }
                  case "Date of Birthreverse":
                    if (a.dateOfBirth && b.dateOfBirth) {
                      return (
                        Date.parse(b.dateOfBirth) - Date.parse(a.dateOfBirth)
                      );
                    } else if (!a.dateOfBirth) {
                      return Number.MAX_SAFE_INTEGER;
                    } else {
                      return -Number.MAX_SAFE_INTEGER;
                    }
                  case "Street":
                    return a.street && b.street
                      ? a.street.localeCompare(b.street)
                      : a.street
                      ? 1
                      : -1;
                  case "Streetreverse":
                    return a.street && b.street
                      ? b.street.localeCompare(a.street)
                      : b.street
                      ? 1
                      : -1;
                  case "City":
                    return a.city && b.city
                      ? a.city.localeCompare(b.city)
                      : a.city
                      ? 1
                      : -1;
                  case "Cityreverse":
                    return a.city && b.city
                      ? b.city.localeCompare(a.city)
                      : b.city
                      ? 1
                      : -1;
                  case "State":
                    return a.State && b.State
                      ? a.State.localeCompare(b.State)
                      : a.State
                      ? 1
                      : -1;
                  case "Statereverse":
                    return a.State && b.State
                      ? b.State.localeCompare(a.State)
                      : b.State
                      ? 1
                      : -1;
                  case "Zip Code":
                    if (a.zipCode && b.zipCode) {
                      return a.zipCode - b.zipCode;
                    } else if (a.zipCode) {
                      return 1;
                    } else if (b.zipCode) {
                      return -1;
                    } else {
                      return 0;
                    }
                  case "Zip Codereverse":
                    if (a.zipCode && b.zipCode) {
                      return b.zipCode - a.zipCode;
                    } else if (a.zipCode) {
                      return -1;
                    } else if (b.zipCode) {
                      return 1;
                    } else {
                      return 0;
                    }
                }
              })
              .map((employee, index) => (
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
