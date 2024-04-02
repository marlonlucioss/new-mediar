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
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import {platformSettingsData, conversationsData, projectsData, ordersOverviewData} from "@/data";
import {StarIcon} from "@heroicons/react/24/solid/index.js";
import React from "react";
import SuccessIcon from "@/images-svg/success-mediation.jsx";
import ResumoMediador from "@/widgets/mediar/ResumoMediador.jsx";

export function SuccessSchedule({ setPage }) {
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
                12:30 - 14 de fevereiro - Terça-feira
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
                    Andrea Maia
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    Mediação familiar
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
              Agora que você já escolheu o seu mediador, basta prosseguir para o agendamento da mediação.
            </Typography>
          </div>
        </CardBody>
      </Card>
    </Card>
  );
}

export default SuccessSchedule;
