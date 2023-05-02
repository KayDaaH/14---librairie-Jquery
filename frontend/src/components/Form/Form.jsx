import React from "react";
import { useForm } from "react-hook-form";
import ListMenu from "../ListMenu/ListMenu";
import styles from "./Form.module.scss";

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
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
            <label htmlFor="state">State</label>
            <ListMenu />
          </div>
          <div className={styles.zipCodeContainer}>
            <label htmlFor="zipCode">Zip Code</label>
            <input id="zipCode" type="text" autoComplete="none" />
          </div>
        </div>
        <div className={styles.listDepartment}>
          <label htmlFor="state">State</label>
          <ListMenu />
        </div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default Form;
