import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../../components/Header/Header";
import Discover from "../Discover/Discover";
import MovieDetails from "../MovieDetails/MovieDetails";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Discover} exact />
        <Route path="/movie/:id" component={MovieDetails} exact />
      </Switch>
    </div>
  );
}

export default App;
