import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import { useMediacaoData } from "@/hooks/useMediacaoData";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import {platformSettingsData, conversationsData, projectsData, ordersOverviewData} from "@/data";
import {StarIcon} from "@heroicons/react/24/solid/index.js";
import React, {useEffect} from "react";
import SuccessIcon from "@/images-svg/success-mediation.jsx";
import ResumoMediador from "@/widgets/mediar/ResumoMediador.jsx";
import axios from "axios";

export function SuccessSchedulingCliente() {
  const { data: requestData } = useMediacaoData();

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "Data não especificada";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      weekday: 'long'
    });
  }

  useEffect(() => {
    // Auto-navigate to proximas-mediacoes after 2 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard/proximas-mediacoes");
    }, 2000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [navigate])


  return (
    <Card style={{flexFlow: 'wrap', boxShadow: 'none', }}>
      <Card className='w-4/6' style={{boxShadow: 'none'}}>
        <CardBody className="p-0 pt-20 pr-4 w-full" style={{ alignSelf: 'center', textAlign: 'center'}}>
          <div className="mb-3 flex items-center justify-between flex-wrap gap-6" style={{    placeContent: 'center'}}>
            <div className="flex items-center gap-6">
              <SuccessIcon />
            </div>
          </div>
          <div className="mb-3" style={{placeContent: 'center'}}>
            <ProfileInfoCard
              title="Parabéns!"
              description="Sua mediação foi agendada para:"
              style={{placeContent: 'center'}}
            />
            <div className="items-center gap-6">
              <Typography variant="h6" color="#828282">
                {formatDate(requestData?.dataMediacao)} - {requestData?.horario}
              </Typography>
            </div>
          </div>
          <div className="flex-wrap items-center gap-6 justify-between w-full" style={{
            backgroundColor: '#F9F9F9',
            borderRadius: '5px',
            border: '1px solid #DCDFE3'
          }} >
            <Typography variant="h6" color="white" style={{
              backgroundColor: '#878787',
              borderRadius: '5px'
            }} className="mb-4 p-2 font-normal">
              MEDIADOR ESCOLHIDO
            </Typography>
            <div className="flex justify-between p-2">
              <div className='flex'>
                <Avatar
                  src="/img/andrea-lista.png"
                  alt="bruce-mars"
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40 w-28 h-28"
                  style={{borderRadius: '100%'}}
                />
                <div className="pt-8 pl-3">
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {requestData?.mediador?.name || "Nome do Mediador"}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {requestData?.mediador?.email || "Mediação familiar"}
                  </Typography>
                </div>
              </div>
              <ResumoMediador />
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className='w-2/6'>
        <CardBody className="p-4">
          <div className="m-4">
            <Typography variant="h3" color="blue-gray" className="mb-7">
              Assistente Virtual
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600 mb-7"
            >
              Sua mediação foi agendada com sucesso.
            </Typography>
            <Button
              variant={"text"}
              color={'white'}
              className="flex items-center gap-4 px-4"
              fullWidth
              style={{backgroundColor: '#11afe4', placeContent: 'center'}}
              onClick={() => setPage(null)}
            >
              <Typography
                color="inherit"
                className="font-medium none"
                style={{textTransform: 'none'}}
              >
                Finalizar e ver mediações
              </Typography>
            </Button>
          </div>
        </CardBody>
      </Card>
    </Card>
  );
}

export default SuccessSchedulingCliente;
