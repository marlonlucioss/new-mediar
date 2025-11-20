import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import {PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import MainLogo from "@/images-svg/main-logo.jsx";

export function Sidenav({ brandImg, brandName, routes, setPage }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-gray-100 shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } - fixed inset-0 z-50 h-[calc(100vh)] w-80 transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative`}
      >
        <Link to="/dashboard/home" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            <MainLogo style={{ display: 'inline' }} />
          </Typography>
        </Link>
        {localStorage.getItem('mediar') && JSON.parse(localStorage.getItem('mediar'))?.user?.role === 'empresa' && (
          <div className="m-8">
            <Button
              variant={"text"}
              color={'white'}
              className="flex items-center gap-4 px-4 capitalize w-56"
              fullWidth
              style={{backgroundColor: '#11afe4'}}
              onClick={() => setPage('step1')}
            >
              <PlusIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
              <Typography
                color="inherit"
                className="font-medium capitalize"
              >
                Nova mediação
              </Typography>
            </Button>
          </div>
        )}
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.filter(route => route.layout === 'dashboard').map(({ layout, title, pages }, key) => (
          <React.Fragment key={`route-${key}`}>
            {key > 0 && <hr/>}
            <ul className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {pages.filter(page => !page.hidden).map(({ icon, name, path }) => (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                        style={{color: isActive ? '#11afe4' : '#878787', background: 'none', boxShadow: 'none'}}
                        onClick={() => setPage(null)}
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;
