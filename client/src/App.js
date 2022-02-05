import React from "react";
import {Route, Switch} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import Statistics from "./components/pages/Statistics";
import NotFound from "./components/pages/NotFound";
import SideBar from "./components/pages/SideBar";
import AllTasks from "./components/pages/AllTasks";
import CategoryTasks from "./components/pages/CategoryTasks";
import AppLoader from "./components/hoc/AppLoader";
import Main from "./components/hoc/Main";
import EditTask from "./components/pages/EditTask";

const App = () => (
  <AppLoader>
    <SideBar/>
    <Main>
      <Switch>
        <Route path="/lists/:id" component={CategoryTasks}/>
        <Route path="/task/:id?" component={EditTask}/>
        <Route path="/statistics" component={Statistics}/>
        <Route path="/" component={AllTasks}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </Main>
  </AppLoader>
);

export default App;
