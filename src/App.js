import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Page components ..
import IndexPage from "./pages/index";
import AppTodo from "./AppTodo";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/admin">
            <AppTodo />
          </Route>
          <Route path="/">
            <IndexPage />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
