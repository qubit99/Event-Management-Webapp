import React from "react";
import { NavItem, NavLink, Nav, Button } from "reactstrap";
import { Link } from "react-router-dom";


const SideBar = () => (
  <div className="col-6 col-md-3">
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Dashboard</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavItem className="navitem">
            <NavLink className="navlink" tag={Link} to={"/admin"}>
              Dashboard
            </NavLink>
            <NavLink className="navlink" tag={Link} to={"/admin/stats"}>
              Stats
            </NavLink>
          </NavItem>
          <center className = "mt-2 p-2">
            <Button outline color = "danger" onClick = {(event) =>{
                window.sessionStorage.removeItem("key");
                window.location.href = "/Event-Management-Webapp/#/";
            }}>Logout</Button>
          </center>
        </Nav>
      </div>
    </div>
  </div>
);

export default SideBar;