import React, {useState} from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress, Alert, Button,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {MessageCard, StatisticsCard} from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData, conversationsData,
} from "@/data";
import {CheckCircleIcon, ClockIcon, StarIcon} from "@heroicons/react/24/solid";
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
export function Home() {
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
  const alerts = ["gray", "green", "orange", "red", "green"];
  return (
    <div className="mt-12">
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6 flex"
            style={{justifyContent: 'space-between'}}
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Perfil do Mediador
            </Typography>
            <Button
              variant={"text"}
              className="flex items-center gap-4 px-4 capitalize p-0"
              style={{height: '25px'}}
            >
              <Typography
                color="inherit"
                className="font-medium capitalize"
              >
                Editar
              </Typography>
            </Button>
          </CardHeader>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6 flex"
            style={{justifyContent: 'space-between'}}
          >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar
                src={'/img/andrea.svg'}
                alt='Andrea Maia'
                variant="rounded"
                className=""
              />
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
            </div>
            {/*{action}*/}
          </div>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3 mr-7" style={{display: 'inline-grid', width: '40%'}}>
                  {/*<div*/}
                  {/*  className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${*/}
                  {/*    key === ordersOverviewData.length - 1*/}
                  {/*      ? "after:h-0"*/}
                  {/*      : "after:h-4/6"*/}
                  {/*  }`}*/}
                  {/*>*/}
                  {/*  {React.createElement(icon, {*/}
                  {/*    className: `!w-5 !h-5 ${color}`,*/}
                  {/*  })}*/}
                  {/*</div>*/}
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Próximas Mediações
            </Typography>
            {/*<Typography*/}
            {/*  variant="small"*/}
            {/*  className="flex items-center gap-1 font-normal text-blue-gray-600"*/}
            {/*>*/}
            {/*  <ArrowUpIcon*/}
            {/*    strokeWidth={3}*/}
            {/*    className="h-3.5 w-3.5 text-green-500"*/}
            {/*  />*/}
            {/*  <strong>24%</strong> this month*/}
            {/*</Typography>*/}
          </CardHeader>
          <CardBody className="pt-0">
            <ul className="flex flex-col gap-6">
              {conversationsData.map((props) => (
                <MessageCard
                  key={props.name}
                  {...props}
                />
              ))}
            </ul>
          </CardBody>
        </Card>
        <Card className="" style={{background: 'none', boxShadow: 'none'}}>
          <Card className="mb-6" style={{backgroundColor: '#DBF5D2'}}>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                11
              </Typography>
              <Typography color="blue-gray" className="font-bold text-blue-gray-800" textGradient>
                Mediações Realizadas
              </Typography>
              <Typography color="blue-gray" className="font-medium text-xs" textGradient>
                Novembro 2023
              </Typography>
            </CardBody>
          </Card>
          <Card className="mb-6" style={{backgroundColor: '#FFF7D9'}}>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                8
              </Typography>
              <Typography color="blue-gray" className="font-bold text-blue-gray-800" textGradient>
                Mediações Agendadas
              </Typography>
              <Typography color="blue-gray" className="font-medium text-xs" textGradient>
                Novembro 2023
              </Typography>
            </CardBody>
          </Card>
          <Card className="" style={{backgroundColor: '#FFEDED'}}>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                3
              </Typography>
              <Typography color="blue-gray" className="font-bold text-blue-gray-800" textGradient>
                Mediações Canceladas
              </Typography>
              <Typography color="blue-gray" className="font-medium text-xs" textGradient>
                Novembro 2023
              </Typography>
            </CardBody>
          </Card>
        </Card>
      </div>
      {/*<div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">*/}
      {/*  {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (*/}
      {/*    <StatisticsCard*/}
      {/*      key={title}*/}
      {/*      {...rest}*/}
      {/*      title={title}*/}
      {/*      icon={React.createElement(icon, {*/}
      {/*        className: "w-6 h-6 text-white",*/}
      {/*      })}*/}
      {/*      footer={*/}
      {/*        <Typography className="font-normal text-blue-gray-600">*/}
      {/*          <strong className={footer.color}>{footer.value}</strong>*/}
      {/*          &nbsp;{footer.label}*/}
      {/*        </Typography>*/}
      {/*      }*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        {statisticsChartsData.map((props,index) => {
          if(index !== 1) return
          return (
            <StatisticsChart
              key={props.title}
              title={'Temperatura'}
              {...props}
              // footer={
              //   <Typography
              //     variant="small"
              //     className="flex items-center font-normal text-blue-gray-600"
              //   >
              //     <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
              //     &nbsp;{props.footer}
              //   </Typography>
              // }
            />
          )})}
        <Card style={{background: 'none', boxShadow: 'none'}}>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6 flex"
            style={{justifyContent: 'space-between'}}
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Avisos
            </Typography>
            <Button
              variant={"text"}
              className="flex items-center gap-4 px-4 capitalize p-0"
              style={{height: '25px'}}
            >
              <Typography
                color="inherit"
                className="font-medium capitalize"
              >
                Ver todos
              </Typography>
            </Button>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div className='p-2 pl-3' style={{background: '#F9F9F9', width: '100%', borderRadius: '8px'}}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>
      {/*<div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">*/}
      {/*  <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">*/}
      {/*    <CardHeader*/}
      {/*      floated={false}*/}
      {/*      shadow={false}*/}
      {/*      color="transparent"*/}
      {/*      className="m-0 flex items-center justify-between p-6"*/}
      {/*    >*/}
      {/*      <div>*/}
      {/*        <Typography variant="h6" color="blue-gray" className="mb-1">*/}
      {/*          Projects*/}
      {/*        </Typography>*/}
      {/*        <Typography*/}
      {/*          variant="small"*/}
      {/*          className="flex items-center gap-1 font-normal text-blue-gray-600"*/}
      {/*        >*/}
      {/*          <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />*/}
      {/*          <strong>30 done</strong> this month*/}
      {/*        </Typography>*/}
      {/*      </div>*/}
      {/*      <Menu placement="left-start">*/}
      {/*        <MenuHandler>*/}
      {/*          <IconButton size="sm" variant="text" color="blue-gray">*/}
      {/*            <EllipsisVerticalIcon*/}
      {/*              strokeWidth={3}*/}
      {/*              fill="currenColor"*/}
      {/*              className="h-6 w-6"*/}
      {/*            />*/}
      {/*          </IconButton>*/}
      {/*        </MenuHandler>*/}
      {/*        <MenuList>*/}
      {/*          <MenuItem>Action</MenuItem>*/}
      {/*          <MenuItem>Another Action</MenuItem>*/}
      {/*          <MenuItem>Something else here</MenuItem>*/}
      {/*        </MenuList>*/}
      {/*      </Menu>*/}
      {/*    </CardHeader>*/}
      {/*    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">*/}
      {/*      <table className="w-full min-w-[640px] table-auto">*/}
      {/*        <thead>*/}
      {/*          <tr>*/}
      {/*            {["companies", "members", "budget", "completion"].map(*/}
      {/*              (el) => (*/}
      {/*                <th*/}
      {/*                  key={el}*/}
      {/*                  className="border-b border-blue-gray-50 py-3 px-6 text-left"*/}
      {/*                >*/}
      {/*                  <Typography*/}
      {/*                    variant="small"*/}
      {/*                    className="text-[11px] font-medium uppercase text-blue-gray-400"*/}
      {/*                  >*/}
      {/*                    {el}*/}
      {/*                  </Typography>*/}
      {/*                </th>*/}
      {/*              )*/}
      {/*            )}*/}
      {/*          </tr>*/}
      {/*        </thead>*/}
      {/*        <tbody>*/}
      {/*          {projectsTableData.map(*/}
      {/*            ({ img, name, members, budget, completion }, key) => {*/}
      {/*              const className = `py-3 px-5 ${*/}
      {/*                key === projectsTableData.length - 1*/}
      {/*                  ? ""*/}
      {/*                  : "border-b border-blue-gray-50"*/}
      {/*              }`;*/}

      {/*              return (*/}
      {/*                <tr key={name}>*/}
      {/*                  <td className={className}>*/}
      {/*                    <div className="flex items-center gap-4">*/}
      {/*                      <Avatar src={img} alt={name} size="sm" />*/}
      {/*                      <Typography*/}
      {/*                        variant="small"*/}
      {/*                        color="blue-gray"*/}
      {/*                        className="font-bold"*/}
      {/*                      >*/}
      {/*                        {name}*/}
      {/*                      </Typography>*/}
      {/*                    </div>*/}
      {/*                  </td>*/}
      {/*                  <td className={className}>*/}
      {/*                    {members.map(({ img, name }, key) => (*/}
      {/*                      <Tooltip key={name} content={name}>*/}
      {/*                        <Avatar*/}
      {/*                          src={img}*/}
      {/*                          alt={name}*/}
      {/*                          size="xs"*/}
      {/*                          variant="circular"*/}
      {/*                          className={`cursor-pointer border-2 border-white ${*/}
      {/*                            key === 0 ? "" : "-ml-2.5"*/}
      {/*                          }`}*/}
      {/*                        />*/}
      {/*                      </Tooltip>*/}
      {/*                    ))}*/}
      {/*                  </td>*/}
      {/*                  <td className={className}>*/}
      {/*                    <Typography*/}
      {/*                      variant="small"*/}
      {/*                      className="text-xs font-medium text-blue-gray-600"*/}
      {/*                    >*/}
      {/*                      {budget}*/}
      {/*                    </Typography>*/}
      {/*                  </td>*/}
      {/*                  <td className={className}>*/}
      {/*                    <div className="w-10/12">*/}
      {/*                      <Typography*/}
      {/*                        variant="small"*/}
      {/*                        className="mb-1 block text-xs font-medium text-blue-gray-600"*/}
      {/*                      >*/}
      {/*                        {completion}%*/}
      {/*                      </Typography>*/}
      {/*                      <Progress*/}
      {/*                        value={completion}*/}
      {/*                        variant="gradient"*/}
      {/*                        color={completion === 100 ? "green" : "blue"}*/}
      {/*                        className="h-1"*/}
      {/*                      />*/}
      {/*                    </div>*/}
      {/*                  </td>*/}
      {/*                </tr>*/}
      {/*              );*/}
      {/*            }*/}
      {/*          )}*/}
      {/*        </tbody>*/}
      {/*      </table>*/}
      {/*    </CardBody>*/}
      {/*  </Card>*/}
      {/*  <Card className="border border-blue-gray-100 shadow-sm">*/}
      {/*    <CardHeader*/}
      {/*      floated={false}*/}
      {/*      shadow={false}*/}
      {/*      color="transparent"*/}
      {/*      className="m-0 p-6"*/}
      {/*    >*/}
      {/*      <Typography variant="h6" color="blue-gray" className="mb-2">*/}
      {/*        Orders Overview*/}
      {/*      </Typography>*/}
      {/*      <Typography*/}
      {/*        variant="small"*/}
      {/*        className="flex items-center gap-1 font-normal text-blue-gray-600"*/}
      {/*      >*/}
      {/*        <ArrowUpIcon*/}
      {/*          strokeWidth={3}*/}
      {/*          className="h-3.5 w-3.5 text-green-500"*/}
      {/*        />*/}
      {/*        <strong>24%</strong> this month*/}
      {/*      </Typography>*/}
      {/*    </CardHeader>*/}
      {/*    <CardBody className="pt-0">*/}
      {/*      {ordersOverviewData.map(*/}
      {/*        ({ icon, color, title, description }, key) => (*/}
      {/*          <div key={title} className="flex items-start gap-4 py-3">*/}
      {/*            <div*/}
      {/*              className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${*/}
      {/*                key === ordersOverviewData.length - 1*/}
      {/*                  ? "after:h-0"*/}
      {/*                  : "after:h-4/6"*/}
      {/*              }`}*/}
      {/*            >*/}
      {/*              {React.createElement(icon, {*/}
      {/*                className: `!w-5 !h-5 ${color}`,*/}
      {/*              })}*/}
      {/*            </div>*/}
      {/*            <div>*/}
      {/*              <Typography*/}
      {/*                variant="small"*/}
      {/*                color="blue-gray"*/}
      {/*                className="block font-medium"*/}
      {/*              >*/}
      {/*                {title}*/}
      {/*              </Typography>*/}
      {/*              <Typography*/}
      {/*                as="span"*/}
      {/*                variant="small"*/}
      {/*                className="text-xs font-medium text-blue-gray-500"*/}
      {/*              >*/}
      {/*                {description}*/}
      {/*              </Typography>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        )*/}
      {/*      )}*/}
      {/*    </CardBody>*/}
      {/*  </Card>*/}
      {/*</div>*/}
      {/*<FullCalendar*/}
      {/*  height="75vh"*/}
      {/*  plugins={[*/}
      {/*    dayGridPlugin,*/}
      {/*    timeGridPlugin,*/}
      {/*    interactionPlugin,*/}
      {/*    listPlugin,*/}
      {/*  ]}*/}
      {/*  headerToolbar={{*/}
      {/*    left: "prev,next today",*/}
      {/*    center: "title",*/}
      {/*    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",*/}
      {/*  }}*/}
      {/*  initialView="dayGridMonth"*/}
      {/*  editable={true}*/}
      {/*  selectable={true}*/}
      {/*  selectMirror={true}*/}
      {/*  dayMaxEvents={true}*/}
      {/*  select={handleDateClick}*/}
      {/*  eventClick={handleEventClick}*/}
      {/*  eventsSet={(events) => setCurrentEvents(events)}*/}
      {/*  initialEvents={[*/}
      {/*    {*/}
      {/*      id: "12315",*/}
      {/*      title: "All-day event",*/}
      {/*      date: "2022-09-14",*/}
      {/*    },*/}
      {/*    {*/}
      {/*      id: "5123",*/}
      {/*      title: "Timed event",*/}
      {/*      date: "2022-09-28",*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
    </div>
  );
}

export default Home;
