import React from "react";
import { XOutlined, LinkedinOutlined, GithubOutlined } from "@ant-design/icons";
const Socials = ({ bgColor, iconColor }) => {
  return (
    <>
      <div className="  flex justify-center slide-up my-5 ">
        <span className={` ${bgColor} m-0 p-1 rounded-xl w-72 text-center`}>
          <p className={`${iconColor} font-bold my-1`}>Connect With Me </p>

          <GithubOutlined
            className="mx-2 text-2xl "
            onClick={() =>
              (window.location.href = "https://github.com/RohanM-12")
            }
          />
          <LinkedinOutlined
            className="mx-2 text-2xl "
            onClick={() =>
              (window.location.href =
                "https://www.linkedin.com/in/rohan-m1212/")
            }
          />
          <XOutlined
            className="mx-2 text-2xl "
            onClick={() =>
              (window.location.href = "https://twitter.com/Rohan_M1212")
            }
          />
        </span>
      </div>
    </>
  );
};

export default Socials;
