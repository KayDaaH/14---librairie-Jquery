import React, { useState } from "react";
import styles from "./ListMenu.module.scss";

const ListMenu = () => {
  const options = ["Arkansas", "Alaska", "Colorado", "California"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [menuVisible, setMenuVisible] = useState(false);

  function handleOptionClick(option) {
    setSelectedOption(option);
    setMenuVisible(false);
  }

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }
  return (
    <div className={styles.main}>
      <div className={styles.dropdownMenu}>
        <div className={styles.dropdownHeader} onClick={toggleMenu}>
          {selectedOption} <i className="fa fa-chevron-down"></i>
        </div>
        {menuVisible && (
          <ul className={styles.dropdownOptions}>
            {options.map((option) => (
              <li key={option} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListMenu;
