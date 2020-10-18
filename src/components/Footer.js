import React from "react";
// import '../Assets/Footer.scss';

const Footer = () => {
  return (
    <footer className="">
      <div
        className=" w-full "
        style={{ minHeight: "400px", backgroundColor: "#acce62" }}
      >
        <h2 className="py-12 mx-16 xl:mx-64 underline text-4xl font-bold">
          About Us
        </h2>
        <p className="mx-16 xl:mx-64 text-xl">
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
        <h2 className="py-12 mx-16 xl:mx-64 underline text-4xl font-bold">
          Our Data
        </h2>
        <p className="mx-16 xl:mx-64 text-xl">
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
          <p className="text-center font-bold py-12">SIGN UP FOR OUR NEWSLETTER</p>
          <button className="block mx-auto border rounded-full py-4 px-8 bg-white hover:bg-gray-200">
            <span className="text-orange-600 font-medium">Sign Up</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
