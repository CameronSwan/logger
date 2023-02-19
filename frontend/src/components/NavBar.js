import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <strong>Logger</strong>
      </Link>
    </nav>
  );
};

export default NavBar;
