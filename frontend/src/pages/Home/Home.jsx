import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../components/Form/Form";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>HRnet</h1>
      <Link to="/employee-list">
        <button className={styles.btnNavigation}>View Current Employees</button>
      </Link>
      <Form />
    </div>
  );
}

export default Home;
