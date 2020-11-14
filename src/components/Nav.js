/** @format */

import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="">
      <ul className="mt-12 flex flex-wrap justify-center text-sm space-x-3 ">
        <Link to="/">
          {" "}
          <li className=" font-medium  active:bg-themeTealFlat hover:text-themeTeal">
            Home
          </li>
        </Link>
        <Link to="/resources">
          {" "}
          <li className=" font-medium bold active:bg-themeTealFlat hover:text-themeTeal">
            Find Resources
          </li>
        </Link>
        <li className="font-medium active:bg-themeTealFlat hover:text-themeTeal">
          <a href="https://www.211info.org/about">About Us</a>
        </li>
        <li className="font-medium active:bg-themeTealFlat hover:text-themeTeal">
          <a href="https://www.211info.org/programs">Our Programs</a>
        </li>
        <li className="font-medium active:bg-themeTealFlat hover:text-themeTeal">
          <a href="http://www.navigateresources.net/info/Request.aspx">
            For Providers
          </a>
        </li>
        <li className="font-medium active:bg-themeTealFlat hover:text-themeTeal">
          <a href="https://www.211info.org/reporting">Our Data</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
