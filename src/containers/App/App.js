import React from "react";
import styles from "./App.module.css";
import Header from "../../components/Header/Header";
import Discover from "../Discover/Discover";

function App() {
  return (
    <div>
      <Header />
      <div className={styles.main}>
        <Discover />
      </div>
    </div>
  );
}

export default App;
