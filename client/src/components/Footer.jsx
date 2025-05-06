import React from "react";
import { assets, footerLinks } from "../assets/assets";

const Footer = () => {

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <div className="flex items-center gap-4">
          <img className="h-10" src={assets.earthy_harvest_logo} alt="logo" /> <p className="font-bold text-2xl md:text-3xl text-[#89AC46]">Earthy <span className="text-[#E9762B]">Harvest</span></p>
          </div>
          <p className="max-w-[410px] mt-6">
            Discover the freshest groceries, pantry staples, and daily
            essentials—all in one place. From farm-fresh produce to your
            favorite snacks, we bring everything you need right to your
            doorstep.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:underline transition">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright {new Date().getFullYear()} © Md-Jane-Alam. All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
