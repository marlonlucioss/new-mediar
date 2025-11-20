import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton, Dialog, DialogHeader, DialogBody, DialogFooter, Button as MTButton, Typography } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import {useEffect, useState} from "react";
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
  const navigate = useNavigate();
  const location = useLocation();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [successData, setSuccessData] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const mediarData = localStorage.getItem('mediar');
    if (!mediarData) {
      // Don't redirect if user is on password reset page
      if (!location.pathname.includes('/auth/password-reset')) {
        navigate('/auth/sign-in');
      }
      return;
    }
  }, []);

  const callCreateConciliation = async () => {
    const token = JSON.parse(localStorage.getItem('mediar')).token
    setLoading(true)
    const {
      valor_causa,
      valor_proposta,
      validade_proposta,
      nome_cliente,
      telefone_cliente,
      cpf_cliente,
      // Capture other fields from data (like 'proposta' text, 'observacoes', etc.)
      ...restOfData 
    } = data;

    console.log('restOfData', restOfData)
    console.log('data', data)

    const payloadToSend = {
      ...restOfData, // Send other relevant parts of `data` collected from previous steps
      valor_causa: valor_causa ? String(valor_causa).replace(/R\$\s*/g, '').replace(/\./g, '').replace(',', '.') : '0.00',
      valor_proposta: valor_proposta ? String(valor_proposta).replace(/R\$\s*/g, '').replace(/\./g, '').replace(',', '.') : '0.00',
      // Format validade_proposta to YYYY-MM-DD string; ensure it's a Date object first
      validade_proposta: validade_proposta ? new Date(validade_proposta).toISOString().split('T')[0] : null,
      telefone_cliente: telefone_cliente ? String(telefone_cliente).replace(/[^0-9]/g, '') : null,
      cpf_cliente: cpf_cliente ? String(cpf_cliente).replace(/[^0-9]/g, '') : null,
      
      // Static or derived fields for the conciliation payload
      mediador: '', // Placeholder or to be assigned by backend/later logic
      mediando: nome_cliente, // From data collected in earlier steps
      nome_cliente, // From data collected in earlier steps
      criadoPor: JSON.parse(localStorage.getItem('mediar')).user, // User who initiated
      horario: '', // Placeholder for the actual mediation time slot
      tipoMediacao: '', // Placeholder for the type of mediation
      status: 'aguardando', // Default status for a new conciliation
      plataforma: 'web', // Indicates creation from the web platform
      dataMediacao: ``, // Placeholder for the actual date of mediation (distinct from proposal validity)
    };

    try {
      const response = await axios.post(API_URL + '/conciliations', payloadToSend, {
        headers: {
          authorization: 'bearer ' + token
        }
      });
      // handle success
      console.log('POST response received:', response.data);
      console.log('Current data before merge:', data);
      // Store the complete response data for the success page
      const newData = { ...data, ...response.data };
      console.log('Setting success data to:', newData);
      console.log('About to setSuccessData and setPage to step4');
      setSuccessData(newData);
      console.log('Success data set, now setting page to step4');
      setPage('step4');
      console.log('Page set to step4');
      setLoading(false);
      return response;
    } catch (error) {
      // handle error
      let errorMsg = "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";
      
      // Check if the error response has a specific error message pattern
      if (error.response && error.response.data && error.response.data.error) {
        errorMsg = error.response.data.error;
      }
      
      setErrorMessage(errorMsg);
      setIsErrorModalOpen(true);
      setLoading(false);
      throw error;
    }
  }

  const handleErrorModalClose = () => setIsErrorModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Dialog open={isErrorModalOpen} handler={handleErrorModalClose}>
        <DialogHeader>Erro na Solicitação</DialogHeader>
        <DialogBody divider>
          {errorMessage}
        </DialogBody>
        <DialogFooter>
          <MTButton variant="gradient" color="red" onClick={handleErrorModalClose}>
            <span>Fechar</span>
          </MTButton>
        </DialogFooter>
      </Dialog>
      <Sidenav
        setPage={setPage}
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        {/* <Configurator /> */}
        {/* <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
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
          <>
            {console.log('Rendering SuccessScheduling with successData:', successData)}
            {console.log('SuccessData exists:', !!successData)}
            {console.log('SuccessData keys length:', successData ? Object.keys(successData).length : 0)}
            <SuccessScheduling setPage={setPage} setData={setData} requestData={successData} loading={loading} />
          </>
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
