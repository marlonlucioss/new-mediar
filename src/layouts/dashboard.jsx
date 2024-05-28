import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import {JSX, useState} from "react";
import ListaMediadores from "@/pages/dashboard/listaMediadores.jsx";
import OverviewMediador from "@/pages/dashboard/overviewMediador.jsx";
import ScheduleMediador from "@/pages/dashboard/scheduleMediador.jsx";
import SuccessScheduling from "@/pages/dashboard/successScheduling.jsx";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [page, setPage] = useState(null);
  const [data, setData] = useState({});

  return (
    <div className="min-h-screen bg-white">
      <Sidenav
        setPage={setPage}
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        { !page && (
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element }) => (
                  <Route exact path={path} element={element} />
                ))
            )}
          </Routes>
        )}
        { page === 'lista-mediadores' && (
          <ListaMediadores setPage={setPage} setData={setData} data={data} />
        )}
        { page === 'overview-mediadores' && (
          <OverviewMediador setPage={setPage} data={data}  />
        )}
        { page === 'schedule-mediador' && (
          <ScheduleMediador setPage={setPage} setData={setData} data={data} />
        )}
        { page === 'sucesso-agendamento' && (
          <SuccessScheduling setPage={setPage} />
        )}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
