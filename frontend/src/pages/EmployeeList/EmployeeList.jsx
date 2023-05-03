import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table/Table";
import styles from "./EmployeeList.module.scss";

function EmployeeList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/post")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(data);

  return (
    <div className={styles.main}>
      <h1>Current Employees</h1>
      <Table data={data} />
      {/* <div className={styles.searchBar}> */}
      {/* <div className={styles.selectEntries}>
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
      <div className={styles.listContainer}>
        <div className={styles.listSort}>
          <p>First Name</p>
          <p>Last Name</p>
          <p>Start Date</p>
          <p>Department</p>
          <p>Date of Birth</p>
          <p>Street</p>
          <p>City</p>
          <p>State</p>
          <p>Zip Code</p>
        </div>
        <ul className={styles.employeeList}>
          {data.map((employee) => (
            <li key={employee._id}>
              <p>{employee.firstName}</p>
              <p>{employee.lastName}</p>
              <p>{employee.startDate}</p>
              <p>{employee.department}</p>
              <p>{employee.dateOfBirth}</p>
              <p>{employee.street}</p>
              <p>{employee.city}</p>
              <p>{employee.State}</p>
              <p>{employee.zipCode}</p>
            </li>
          ))}
        </ul>
      </div> */}
      <Link to={"/"}>
        <button className={styles.btnNavigation}>Home</button>
      </Link>
    </div>
  );
}

export default EmployeeList;
