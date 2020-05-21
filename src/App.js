import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import VideoPage from "./VideoPage";
import HomePage from "./HomePage";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path={"/"} exact component={HomePage}/>
            <Route path={"/video/:id"} exact component={VideoPage}/>
          </Switch>
        </BrowserRouter>
    );
  }
}
export default App;