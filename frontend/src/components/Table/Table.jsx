import React, { useEffect, useState } from "react";
import TableLine from "../TableLine/TableLine";
import styles from "./Table.module.scss";

const Table = ({ data }) => {
  const [orderBy, setOrderBy] = useState("");
  const [employeesCountData, setEmployeesCountData] = useState("");
  const [displayedEntriesSelected, setDisplayedEntriesSelected] = useState(10);

  const [totalPages, setTotalPages] = useState(
    Math.ceil(parseInt(data.length) / parseInt(displayedEntriesSelected))
  );
  const [searchBar, setSearchBar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBarPROVVVVVV, setSearchBarPROVVVVVV] = useState("searchBar");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(displayedEntriesSelected);

  const [dataSortedLength, setDataSortedLength] = useState(0);
  const [searchBarOn, setSearchBarOn] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(
    data.slice(startIndex, endIndex)
  );

  const dataSorted = () => {
    const newDataSorted =
      data &&
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
                return Date.parse(a.dateOfBirth) - Date.parse(b.dateOfBirth);
              } else if (!a.dateOfBirth) {
                return -Number.MAX_SAFE_INTEGER;
              } else {
                return Number.MAX_SAFE_INTEGER;
              }
            case "Date of Birthreverse":
              if (a.dateOfBirth && b.dateOfBirth) {
                return Date.parse(b.dateOfBirth) - Date.parse(a.dateOfBirth);
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
        // .slice(startIndex, endIndex)
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
        ));
    return newDataSorted;
  };
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  const ttt = () => {
    if (dataSorted().length !== 0) {
      const bulle = dataSorted().slice(startIndex, endIndex);
      return bulle;
    } else {
      return <div className={styles.noMatching}>No matching records found</div>;
    }
  };

  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  const triDuMerdierDeLaSearchBar = (e) => {
    setSearchBar((current) => {
      const searchBarValue = e.target.value;
      return searchBarValue;
    });
  };

  useEffect(() => {
    if (searchBar) {
      setSearchBarOn(true);
    } else {
      setSearchBarOn(false);
    }
  }, [searchBar]);

  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  useEffect(() => {
    setDataSortedLength(dataSorted().length);
    setEmployeesCountData(data.length);
    setStartIndex(0);
    setEndIndex(displayedEntriesSelected);
    renderPageButtons();

    setCurrentPage(1);
  }, [data, orderBy, displayedEntriesSelected, searchBarOn, searchBar]);

  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  const displayedEntriesSelectedFunc = async (e) => {
    let NumEntriesSelected;
    setDisplayedEntriesSelected(
      (current) => (NumEntriesSelected = parseInt(e.target.value))
    );
    await setCurrentPage(1);
    let currentStartIndex = 0;
    await setStartIndex(0);
    setEndIndex(NumEntriesSelected);
  };

  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  const handlePrevPage = async () => {
    setCurrentPage(currentPage - 1);
    let currentStartIndex;
    await setStartIndex(
      (current) => (currentStartIndex = current - displayedEntriesSelected)
    );
    setEndIndex(currentStartIndex + displayedEntriesSelected);
  };

  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  const handleNextPage = async () => {
    setCurrentPage(currentPage + 1);
    let currentStartIndex;
    await setStartIndex(
      (current) => (currentStartIndex = currentPage * displayedEntriesSelected)
    );
    setEndIndex(currentStartIndex + displayedEntriesSelected);
  };

  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    let currentPageSync;
    setCurrentPage((current) => (currentPageSync = current));
    let currentStartIndex;
    await setStartIndex(
      (current) =>
        (currentStartIndex =
          currentPageSync * displayedEntriesSelected - displayedEntriesSelected)
    );
    setEndIndex(currentStartIndex + displayedEntriesSelected);
  };
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  const information = () => {
    if (!searchBarOn) {
      const information = `Showing ${
        dataSortedLength === 0 ? startIndex : startIndex + 1
      } to ${endIndex >= dataSortedLength ? dataSortedLength : endIndex}
      of ${dataSortedLength} entries`;
      return information;
    } else {
      const information = `Showing ${
        dataSortedLength === 0 ? startIndex : startIndex + 1
      } to ${endIndex >= dataSortedLength ? dataSortedLength : endIndex}
      of ${dataSortedLength} entries (filtered from ${data.length} entries)`;
      return information;
    }
  };

  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  const renderPageButtons = () => {
    let totalPagesss = Math.ceil(dataSortedLength / displayedEntriesSelected);
    const pageButtons = [];

    if (totalPagesss === 0 || totalPagesss === 1) {
      return;
    }

    if (totalPagesss <= 3) {
      pageButtons.push(
        <button
          className={styles.navigationButton}
          key="prev"
          onClick={() => handlePrevPage()}
          disabled={currentPage === 1}
        >
          Prev
        </button>
      );
      for (let i = 1; i <= totalPagesss; i++) {
        pageButtons.push(
          <button
            className={styles.navigationButton}
            key={i}
            disabled={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
      pageButtons.push(
        <button
          className={styles.navigationButton}
          key="next"
          onClick={() => handleNextPage()}
          disabled={currentPage === totalPagesss}
        >
          Next
        </button>
      );
    } else {
      let leftButton = null;
      let middleButton = null;
      let rightButton = null;

      if (currentPage === 1) {
        leftButton = (
          <button
            className={styles.navigationButton}
            key={1}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            {1}
          </button>
        );
        middleButton = (
          <button
            className={styles.navigationButton}
            key={2}
            onClick={() => handlePageChange(2)}
          >
            {2}
          </button>
        );
        rightButton = (
          <button
            className={styles.navigationButton}
            key={3}
            onClick={() => handlePageChange(3)}
          >
            {3}
          </button>
        );
      } else if (currentPage === totalPagesss) {
        leftButton = (
          <button
            className={styles.navigationButton}
            key={totalPagesss - 2}
            onClick={() => handlePageChange(totalPagesss - 2)}
            disabled={currentPage === totalPagesss - 2}
          >
            {totalPagesss - 2}
          </button>
        );
        middleButton = (
          <button
            className={styles.navigationButton}
            key={totalPagesss - 1}
            onClick={() => handlePageChange(totalPagesss - 1)}
            disabled={currentPage === totalPagesss - 1}
          >
            {totalPagesss - 1}
          </button>
        );
        rightButton = (
          <button
            className={styles.navigationButton}
            key={totalPagesss}
            disabled={currentPage === totalPagesss}
            onClick={() => handlePageChange(totalPagesss)}
          >
            {totalPagesss}
          </button>
        );
      } else {
        leftButton = (
          <button
            className={styles.navigationButton}
            key={currentPage - 1}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === currentPage - 1}
          >
            {currentPage - 1}
          </button>
        );
        middleButton = (
          <button
            className={styles.navigationButton}
            key={currentPage}
            onClick={() => handlePageChange(currentPage)}
            disabled={currentPage}
          >
            {currentPage}
          </button>
        );
        rightButton = (
          <button
            className={styles.navigationButton}
            key={currentPage + 1}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === currentPage + 1}
          >
            {currentPage + 1}
          </button>
        );
      }

      pageButtons.push(
        <button
          className={styles.navigationButton}
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
          className={styles.navigationButton}
          key="next"
          onClick={() => handleNextPage()}
          disabled={currentPage === totalPagesss}
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
  let dataSortedlength2;
  let totalPagesSearchBar;
  let totalPagesSearchBarNope;

  const [svgStatesTop, setSvgStatesTop] = useState("");

  const [svgStatesBot, setSvgStatesBot] = useState(
    tableHeader.reduce((acc, title) => {
      // console.log("acc:", acc);
      // console.log("title:", title);
      return { ...acc, [title]: title };
    }, {})
  );

  const [titleID, settitleID] = useState("");
  const [svgClassTop, setSvgClassTop] = useState(styles.polygonBlack);
  const [svgClassBot, setSvgClassBot] = useState(styles.polygonBlack);
  const [svgClassBasic, setSvgClassBasic] = useState("");

  const handleClick = (title) => {
    settitleID(title);
    console.log(titleID);

    // console.log(svgStatesTop[title]);
    // if (svgStatesTop === "") {
    //   setSvgStatesTop(title);
    // } else if (svgStatesTop === title) {
    //   setSvgStatesTop(title + "active");
    // } else {
    //   setSvgStatesTop("");
    // setSvgClass(styles.BasicColor);
    // }

    if (orderBy === title) {
      setOrderBy(title + "reverse");
      setSvgClassTop(styles.polygonBlack);
      setSvgClassBot(styles.polygonBasic);
    } else {
      setOrderBy(title);
      setSvgClassTop(styles.polygonBasic);
      setSvgClassBot(styles.polygonBlack);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.topSearchTable}>
        <div className={styles.selectEntries}>
          <label htmlFor="search">Show </label>
          <select
            name="search"
            id="search"
            onChange={(e) => displayedEntriesSelectedFunc(e)}
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
            onChange={(e) => triDuMerdierDeLaSearchBar(e)}
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
                  onClick={() => handleClick(title)}
                  // onClick={() => {
                  //   if (orderBy === title) {
                  //     setOrderBy(title + "reverse");
                  //   } else {
                  //     setOrderBy(title);
                  //   }
                  // }}
                />
                <label htmlFor={title} className={styles.tableHeaderTitle}>
                  <p>{title}</p>
                  <div className={styles.tableHeaderLogos}>
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      preserveAspectRatio="xMidYMid meet"
                      className={`${styles.tableHeaderLogoTop} ${
                        titleID === title ? svgClassTop : svgClassBasic
                      }`}
                    >
                      <polygon points="25 5 45 45 5 45" fill="#D8D8D8" />
                    </svg>
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      preserveAspectRatio="xMidYMid meet"
                      className={`${styles.tableHeaderLogoBot} ${
                        titleID === title ? svgClassBot : svgClassBasic
                      }`}
                    >
                      <polygon points="25 5 45 45 5 45" fill="#D8D8D8" />
                    </svg>
                  </div>
                </label>
              </th>
            ))}
          </tr>
        </thead>
        {}
        <tbody>{ttt()}</tbody>
      </table>
      <div className={styles.tableFooter}>
        <div>{information()}</div>
        <div className={styles.buttons}>{renderPageButtons()}</div>
      </div>
    </div>
  );
};

export default Table;
