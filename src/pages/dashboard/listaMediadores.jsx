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
    <Card style={{flexFlow: 'wrap'}}>
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
      <Card onClick={() => {setPage('overview-mediadores')}} className="mt-6 w-96 m-4" style={{cursor: 'pointer', display: 'inline-block', textAlign: 'center', height: '200px', width: '230px'}}>
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
    </Card>
  );
}

export default ListaMediadores;
