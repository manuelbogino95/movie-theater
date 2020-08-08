import React from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import Header from "../../components/Header/Header";
import Discover from "../Discover/Discover";

function App() {
  return (
    <div>
      <Header />
      <div className={styles.main}>
        <Switch>
          <Route path="/" component={Discover} exact />
        </Switch>
      </div>
    </div>
  );
}

export default App;
