import React from "react";
import TextEditor from "./TextEditor";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {v4} from "uuid";

function App() {
  return (
    <BrowserRouter>

        <Switch>
            <Route path = "/" exact>
                <Redirect to={`/documents/${v4()}`}/>
            </Route>
            <Route path = "/documents/:id">
                <TextEditor/>
            </Route>
        </Switch>

    </BrowserRouter>
  );
}

export default App;
