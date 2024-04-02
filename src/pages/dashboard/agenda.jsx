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
import React, {useState} from "react";
import {ComputerDesktopIcon, PlusIcon} from "@heroicons/react/24/outline/index.js";
import Pagination from "@/components/pagination.jsx";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {InformationCircleIcon} from "@heroicons/react/24/outline/index.js";
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

export function Agenda({ setPage }) {
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
  return (
    <Card className='w-full shadow-none'>
      <Card>
        <CardHeader className='m-0 shadow-none'>
          <div>
            {/* Code block starts */}
            <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4">
              <div>
                <h4 className="text-3xl font-normal leading-tight text-gray-800 dark:text-gray-100">Agenda de mediações</h4>
              </div>
              <div className="mt-6 md:mt-0 flex items-center">
                <Button
                  variant={"filled"}
                  className="flex items-center gap-4 px-4 capitalize mr-3"
                  style={{backgroundColor: '#fff', borderRadius: '100%', padding: '10px'}}
                >
                  <ChevronLeftIcon strokeWidth={2.5} className="h-5 w-5 text-gray-600" />
                </Button>
                <Typography
                  color="inherit"
                  className="font-medium"
                >
                  Nov 15, 2023
                </Typography>
                <Typography
                  color="inherit"
                  className="font-light"
                >
                  Hoje
                </Typography>
                <Button
                  variant={"filled"}
                  className="flex items-center gap-4 px-4 capitalize ml-3"
                  style={{backgroundColor: '#fff', borderRadius: '100%', padding: '10px'}}
                >
                  <ChevronRightIcon strokeWidth={2.5} className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
              <div className="mt-6 md:mt-0">
                <Button
                  variant={"text"}
                  color={'white'}
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                  style={{backgroundColor: '#11afe4'}}
                  onClick={() => setPage('lista-mediadores')}
                >
                  <PlusIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Nova mediação
                  </Typography>
                </Button>
              </div>
              {/* Code block ends */}
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 p-6 pt-0">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            // headerToolbar={{
            //   left: "prev,next today",
            //   center: "title",
            //   right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            // }}
            headerToolbar={{
              left: "",
              center: "",
              right: " ",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2024-03-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2024-03-28",
              },
            ]}
          />
        </CardBody>
      </Card>
    </Card>
  );
}

export default Agenda;
