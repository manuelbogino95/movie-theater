import React from "react";
import Header from "../../components/Header/Header";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <Header />
      <div className={styles.main}></div>
    </div>
  );
}

export default App;
