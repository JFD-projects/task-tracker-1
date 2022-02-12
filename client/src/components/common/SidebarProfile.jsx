import {NavLink} from "react-router-dom";
import imgExit from "../../assets/img/exit_icon.svg";
import React from "react";

export const SidebarProfile = ({user}) => (<div className="todo__sidebar-profile">
    <div>
      <h3>{user.name}</h3>
      <h6>{user.email}</h6>
    </div>
    <NavLink to="/logout"><img className="exit_icon" src={imgExit} alt="Exit"/></NavLink>
  </div>
)
