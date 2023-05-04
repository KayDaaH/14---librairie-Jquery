import React, { useState } from "react";
import styles from "./Modal.module.scss";

const Modal = ({ modalActive, closeModal }) => {
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className={styles.main}
      onClick={closeModal}
      style={{ display: modalActive ? "flex" : "none" }}
    >
      <div className={styles.modaltext} onClick={stopPropagation}>
        <p>Employee Created!</p>
        <div className={styles.closeButton} onClick={closeModal}></div>
      </div>
    </div>
  );
};

export default Modal;
