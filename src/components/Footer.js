import React from "react";
// import '../Assets/Footer.scss';

const Footer = () => {
  return (
    <footer className="">
      <div
        className=" w-full "
        style={{ minHeight: "400px", backgroundColor: "#acce62" }}
      >
        <h2 className="py-12 mx-5 sm:mx-16 md:mx-32 xl:mx-64 underline text-4xl font-bold">
          About Us
        </h2>
        <p className="mx-5 sm:mx-16 md:mx-32 xl:mx-64 text-xl">
          Our nonprofit contact center launched in 1980 as a crisis line. In
          2004, we transformed into a 211 service, providing callers with
          referrals to basic needs programs such as food, shelter, health care
          and more. Since then, we’ve expanded: consumers can still reach us by
          calling 211, but they can also text or email, or use our mobile app
          and online database. And we now serve all 36 Oregon counties and
          Clark, Cowlitz, Skamania and Wahkiakum counties in Southwest
          Washington.
        </p>
      </div>
      <div
        className=" w-full"
        style={{ minHeight: "400px", backgroundColor: "#c1da8a" }}
      >
        <h2 className="py-12 mx-5 sm:mx-16 md:mx-32 xl:mx-64 underline text-4xl font-bold">
          Our Data
        </h2>
        <p className="mx-5 sm:mx-16  md:mx-32 xl:mx-64 text-xl">
          211info’s Data Team helps explain what is happening in our
          communities: social service needs and unmet needs, demographic trends
          and regional changes. Stakeholders including elected officials and
          policy makers from the local to state level rely on 211info as a
          source of data reports and analysis.
        </p>
      </div>
      <div
        className=" w-full"
        style={{ minHeight: "200px", backgroundColor: "#d5e6b1" }}
      >
        <div className="w-full">
          <p className="text-center font-bold py-12">
            SIGN UP FOR OUR NEWSLETTER
          </p>
          <button className="block mx-auto border rounded-full py-4 px-8 bg-white hover:bg-gray-200">
            <span className="text-orange-600 font-medium">Sign Up</span>
          </button>
        </div>
      </div>
      <div
        className=""
        style={{ minHeight: "200px", backgroundColor: "#7e7c7c" }}
      >
        <div className="mx-16 xl:mx-64 flex flex-wrap">
          <div className="w-full md:w-1/3 flex flex-col items-center mb-12 px-5">
            <p className="font-bold pt-12 pb-5 text-white underline">Info</p>
            <a
              href="https://www.211info.org/contact"
              className="text-white font-bold"
            >
              Contact
            </a>
            <a
              href="https://www.211info.org/donate"
              className="text-white font-bold"
            >
              Donate
            </a>
            <p className="font-bold pt-5 pb-5 text-white">
              In partnership with
            </p>
            <img
              alt="logo for united way"
              src="https://images.squarespace-cdn.com/content/v1/5b398896e17ba3c88f7a04b1/1531602870373-3DTLSIN1QZ5ZXA30KDO1/ke17ZwdGBToddI8pDm48kEFcENwZPrZIPoSo03tku-nlfiSMXz2YNBs8ylwAJx2qrCLSIWAQvdC7iWmC9HNtRbo8siOxa7KOjEXaZRk24Q44Gz_dIzNpMm7mXR3gbwJJCHSjHax7CPBQBITC_w_0Yg/uw_3s_ful_hi.jpg?format=300w"
            ></img>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-center mb-12 px-5">
            <p className="text-center font-bold py-12 pb-5 text-white underline">
              Legal
            </p>
            <p className="text-center font-bold  text-white ">Privacy Policy</p>
            <p className="text-center font-bold  text-white ">
              Data access and use rights
            </p>
            <p className="text-center p-5">
              When texting 898211, standard msg & data rates may apply. Text
              STOP to opt-out. HELP for help. For end user privacy and terms and
              conditions{" "}
            </p>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-center mb-12 px-5">
            <form className="flex flex-col">
              <label
                htmlFor="lang"
                className="text-center font-bold py-12 pb-5 text-white underline"
              >
                Languages
              </label>
              <select>
                <option>Select Language</option>
                <option>English</option>
              </select>
            </form>
            <form className="flex flex-col">
              <label
                htmlFor="list"
                className="text-center font-bold py-12 pb-5 text-white "
              >
              Sign up for the email list
              </label>
              <input name="list" id="list" type="text" placeholder='Email Address' className='leading-10'></input>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
