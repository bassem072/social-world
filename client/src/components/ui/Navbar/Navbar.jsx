import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faCircleUser,
  faClapperboard,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import profile from "../../../assets/images/profile_Pic.jpg";

export default function Navbar() {
  const location = useLocation().pathname;

  return (
    <div className="w-full h-14 bg-white shadow flex justify-between items-center px-[1%] fixed">
      <div className="w-[33%] flex items-center">
        <div className="w-10 h-10 mr-3 rounded-full bg-[rgb(0,98,224)] bg-gradient-to-b from-[#3fa5d1] to-[#0e2646] font-['Pacifico'] flex justify-center items-center font-black text-white">
          SW
        </div>
        <div className="h-10 hidden md:w-68 md:flex md:items-center rounded-3xl text-slate-500 bg-slate-200 font-normal">
          <div className="ml-2 mr-2 w-3">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            type="text"
            name="search"
            placeholder="Search Social World"
            className="bg-transparent md:w-[170px] text-black placeholder:text-slate-500 placeholder:text-sm focus:outline-none"
            autoComplete="off"
          />
        </div>
        <div className="h-10 w-10 md:hidden flex justify-center items-center rounded-full text-slate-500 bg-slate-200 font-normal">
          <div className="ml-2 mr-2 w-3">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>
      <div className="w-[30%] flex justify-between text-slate-500">
        <Link>
          <div
            className={
              "w-14 h-14 flex justify-center items-center " +
              (location === "/"
                ? "border-b-4 border-[rgb(0,98,224)] text-[rgb(0,98,224)]"
                : "")
            }
          >
            <FontAwesomeIcon icon={faHouse} size="xl" />
          </div>
        </Link>
        <Link>
          <div
            className={
              "w-14 h-14 flex justify-center items-center " +
              (location === "/profile/"
                ? "border-b-4 border-[rgb(0,98,224)] text-[rgb(0,98,224)]"
                : "")
            }
          >
            <FontAwesomeIcon icon={faCircleUser} size="xl" />
          </div>
        </Link>
        <Link>
          <div
            className={
              "w-14 h-14 flex justify-center items-center " +
              (location === "/watch/"
                ? "border-b-4 border-[rgb(0,98,224)] text-[rgb(0,98,224)]"
                : "")
            }
          >
            <FontAwesomeIcon icon={faClapperboard} size="xl" />
          </div>
        </Link>
        <Link>
          <div
            className={
              "w-14 h-14 flex justify-center items-center " +
              (location === "/watch/"
                ? "border-b-4 border-[rgb(0,98,224)] text-[rgb(0,98,224)]"
                : "")
            }
          >
            <FontAwesomeIcon icon={faFacebookMessenger} size="xl" />
          </div>
        </Link>
      </div>
      <div className="w-[33%] flex justify-end gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex justify-center items-center">
          <FontAwesomeIcon icon={faFacebookMessenger} size="md" />
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex justify-center items-center">
          <FontAwesomeIcon
            icon={faBell}
            size="md"
            className="-rotate-[20deg]"
          />
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={profile} alt="Logo" />
        </div>
      </div>
    </div>
  );
}
