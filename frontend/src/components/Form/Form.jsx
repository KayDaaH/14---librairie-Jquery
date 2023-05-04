import React, { useEffect, useState, useContext } from "react";
import styles from "./Form.module.scss";
import locationMenu from "../../utils/menuState.json";
import axios from "axios";
import DatePicker from "react-datepicker";
import Modal from "../Modal/Modal";

const Form = () => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [modalActive, setModalActive] = useState(false);

  const closeModal = () => {
    setModalActive(false);
  };

  useEffect(() => {
    setBirthDate("");
    setStartDate("");
    setModalActive(false);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBirthDate("");
    setStartDate("");

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    setModalActive(true);

    axios.post("http://localhost:5000/post/", data);
    event.target.reset();
  };
  return (
    <>
      <form className={styles.main} onSubmit={handleSubmit} autoComplete="off">
        <div>
          <h2>Create employee</h2>
          <div className={styles.formInput}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="none"
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="none"
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <DatePicker
              id="dateOfBirth"
              name="dateOfBirth"
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="startDate">Start Date</label>
            <DatePicker
              id="startDate"
              name="startDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className={styles.formAdress}>
            <p>Address</p>
            <div className={styles.formInput}>
              <label htmlFor="street">Street</label>
              <input
                id="street"
                name="street"
                type="text"
                autoComplete="none"
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" autoComplete="none" />
            </div>
            <div className={styles.formInput}>
              <label htmlFor="State">State</label>
              {/* <ListMenu States={StateMenu} /> */}
              <select className={styles.selectOption} id="State" name="State">
                {locationMenu.map((option) => (
                  <option key={option.name}>{option.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.zipCodeContainer}>
              <label htmlFor="zipCode">Zip Code</label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                autoComplete="none"
              />
            </div>
          </div>
          <div className={styles.listDepartment}>
            <label htmlFor="department">Department</label>
            <select
              className={styles.selectOption}
              id="department"
              name="department"
            >
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
      <Modal modalActive={modalActive} closeModal={closeModal} />
    </>
  );
};

export default Form;
