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
      <Link to={"/"}>
        <button className={styles.btnNavigation}>Home</button>
      </Link>
    </div>
  );
}

export default EmployeeList;
