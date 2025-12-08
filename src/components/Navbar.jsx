import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, theme, setTheme, handleSignoutUser } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(theme));
    document.documentElement.setAttribute(
      "data-theme",
      theme ? "dark" : "light"
    );
  }, [theme]);

  const links = (
    <>
      {user ? (
        <>
          <li>
            <NavLink to={"/"} className="btn-hover-primary text-[20px]">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard"}
              className="btn-hover-primary text-[20px]"
            >
              Dashboard
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to={"/login"} className="btn-hover-primary text-[20px]">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to={"/register"} className="btn-hover-primary text-[20px]">
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-5 z-50 mx-3">
      <div className="navbar bg-primary container mx-auto rounded-full mt-5 p-2 backdrop-blur-2xl text-white sticky">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className="btn-hover-primary">
            Ticket Hive
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user && (
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost hover:ring-offset-2 btn-circle avatar mx-1"
              >
                <div className="w-10 rounded-full hover:bg-black">
                  {user.photoURL ? (
                    <img src={user.photoURL} />
                  ) : (
                    <img
                      src="https://img.icons8.com/?size=100&id=fUUEbUbXhzOA&format=png&color=ffffff "
                      alt="profile avatar"
                      width={100}
                      height={100}
                      draggable={false}
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-secondary rounded-box z-1 mt-3.5 w-52 shadow"
              >
                <div className="flex justify-center items-center flex-col gap-3 p-2">
                  <label className="flex cursor-pointer gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <input
                      type="checkbox"
                      className="toggle bg-white checked:bg-black border-0 "
                      defaultChecked={theme}
                      onChange={(e) => {
                        setTheme(e.target.checked);
                      }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  </label>

                  <li>
                    <Link
                      to={"/profile"}
                      className="btn-hover-primary justify-between text-2xl"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      className="btn-hover-primary justify-between text-2xl"
                      onClick={() => {
                        handleSignoutUser();
                      }}
                    >
                      Log out
                    </a>
                  </li>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
