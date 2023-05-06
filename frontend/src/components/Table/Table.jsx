import React, { useEffect, useState } from "react";
import TableLine from "../TableLine/TableLine";
import styles from "./Table.module.scss";

const Table = ({ data }) => {
  const [orderBy, setOrderBy] = useState("");
  const [employeesCountData, setEmployeesCountData] = useState("");
  const [displayedEntriesSelected, setDisplayedEntriesSelected] = useState(10);
  const [searchBar, setSearchBar] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.length / displayedEntriesSelected)
  );
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0 + displayedEntriesSelected);
  const [entriesToShow, setEntriesToShow] = useState(
    data.slice(startIndex, endIndex)
  );

  const handlePrevPage = async () => {
    setCurrentPage(currentPage - 1);
    let currentStartIndex;
    await setStartIndex(
      (current) => (currentStartIndex = current - displayedEntriesSelected)
    );
    setEndIndex(currentStartIndex + displayedEntriesSelected);
  };
  const handleNextPage = async () => {
    setCurrentPage(currentPage + 1);
    let currentStartIndex;
    await setStartIndex(
      (current) => (currentStartIndex = currentPage * displayedEntriesSelected)
    );
    setEndIndex(currentStartIndex + displayedEntriesSelected);
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button key={i} onClick={() => handlePageChange(i)}>
            {i}
          </button>
        );
      }
    } else {
      let leftButton = null;
      let middleButton = null;
      let rightButton = null;

      if (currentPage === 1) {
        leftButton = (
          <button key={1} onClick={() => handlePageChange(1)}>
            {1}
          </button>
        );
        middleButton = (
          <button key={2} onClick={() => handlePageChange(2)}>
            {2}
          </button>
        );
        rightButton = (
          <button key={3} onClick={() => handlePageChange(3)}>
            {3}
          </button>
        );
      } else if (currentPage === totalPages) {
        leftButton = (
          <button
            key={totalPages - 2}
            onClick={() => handlePageChange(totalPages - 2)}
          >
            {totalPages - 2}
          </button>
        );
        middleButton = (
          <button
            key={totalPages - 1}
            onClick={() => handlePageChange(totalPages - 1)}
          >
            {totalPages - 1}
          </button>
        );
        rightButton = (
          <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        );
      } else {
        leftButton = (
          <button
            key={currentPage - 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        );
        middleButton = (
          <button
            key={currentPage}
            onClick={() => handlePageChange(currentPage)}
          >
            {currentPage}
          </button>
        );
        rightButton = (
          <button
            key={currentPage + 1}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        );
      }

      pageButtons.push(
        <button
          key="prev"
          onClick={() => handlePrevPage()}
          disabled={currentPage === 1}
        >
          Prev
        </button>
      );

      pageButtons.push(leftButton);
      pageButtons.push(middleButton);
      pageButtons.push(rightButton);

      pageButtons.push(
        <button
          key="next"
          onClick={() => handleNextPage()}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      );
    }
    return pageButtons;
  };

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

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / displayedEntriesSelected));
    setEmployeesCountData(data.length);
    setEndIndex(startIndex + displayedEntriesSelected);
    renderPageButtons();
  }, [data, searchBar, orderBy, displayedEntriesSelected]);

  return (
    <div className={styles.main}>
      <div className={styles.topSearchTable}>
        <div className={styles.selectEntries}>
          <label htmlFor="search">Show </label>
          <select
            name="search"
            id="search"
            onChange={(e) =>
              setDisplayedEntriesSelected(parseInt(e.target.value))
            }
            // onChange={(e) => setdisplayedEntriesSelected(parseInt(e.target.value))}
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
              .slice(startIndex, endIndex)
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
              .map((employee, index) => (
                <tr key={employee._id}>
                  <TableLine employee={employee} index={index} />
                </tr>
              ))}
        </tbody>
      </table>
      {/* <div className={styles.entryCounter}>
        Showing 1 of 10 of {employeesCountData} entries
      </div> */}
      <div className={styles.tableFooter}>
        {/* <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {renderPageButtons()}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button> */}
        {/* <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.previousBut}
        >
          Previous
        </button> */}
        <div>{renderPageButtons()}</div>
        {/* <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.NextBut}
        >
          Next
        </button> */}
      </div>
    </div>
  );
};

export default Table;
