import React from "react";
import { assets, features } from "../assets/assets";
import { FaHeart } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { SiCodefresh } from "react-icons/si";
import { MdOutlineElectricBike } from "react-icons/md";

const icons = [
  <MdOutlineElectricBike />,
  <SiCodefresh />,
  <ImPriceTags />,
  <FaHeart />,
];

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block rounded-xl"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full  md:hidden rounded-xl"
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
            Why We Are the Best?
          </h1>
          <div className="flex flex-col">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <div className="bg-primary p-2.5 rounded-lg text-white text-lg">
                {icons[index]}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-black/50 text-xs md:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
