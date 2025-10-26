import {useLocation, Link, useNavigate} from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon, TrashIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/config.js";

export function DashboardNavbar() {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [avatarSrc, setAvatarSrc] = useState('/img/image.png');
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const mediarData = JSON.parse(localStorage.getItem('mediar'));
        if (mediarData && mediarData.user && mediarData.user._id && mediarData.token) {
          const userId = mediarData.user.id;
          const token = mediarData.token;
          // Assuming API_URL is globally defined or imported
          // You might need to adjust the endpoint based on your API structure
          const response = await axios.get(`${API_URL}/users/profile-image`, {
            headers: {
              authorization: `bearer ${token}`,
            },
          });

          if (response.data) {
            setAvatarSrc(response.data.profileImageFile);
          }
        } else {
          console.warn('User data or token not found in localStorage for avatar.');
        }
      } catch (error) {
        console.error('Failed to fetch avatar:', error);
        // Keep default avatar on error
      }
    };

    fetchAvatar();
  }, []);

  const callLogout = () => {
    localStorage.removeItem('mediar')
    setTimeout(() => navigate("/"), 1000)
  }

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`transition-all border-blue-gray-50 border-b-0 pb-0 ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1 pb-6"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          {/*<Breadcrumbs*/}
          {/*  className={`bg-transparent p-0 transition-all ${*/}
          {/*    fixedNavbar ? "mt-1" : ""*/}
          {/*  }`}*/}
          {/*>*/}
          {/*  <Link to={`/${layout}`}>*/}
          {/*    <Typography*/}
          {/*      variant="small"*/}
          {/*      color="blue-gray"*/}
          {/*      className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"*/}
          {/*    >*/}
          {/*      {layout}*/}
          {/*    </Typography>*/}
          {/*  </Link>*/}
          {/*  <Typography*/}
          {/*    variant="small"*/}
          {/*    color="blue-gray"*/}
          {/*    className="font-normal"*/}
          {/*  >*/}
          {/*    {page}*/}
          {/*  </Typography>*/}
          {/*</Breadcrumbs>*/}
          <Typography variant="h3" color="blue-gray">
            Olá {localStorage.getItem('mediar') && JSON.parse(localStorage.getItem('mediar'))?.user?.fullname || 'Usuário'}
            {/*{page}*/}
          </Typography>
          <Typography variant="small" color="gray" className='normal-case'>
            Você está na plataforma Mediar360. Tenha um excelente dia.
          </Typography>
        </div>
        <div className="flex items-center">
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray" className='Menu-IconButton-Avatar'>
                <Avatar
                  src={avatarSrc || '/img/image.png'}
                  alt='Andrea Maia'
                  variant="rounded"
                  className="menu-avatar"
                  size='sm'
                />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <button onClick={callLogout}
                  className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20 w-full justify-between"
                  type="button">
                  Sair
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                       className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                  </svg>
                </button>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
