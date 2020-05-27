import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import { Link } from "react-router-dom";


const SideBar = () => (
    <div className = "col-6 col-md-3">
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Admin Dashboard</h3>
            </div>
            <div className="side-menu">
                <Nav vertical className="list-unstyled pb-3">
                    <NavItem className="navitem">
                        <NavLink className="navlink" tag={Link} to={"/Stats"}>
                            Stats
                </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </div>
    </div>
);

export default SideBar;