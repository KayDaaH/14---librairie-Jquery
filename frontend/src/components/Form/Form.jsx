import React, { useEffect, useState, useContext } from "react";
import styles from "./Form.module.scss";
import locationMenu from "../../utils/menuState.json";

const Form = () => {
  return (
    <form className={styles.main}>
      <div>
        <h2>Create employee</h2>
        <div className={styles.formInput}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" type="text" autoComplete="none" />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" type="text" autoComplete="none" />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input id="dateOfBirth" type="text" autoComplete="none" />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="startDate">Start Date</label>
          <input id="startDate" type="text" autoComplete="none" />
        </div>
        <div className={styles.formAdress}>
          <p>Address</p>
          <div className={styles.formInput}>
            <label htmlFor="street">Street</label>
            <input id="street" type="text" autoComplete="none" />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="city">City</label>
            <input id="city" type="text" autoComplete="none" />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="location">State</label>
            {/* <ListMenu locations={locationMenu} /> */}
            <select className={styles.location} id="department">
              {locationMenu.map((option) => (
                <option key={option.name}>{option.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.zipCodeContainer}>
            <label htmlFor="zipCode">Zip Code</label>
            <input id="zipCode" type="text" autoComplete="none" />
          </div>
        </div>
        <div className={styles.listDepartment}>
          <label htmlFor="department">Department</label>
          <select className={styles.department} id="department">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>ces</option>
            <option>Legal</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default Form;
