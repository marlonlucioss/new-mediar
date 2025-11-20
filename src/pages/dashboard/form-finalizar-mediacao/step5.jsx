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
import { useForm } from "react-hook-form";
import { useMediacaoData } from "@/hooks/useMediacaoData";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import {StarIcon} from "@heroicons/react/24/solid/index.js";
import React, {useEffect, useState} from "react";
import {PlusIcon} from "@heroicons/react/24/outline/index.js";
import ResumoMediador from "@/widgets/mediar/ResumoMediador.jsx";
import axios from "axios";
import {API_URL} from "@/config.js";

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
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

export function Step5Cliente() {
  const handleBack = () => {
    navigateToStep('step4')
  };
  const { data: requestData, updateData, clearData, navigateToStep } = useMediacaoData();
  const [days, setDays] = useState([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedDay, setSelectedDay] = useState(new Date().getDate())
  const [selectedHour, setSelectedHour] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const years = [
    { label: new Date().getFullYear().toString(), value: new Date().getFullYear() },
    { label: (new Date().getFullYear() + 1).toString(), value: new Date().getFullYear() + 1 }
  ];

  const selectDateTime = () => {
    navigateToStep('step5');
  }

  useEffect(() => {
    setDays(getDaysInMonth(selectedYear, selectedMonth))
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (requestData?.dataMediacao) {
      const date = new Date(requestData.dataMediacao);
      setSelectedYear(date.getFullYear());
      setSelectedMonth(date.getMonth());
      setSelectedDay(date.getDate());
    }
    if (requestData?.horario) {
      // Extract hour from format like "09:30 - 10:00"
      const hour = requestData.horario.split(' ')[0].replace(':', '');
      setSelectedHour(hour);
    }
  }, [requestData]);

const removeKeyRecursively = (obj, keyToRemove) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => removeKeyRecursively(item, keyToRemove));
  }

  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key !== keyToRemove) {
        newObj[key] = removeKeyRecursively(obj[key], keyToRemove);
      }
    }
  }
  return newObj;
};

  const callCreateConciliation = async () => {
    setIsLoading(true);
    const data = {
      horario: `${selectedHour[0]}${selectedHour[1]}:${selectedHour[2]}0 - 1${selectedHour[2] === '3' ? parseInt(selectedHour[1]) + 1 : selectedHour[1]}:${selectedHour[2] === '0' ? 3 : 0}0`,
      status: 'agendada',
      dataMediacao: `${selectedYear}-${selectedMonth + 1}-${selectedDay}`,
      ...requestData
    }
    updateData(data);
    selectDateTime()

    // First merge all the data to ensure we have everything
    const mergedData = {
      ...requestData, // This contains data from steps 1-3 (mediator, client info, etc)
      horario: `${selectedHour[0]}${selectedHour[1]}:${selectedHour[2]}0 - 1${selectedHour[2] === '3' ? parseInt(selectedHour[1]) + 1 : selectedHour[1]}:${selectedHour[2] === '0' ? 3 : 0}0`,
      status: 'agendada',
      dataMediacao: `${selectedYear}-${selectedMonth + 1}-${selectedDay}`,
      documents: requestData.documents || []
    };

    // Clean the data to remove non-serializable content
    const cleanedRequestData = removeKeyRecursively(mergedData, 'profileImageFile');
    const token = JSON.parse(localStorage.getItem('mediar')).token;

    // Make the API request with all the data
    axios.put(API_URL + '/conciliations', cleanedRequestData, {
      headers: {
        authorization: 'bearer ' + token
      }
    })
      .then(function (response) {
        console.log('response', response)
        // Store the complete response data for the success page
        updateData({ ...requestData, ...response.data });
        
        // Navigate to success page with the response data
        navigateToStep('success');
      })
      .catch(function (error) {
        // handle error
        console.error('Error during conciliation creation/update:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Card className='' style={{flexFlow: 'wrap', boxShadow: 'none'}}>
      <Card className='w-4/6' style={{boxShadow: 'none'}}>
        <CardBody className="p-0 pt-20 pr-4 w-full">

          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6 justify-between w-full">
              <div className="flex">
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
                    {requestData?.mediador?.name || ''}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="mb-1">
                    {requestData?.mediador?.email || ''}
                  </Typography>
                </div>
              </div>
              <ResumoMediador />
            </div>
            {/*<div className="w-96">*/}
            {/*  <Tabs value="app">*/}
            {/*    <TabsHeader>*/}
            {/*      <Tab value="app">*/}
            {/*        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />*/}
            {/*        App*/}
            {/*      </Tab>*/}
            {/*      <Tab value="message">*/}
            {/*        <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />*/}
            {/*        Message*/}
            {/*      </Tab>*/}
            {/*      <Tab value="settings">*/}
            {/*        <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />*/}
            {/*        Settings*/}
            {/*      </Tab>*/}
            {/*    </TabsHeader>*/}
            {/*  </Tabs>*/}
            {/*</div>*/}
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
                Escolha o ano
              </Typography>
              {/*{action}*/}
            </CardHeader>
            <CardBody className="p-0">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                <ButtonGroup className="gap-2 p-1" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))', width: '100%'}}>
                  { years.map((year) => {
                    return <Button 
                      onClick={() => {
                        setSelectedYear(year.value)
                        setDays(getDaysInMonth(year.value, selectedMonth))
                      }} 
                      className="rounded mediar360-bt" 
                      style={{
                        width: '115px', 
                        backgroundColor: `${selectedYear === year.value ? 'rgb(17, 175, 228)' : 'white'}`, 
                        color: `${selectedYear === year.value ? 'white' : 'rgb(17, 175, 228)'}`, 
                        border: '1px solid rgb(17, 175, 228)'
                      }}>
                      {year.label}
                    </Button>
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
                Escolha o mês
              </Typography>
              {/*{action}*/}
            </CardHeader>
            <CardBody className="p-0">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                <ButtonGroup className="gap-2 p-1" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))', width: '100%'}}>
                  { meses.map((mes) => {
                    const currentDate = new Date();
                    const isDisabled = selectedYear === currentDate.getFullYear() && mes.value < currentDate.getMonth();
                    return <Button disabled={isDisabled} onClick={() => {
                      setDays(getDaysInMonth(selectedYear, mes.value))
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
                <ButtonGroup className="gap-2 p-1" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', width: '100%'}}>
                  { days.map((day) => {
                    const currentDate = new Date();
                    const isDisabled = 
                      selectedYear === currentDate.getFullYear() && 
                      selectedMonth === currentDate.getMonth() && 
                      day.getDate() < currentDate.getDate();
                    return <Button disabled={isDisabled} onClick={() => setSelectedDay(day.getDate())} className="rounded mediar360-bt" style={{width: '70px', backgroundColor: `${selectedDay === day.getDate() ? 'rgb(17, 175, 228)' : 'white'}`, color: `${selectedDay === day.getDate() ? 'white' : 'rgb(17, 175, 228)'}`, border: '1px solid rgb(17, 175, 228)'}}>{formatDateToDay(day)}</Button>
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
                <ButtonGroup className="gap-2 p-1" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))', width: '100%'}}>
                  { horarios.map((hora) => {
                    return <Button onClick={() => setSelectedHour(hora.value)} className="rounded mediar360-bt" style={{width: '115px', backgroundColor: `${selectedHour === hora.value ? 'rgb(17, 175, 228)' : 'white'}`, color: `${selectedHour === hora.value ? 'white' : 'rgb(17, 175, 228)'}`, border: '1px solid rgb(17, 175, 228)'}}>{hora.label}</Button>
                  })}
                </ButtonGroup>
              </Typography>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
      {/* <Card className='w-2/6'>
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
              loading={isLoading}
              disabled={isLoading}
              onClick={() => {
                callCreateConciliation()
              }}
            >
              {isLoading ? (
                <Typography color="inherit" className="font-medium capitalize">
                  Processando...
                </Typography>
              ) : (
                <Typography color="inherit" className="font-medium capitalize">
                  Próxima etapa
                </Typography>
              )}
            </Button>
          </div>
        </CardBody>
      </Card> */}
      <div className="w-full mt-6 flex justify-between gap-4">
        <Button
          variant="outlined"
          className="flex items-center gap-4 px-4 capitalize w-1/4"
          style={{placeContent: 'center', borderColor: '#11afe4', color: '#11afe4'}}
          onClick={handleBack}
        >
          <Typography color="inherit" className="font-medium capitalize">
            Voltar
          </Typography>
        </Button>
        <Button
          variant="text"
          color="white"
          className="flex items-center gap-4 px-4 capitalize w-1/4"
          style={{backgroundColor: '#11afe4', placeContent: 'center'}}
          onClick={callCreateConciliation}
        >
          <Typography color="inherit" className="font-medium capitalize">
            Finalizar
          </Typography>
        </Button>
      </div>
    </Card>
  );
}

export default Step5Cliente;

