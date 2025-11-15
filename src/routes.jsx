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
import { SignIn, SignUp, PasswordRecovery, PasswordReset } from "@/pages/auth";
import {Calendario} from "@/pages/dashboard/calendario.jsx";
import ProximasMediacoes from "@/pages/dashboard/proximas-mediacoes.jsx";
import Agenda from "@/pages/dashboard/agenda.jsx";
import Perfil from "@/pages/dashboard/perfil.jsx";
import {Step1Cliente} from "@/pages/dashboard/form-finalizar-mediacao/step1.jsx";
import {Step2Cliente} from "@/pages/dashboard/form-finalizar-mediacao/step2.jsx";
import Step3Cliente from "@/pages/dashboard/form-finalizar-mediacao/step3.jsx";
import Step4Cliente from "@/pages/dashboard/form-finalizar-mediacao/step4.jsx";
import {Step5Cliente} from "@/pages/dashboard/form-finalizar-mediacao/step5.jsx";
import SuccessSchedulingCliente from "@/pages/dashboard/successSchedulingCliente.jsx";

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
      {
        path: "/cliente/step1",
        element: <Step1Cliente />,
        hidden: true,
      },
      {
        path: "/cliente/step2",
        element: <Step2Cliente />,
        hidden: true,
      },
      {
        path: "/cliente/step3",
        element: <Step3Cliente />,
        hidden: true,
      },
      {
        path: "/cliente/step4",
        element: <Step4Cliente />,
        hidden: true,
      },
      {
        path: "/cliente/step5",
        element: <Step5Cliente />,
        hidden: true,
      },
      {
        path: "/cliente/success",
        element: <SuccessSchedulingCliente />,
        hidden: true,
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
        icon: <ServerStackIcon {...icon} />,
        name: "Entrar",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Cadastrar",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        name: "Recuperar Senha",
        path: "/password-recovery",
        element: <PasswordRecovery />,
        hidden: true,
      },
      {
        name: "Redefinir Senha",
        path: "/password-reset",
        element: <PasswordReset />,
        hidden: true,
      },
    ],
  },
];

export default routes;
