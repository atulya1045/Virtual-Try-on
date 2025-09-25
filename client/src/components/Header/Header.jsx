import React from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline, IoPersonOutline } from "react-icons/io5";
import { FiInfo } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/auth/auth";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <header id="header" className="border-b-2 sticky">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-1">
          <p className="text-slate-500 select-none text-md">
            <i>Welcome to the HueTell Store!</i>
          </p>
          <div className="flex justify-center gap-6">
            <Link to="">
              <div className="text-slate-500 cursor-pointer flex justify-center items-center gap-2">
                <IoLocationOutline size={20} className="inline" />
                <p className="text-sm">Contact</p>
              </div>
            </Link>
            <Link to="">
              <div className="text-slate-500 cursor-pointer flex justify-center items-center gap-2">
                <FiInfo size={20} className="inline" />
                <p className="text-sm">Need Help</p>
              </div>
            </Link>
            <div className="text-slate-500 cursor-pointer flex justify-center items-center gap-2">
              <IoPersonOutline size={20} className="inline" />
              {!user ? (
                <>
                  <Link to="/login">
                    <p className="text-sm">Sign In /</p>
                  </Link>
                  <Link to="/signup">
                    <p className="text-sm">Register</p>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={`/profile/${user._id}`}>
                    <p className="text-sm mr-4">{user.name}</p>
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(setLogout());
                      window.location.reload();
                    }}
                  >
                    <p className="text-sm">Logout</p>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
