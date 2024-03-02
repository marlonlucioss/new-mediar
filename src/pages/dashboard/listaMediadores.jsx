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

export function ListaMediadores({ setPage }) {
  return (
    <Card className='w-full' style={{flexFlow: 'wrap', boxShadow: 'none'}}>
      <Card className='w-4/6 mt-6 gap-9' style={{flexFlow: 'wrap', boxShadow: 'none'}}>
        { [1,2,3,4,5,6].map(() => (
          <Card onClick={() => {setPage('overview-mediadores')}} className="mb-3" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
            <CardBody>
              <img style={{display: 'inline'}} src="/img/andrea-lista.png" alt=""/>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-semibold"
                >
                  Andrea Maia
                </Typography>
                <Typography className="text-xs font-normal text-blue-gray-400">
                  Mediador de família
                </Typography>
                <Typography
                  variant="small"
                  className="flex items-center gap-1 font-normal text-blue-gray-600"
                  style={{placeContent: 'center'}}
                >
                  <StarIcon
                    strokeWidth={3}
                    className="h-3.5 w-3.5 text-yellow-300"
                  />
                  <strong>4.3</strong> <Typography className="text-xs font-normal text-blue-gray-400">
                  (130 avaliações)
                </Typography>
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
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
            <Button
              variant={"text"}
              color={'white'}
              className="flex items-center gap-4 px-4 capitalize"
              fullWidth
              style={{backgroundColor: '#11afe4', placeContent: 'center'}}
              onClick={() => setPage('schedule-mediador')}
            >
              <Typography
                color="inherit"
                className="font-medium capitalize"
              >
                Próxima etapa
              </Typography>
            </Button>
          </div>
        </CardBody>
      </Card>
    </Card>
  );
}

export default ListaMediadores;
