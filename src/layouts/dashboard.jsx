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
import {JSX, useEffect, useState} from "react";
import ListaMediadores from "@/pages/dashboard/listaMediadores.jsx";
import OverviewMediador from "@/pages/dashboard/overviewMediador.jsx";
import ScheduleMediador from "@/pages/dashboard/scheduleMediador.jsx";
import SuccessScheduling from "@/pages/dashboard/successScheduling.jsx";
import {Step1} from "@/pages/dashboard/form-nova-mediacao/step1.jsx";
import {Step2} from "@/pages/dashboard/form-nova-mediacao/step2.jsx";
import {Step3} from "@/pages/dashboard/form-nova-mediacao/step3.jsx";
import axios from "axios";
import {API_URL} from "@/config.js";
import SuccessSchedulingCliente from "@/pages/dashboard/successSchedulingCliente.jsx";
import Step4Cliente from "@/pages/dashboard/form-finalizar-mediacao/step4.jsx";
import Step3Cliente from "@/pages/dashboard/form-finalizar-mediacao/step3.jsx";
import {Step2Cliente} from "@/pages/dashboard/form-finalizar-mediacao/step2.jsx";
import {Step1Cliente} from "@/pages/dashboard/form-finalizar-mediacao/step1.jsx";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const  callCreateConciliation = () => {
    const token = JSON.parse(localStorage.getItem('mediar')).token
    setLoading(true)
    axios.post(API_URL + '/conciliations', {
      ...data,
      mediador: '',
      mediando: data.nome_cliente,
      criadoPor: JSON.parse(localStorage.getItem('mediar')).user,
      horario: '',
      tipoMediacao: '',
      status: 'aguardando',
      plataforma: 'web',
      dataMediacao: ``,
    }, {
      headers: {
        authorization: 'bearer ' + token
      }
    })
      .then(function (response) {
        // handle success
        setPage('step4')
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

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
                  <Route exact path={path} element={element} setPage={setPage} />
                ))
            )}
          </Routes>
        )}
        { page === 'step1' && (
          <Step1 setPage={setPage} setData={setData} requestData={data} />
          // <ListaMediadores setPage={setPage} setData={setData} data={data} />
        )}
        { page === 'step2' && (
          <Step2 setPage={setPage} setData={setData} requestData={data} />
          // <OverviewMediador setPage={setPage} data={data}  />
        )}
        { page === 'step3' && (
          <Step3 setPage={setPage} setData={setData} requestData={data} callCreateConciliation={callCreateConciliation} loading={loading} />
        )}
        { page === 'step4' && (
          <SuccessScheduling setPage={setPage} setData={setData} requestData={data} />
        )}
        {/*{ page === 'step1Cliente' && (*/}
        {/*  <Step1Cliente setPage={setPage} setData={setData} requestData={data} />*/}
        {/*)}*/}
        {/*{ page === 'step2Cliente' && (*/}
        {/*  <Step2Cliente setPage={setPage} setData={setData} requestData={data} />*/}
        {/*)}*/}
        {/*{ page === 'step3Cliente' && (*/}
        {/*  <Step3Cliente setPage={setPage} setData={setData} requestData={data} callCreateConciliation={callCreateConciliation} loading={loading} />*/}
        {/*)}*/}
        {/*{ page === 'step4Cliente' && (*/}
        {/*  <Step4Cliente setPage={setPage} setData={setData} requestData={data} callCreateConciliation={callCreateConciliation} loading={loading} />*/}
        {/*)}*/}
        {/*{ page === 'step5Cliente' && (*/}
        {/*  <SuccessSchedulingCliente setPage={setPage} setData={setData} requestData={data} />*/}
        {/*)}*/}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
