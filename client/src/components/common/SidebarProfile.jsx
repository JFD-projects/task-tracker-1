import {NavLink} from "react-router-dom";
import imgExit from "../../assets/img/exit_icon.svg";
import * as PropTypes from "prop-types";
import React from "react";
import "../../css/sidebarProfile.scss"

export function SidebarProfile(props) {
  return <div className="sidebar__profile">
    <div>
      <h3>{props.user.name}</h3>
      <h6>{props.user.email}</h6>
    </div>
    <NavLink to="/logout"><img className="exit_icon" src={imgExit} alt="Exit"/></NavLink>
  </div>
}

SidebarProfile.propTypes = {user: PropTypes.shape({name: PropTypes.string, email: PropTypes.string})}
