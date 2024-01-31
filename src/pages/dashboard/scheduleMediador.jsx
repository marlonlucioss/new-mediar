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
  Button, ButtonGroup,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import {StarIcon} from "@heroicons/react/24/solid/index.js";
import React, {useEffect, useState} from "react";
import {PlusIcon} from "@heroicons/react/24/outline/index.js";

const getDaysInMonth = (month) => {
  const date = new Date(new Date().getFullYear(), month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const weekday = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];

const formatDateToDay = (dt) => {
  return <>{weekday[dt.getDay()]}<br/>{dt.getDate()}</>
}

const meses = [
  {
    label: 'Janeiro',
    value: 0
  },
  {
    label: 'Fevereiro',
    value: 1
  },
  {
    label: 'Março',
    value: 2
  },
  {
    label: 'Abril',
    value: 3
  },
  {
    label: 'Maio',
    value: 4
  },
  {
    label: 'Junho',
    value: 5
  },
  {
    label: 'Julho',
    value: 6
  },
  {
    label: 'Agosto',
    value: 7
  },
  {
    label: 'Setembro',
    value: 8
  },
  {
    label: 'Outubro',
    value: 9
  },
  {
    label: 'Novembro',
    value: 10
  },
  {
    label: 'Dezembro',
    value: 11
  }
]

const horarios = [
  {
    label: '09:00',
    value: '0900',
  },
  {
    label: '09:30',
    value: '0930',
  },
  {
    label: '10:00',
    value: '1000',
  },
  {
    label: '10:30',
    value: '1030',
  },
  {
    label: '11:00',
    value: '1100',
  },
  {
    label: '11:30',
    value: '1130',
  },
  {
    label: '12:00',
    value: '1200',
  },
  {
    label: '12:30',
    value: '1230',
  },
  {
    label: '13:00',
    value: '1300',
  },
  {
    label: '13:30',
    value: '1330',
  },
  {
    label: '14:00',
    value: '1400',
  },
  {
    label: '14:30',
    value: '1430',
  },
  {
    label: '15:00',
    value: '1500',
  },
  {
    label: '15:30',
    value: '1530',
  },
  {
    label: '16:00',
    value: '1600',
  },
  {
    label: '16:30',
    value: '1630',
  },
  {
    label: '17:00',
    value: '1700',
  },
  {
    label: '17:30',
    value: '1730',
  }
]

export function ScheduleMediador({ setPage }) {
  const [days, setDays] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedDay, setSelectedDay] = useState(new Date().getDate())
  const [selectedHour, setSelectedHour] = useState()

  useEffect(() => {
    setDays(getDaysInMonth(new Date().getMonth()))
  }, []);

  return (
    <Card className='' style={{flexFlow: 'wrap'}}>
      <Card className='w-4/6'>
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/andrea-lista.png"
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
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
          </div>
          <Card color="transparent" shadow={false}>
            <CardHeader
              color="transparent"
              shadow={false}
              floated={false}
              className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
              style={{    justifyContent: 'center'}}
            >
              <Typography variant="h6" color="blue-gray">
                Escolha o mês
              </Typography>
              {/*{action}*/}
            </CardHeader>
            <CardBody className="p-0">
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  <ButtonGroup className="gap-1 p-1" style={{flexFlow: 'wrap', justifyContent: 'space-between'}}>
                    { meses.map((mes) => {
                      return <Button disabled={mes.value < new Date().getMonth()} onClick={() => {
                        setDays(getDaysInMonth(mes.value))
                        setSelectedMonth(mes.value)
                      }} className="rounded mediar360-bt" style={{width: '115px', backgroundColor: `${selectedMonth === mes.value ? 'rgb(17, 175, 228)' : 'white'}`, color: `${selectedMonth === mes.value ? 'white' : 'rgb(17, 175, 228)'}`, border: '1px solid rgb(17, 175, 228)'}}>{mes.label}</Button>
                    })}
                  </ButtonGroup>
                </Typography>
            </CardBody>
          </Card>
          <br/>
          <Card color="transparent" shadow={false}>
            <CardHeader
              color="transparent"
              shadow={false}
              floated={false}
              className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
              style={{    justifyContent: 'center'}}
            >
              <Typography variant="h6" color="blue-gray">
                Escolha o dia
              </Typography>
              {/*{action}*/}
            </CardHeader>
            <CardBody className="p-0">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                <ButtonGroup className="gap-1 p-1" style={{flexWrap: 'wrap'}}>
                  { days.map((day) => {
                    return <Button disabled={day.getDate() < new Date().getDate() && day.getMonth() === new Date().getMonth()} onClick={() => setSelectedDay(day.getDate())} className="rounded mediar360-bt" style={{width: '70px', backgroundColor: `${selectedDay === day.getDate() ? 'rgb(17, 175, 228)' : 'white'}`, color: `${selectedDay === day.getDate() ? 'white' : 'rgb(17, 175, 228)'}`, border: '1px solid rgb(17, 175, 228)'}}>{formatDateToDay(day)}</Button>
                  })}
                </ButtonGroup>
              </Typography>
            </CardBody>
          </Card>
          <br/>
          <Card color="transparent" shadow={false}>
            <CardHeader
              color="transparent"
              shadow={false}
              floated={false}
              className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
              style={{    justifyContent: 'center'}}
            >
              <Typography variant="h6" color="blue-gray">
                Escolha o horário
              </Typography>
              {/*{action}*/}
            </CardHeader>
            <CardBody className="p-0">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                <ButtonGroup className="gap-1 p-1" style={{flexFlow: 'wrap', justifyContent: 'space-between'}}>
                  { horarios.map((hora) => {
                    return <Button onClick={() => setSelectedHour(hora.value)} className="rounded mediar360-bt" style={{width: '115px', backgroundColor: `${selectedHour === hora.value ? 'rgb(17, 175, 228)' : 'white'}`, color: `${selectedHour === hora.value ? 'white' : 'rgb(17, 175, 228)'}`, border: '1px solid rgb(17, 175, 228)'}}>{hora.label}</Button>
                  })}
                </ButtonGroup>
              </Typography>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
      <Card className='w-2/6'>
        <CardBody className="p-4">
          <div className="m-4">
            <Button
              variant={"text"}
              color={'white'}
              className="flex items-center gap-4 px-4 capitalize"
              fullWidth
              style={{backgroundColor: '#11afe4', placeContent: 'center'}}
              onClick={() => setPage('sucesso-agendamento')}
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

export default ScheduleMediador;
