
import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import logo from "../../Assets/211-logo.png";
import Footer from "../Footer";

const MainLayout = (props) => {
  return (
    <>
      <div
        className="w-full flex-none text-center text-xl"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(1, 169, 198, 0.8),rgba(1, 169, 198, 0.8))",
        }}
      >
        Español | عربى | русский | 繁體中文 | 简体中文 | Tiếng Việt |{" "}
      </div>
      <div style={{maxWidth: '1538px'}} className='mx-auto sm:w-small md:w-medium lg:w-large xl:w-extraLarge'>

      <header className=" grid grid-auto-rows grid-cols-5 " >
        <div
          className="col-start-1 col-span-5 row-start-1 lg:-col-span-1"
        >
          <div className="mx-auto xl:mx-0" style={{ width: "250px" }}>
            <Link to="/">
              <img className="w-full pt-5" alt="211 logo" src={logo} />
            </Link>
          </div>
        </div>
        <div className=" col-start-1 col-span-5 row-start-2 xl:col-start-2 xl:col-span-3 xl:row-start-1 w-full">
          <Nav />
        </div>
        <div className='col-start-1 col-span-5 row-start-3 xl:row-start-1 xl:col-start-5 text-center xl:text-right '>
        <button className='mt-12 border border-orange-600 rounded-full px-5 py-2 mx-auto lg:ml-auto lg:mx-0 hover:bg-orange-600 text-orange-600 hover:text-white font-medium'>Donate</button>

        </div>
      </header>
      </div>

      <main id="m-0 main-container">{props.children}</main>
      <div className="bg-gray-600 mt-16" style={{ minHeight: "400px" }}>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
