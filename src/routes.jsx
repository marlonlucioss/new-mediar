import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  FolderOpenIcon,
  UserIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftIcon,
  CameraIcon,
  CogIcon, QueueListIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import {Calendario} from "@/pages/dashboard/calendario.jsx";
import ProximasMediacoes from "@/pages/dashboard/proximas-mediacoes.jsx";
import Agenda from "@/pages/dashboard/agenda.jsx";
import Perfil from "@/pages/dashboard/perfil.jsx";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Meu 360",
        path: "/profile",
        element: <Perfil />,
      },
      {
        icon: <QueueListIcon {...icon} />,
        name: "Minhas mediações",
        path: "/proximas-mediacoes",
        element: <ProximasMediacoes />,
      },
      // {
      //   icon: <UserIcon {...icon} />,
      //   name: "Clientes",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <BuildingOfficeIcon {...icon} />,
      //   name: "Empresas",
      //   path: "/agendamento",
      //   element: <Calendario />,
      // },
      // {
      //   icon: <CurrencyDollarIcon {...icon} />,
      //   name: "Financeiro",
      //   path: "/agendamento",
      //   element: <Calendario />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "Relatório",
      //   path: "/agendamento",
      //   element: <Calendario />,
      // },
      // {
      //   icon: <ChatBubbleLeftIcon {...icon} />,
      //   name: "Atendimento",
      //   path: "/agendamento",
      //   element: <Calendario />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "",
    layout: "auth",
    pages: [
      {
        icon: <CameraIcon {...icon} />,
        name: "Sala de reunião",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Arquivos",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <CogIcon {...icon} />,
        name: "Configurações",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  // {
  //   title: "",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "Entrar",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "Cadastrar",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
