import React from "react";
import styles from "./InsertIdea.module.css";

export const InsertIdea = () => {
  // Placeholder for the insert idea functionality
  return (
    <div className={styles.insertIdea}>
      <h3>Dodaj nowy pomysł</h3>
      {/* Tutaj będzie formularz do dodawania pomysłu */}
      <input type="text" placeholder="Nazwa pomysłu" />
      <button>Dodaj</button>
    </div>
  );
};
