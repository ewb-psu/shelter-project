/** @format */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import ThemeDataContext from "../context/themeData/ThemeDataContext";
import logo from "../../Assets/211-logo.png";
import Footer from "../Footer";

const MainLayout = (props) => {
  const themeDataContext = useContext(ThemeDataContext);
  console.log(themeDataContext);
  return (
    <>
      <div
        className="w-full flex-none text-center text-xl"
        // style={{
        //   height: "20px",
        //   backgroundImage:
        //     "linear-gradient(to right, rgba(1, 169, 198, 0.2),rgba(1, 169, 198, 0.8))",
        // }}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(1, 169, 198, 0.8),rgba(1, 169, 198, 0.8))",
        }}
      >
        Español | عربى | русский | 繁體中文 | 简体中文 | Tiếng Việt |{" "}
      </div>
      <header className=" mx-5 sm:mx-16 xl:mx-16 grid grid-auto-rows grid-cols-3">
        <div
          className="col-start-1 col-span-3 row-start-1 lg:-col-span-1"
          // className={` ${
          //   themeDataContext.showNav
          //     ? "col-start-1 col-span-4 lg:-col-span-1 row-start-1"
          //     : "col-start-2 col-span-2 row-start-1 flex items-center justify-center"
          // } `}
        >
          <div className="mx-auto xl:mx-0" style={{ width: "300px" }}>
            <Link to="/">
              <img className="w-full pt-5" alt="211 logo" src={logo} />
            </Link>
          </div>
        </div>
        <div className=" col-start-1 col-span-3 row-start-2 xl:col-start-2 xl:col-span-1 xl:row-start-1">
          {/* {themeDataContext.showNav && <Nav />} */}
          <Nav />
        </div>
        <div className='col-start-1 col-span-3 row-start-3 xl:row-start-1 xl:col-start-3 text-center '>
        <button className='mt-12 border border-orange-600 rounded-full px-5 mx-auto lg:ml-auto lg:mx-0 hover:bg-orange-600 text-orange-600 hover:text-white'>Donate</button>

        </div>
      </header>

      <main id="m-0 main-container">{props.children}</main>
      <div className="bg-gray-600 mt-16" style={{ minHeight: "400px" }}>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
