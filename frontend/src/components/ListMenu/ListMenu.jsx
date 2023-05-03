import React, { useState } from "react";
import styles from "./ListMenu.module.scss";

const ListMenu = ({ locations }) => {
  let datas;
  const department = [
    {
      name: "Sales",
    },
    {
      name: "Marketing",
    },
    {
      name: "Engineering",
    },
    {
      name: "ces",
    },
    {
      name: "Legal",
    },
  ];
  if (locations) {
    datas = locations;
  } else {
    datas = department;
  }

  const [selectedOption, setSelectedOption] = useState(datas[0].name);
  const [menuVisible, setMenuVisible] = useState(false);

  function handleOptionClick(option) {
    setSelectedOption(option.name);
    console.log(option);
    setMenuVisible(false);
  }

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }
  return (
    <div className={styles.main}>
      <div
        className={`${styles.dropdownMenu} ${
          menuVisible ? styles.visible : ""
        }`}
      >
        <div className={styles.dropdownHeader} onClick={toggleMenu}>
          {selectedOption} <i className="fa fa-chevron-down"></i>
        </div>
        {menuVisible && (
          <div className={styles.menu}>
            <ul className={styles.dropdownOptions}>
              {datas.map((option) => (
                <li key={option.name} onClick={() => handleOptionClick(option)}>
                  {option.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListMenu;
