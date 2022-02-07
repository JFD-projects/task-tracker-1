import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import Statistics from "./components/pages/Statistics";
import NotFound from "./components/pages/NotFound";
import SideBar from "./components/pages/SideBar";
import AllTasks from "./components/pages/AllTasks";
import CategoryTasks from "./components/pages/CategoryTasks";
import AppLoader from "./components/hoc/AppLoader";
import Main from "./components/hoc/Main";
import EditTask from "./components/pages/EditTask";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";

const App = () => (
  <BrowserRouter>
    <AppLoader>
      <SideBar/>
      <Main>
        <Routes>
          <Route path="/lists/:id" element={<CategoryTasks/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path="/task" element={<EditTask/>}>
            <Route path=":id" element={<EditTask/>}/>
          </Route>
          <Route path="/statistics" element={<Statistics/>}/>
          <Route path="/" element={<AllTasks/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Main>
    </AppLoader>
  </BrowserRouter>

);

export default App;
