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
  Button, Popover, PopoverHandler, PopoverContent,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import {platformSettingsData, conversationsData, projectsData, ordersOverviewData, authorsTableData} from "@/data";
import {StarIcon} from "@heroicons/react/24/solid/index.js";
import React, {useEffect, useState} from "react";
import {ComputerDesktopIcon, PlusIcon} from "@heroicons/react/24/outline/index.js";
import Pagination from "@/components/pagination.jsx";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {InformationCircleIcon} from "@heroicons/react/24/outline/index.js";
import PerfilHeader from "@/components/perfilHeader.jsx";
import PerfilAbout from "@/components/perfilAbout.jsx";
import PerfilGeneralInfo from "@/components/perfilGeneralInfo.jsx";
import PerfilEndereco from "@/components/perfilEndereco.jsx";
import PerfilContato from "@/components/perfilContato.jsx";
import PerfilSenha from "@/components/perfilSenha.jsx";
import axios from "axios";
const events = [
  { title: 'Meeting', start: new Date() }
]
const handleDateClick = (selected) => {
  const title = prompt("Please enter a new title for your event");
  const calendarApi = selected.view.calendar;
  calendarApi.unselect();

  if (title) {
    calendarApi.addEvent({
      id: `${selected.dateStr}-${title}`,
      title,
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
    });
  }
};

const handleEventClick = (selected) => {
  if (
    window.confirm(
      `Are you sure you want to delete the event '${selected.event.title}'`
    )
  ) {
    selected.event.remove();
  }
};

export function Perfil({ setPage }) {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('mediar')).user)
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["gray", "green", "orange", "red"];

  const updateUserSession = (user) => {
    let userSession = JSON.parse(localStorage.getItem('mediar'))
    userSession = {...userSession, user}
    localStorage.setItem("mediar",JSON.stringify(userSession))
  }

  useEffect(() => {
    axios.put('http://localhost:3001/users', data, {
      headers: {
        authorization: 'bearer ' + JSON.parse(localStorage.getItem('mediar')).token
      }
    })
      .then(function (response) {
        // handle success
        updateUserSession(response.data)
        console.log(response)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [data]);

  return (
    <Card className='w-full shadow-none'>
      <Card>
        <CardHeader className='m-0 shadow-none'>
          <div>
            {/* Code block starts */}
            <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4">
              <div>
                <Typography className="text-3xl font-bold leading-tight text-gray-800 dark:text-gray-100">Meu 360</Typography>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 p-6 pt-0">
          <PerfilHeader />
          <PerfilAbout data={data} setData={setData} />
          <PerfilGeneralInfo />
          <PerfilEndereco />
          <PerfilContato />
          <PerfilSenha />
        </CardBody>
      </Card>
    </Card>
  );
}

export default Perfil;
