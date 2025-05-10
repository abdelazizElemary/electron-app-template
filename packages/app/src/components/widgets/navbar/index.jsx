import React from "react";
import cn from "classnames";

const Navbar = ({ small = false }) => {
  return (
    <div
      className={cn(
        "w-ful bg-black flex flex-row justify-center items-center",
        small ? "h-10" : "h-[120px]"
      )}
    >
      <img src={"/logo.png"} alt="Logo" />
    </div>
  );
};

export default Navbar;
