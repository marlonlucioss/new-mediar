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
  Spinner,
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
import {platformSettingsData, conversationsData, projectsData, ordersOverviewData} from "@/data";
import {StarIcon} from "@heroicons/react/24/solid/index.js";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "@/config.js";
import {Step1Cliente} from "@/pages/dashboard/form-finalizar-mediacao/step1.jsx";

export function Step3Cliente() {
  const { data: requestData, updateData, navigateToStep } = useMediacaoData();
  const [usersList, setUsersList] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const selectUser = (user) => {
    updateData({...requestData, mediador: user})
  }

  const handleBack = () => {
    navigateToStep('step2')
  }

  useEffect(() => {

  }, [requestData]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(API_URL + '/users?perfil=mediador', {
      headers: {
        authorization: 'bearer ' + JSON.parse(localStorage.getItem('mediar')).token
      }
    })
      .then(function (response) {
        // handle success
        setUsersList(response.data);
      })
      .catch(function (error) {
        // handle error

      })
      .finally(function () {
        setIsLoading(false);
      });
  }, [])

  return (
    <Card className='w-full' style={{flexFlow: 'wrap', boxShadow: 'none'}}>
      <Card className='w-4/6 mt-6 gap-9' style={{flexFlow: 'wrap', boxShadow: 'none'}}>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-64">
            <Spinner className="h-12 w-12" />
          </div>
        ) : (
          usersList.map((user, index) => (
          <Card key={user._id || index}
            onClick={() => {selectUser(user)}} 
            className={`mb-3 ${requestData?.mediador?._id === user._id ? 'ring-2 ring-blue-500' : ''}`} 
            style={{
              cursor: 'pointer', 
              display: 'inline-block', 
              textAlign: 'center', 
              height: '200px', 
              width: '230px',
              backgroundColor: requestData?.mediador?._id === user._id ? '#f0f9ff' : 'white'
            }}
          >
            <CardBody>
              <img style={{display: 'inline'}} src="/img/andrea-lista.png" alt=""/>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-semibold"
                >
                  {user.name}
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
        ))
        )}
      </Card>
      {/* <Card className='w-2/6'>
        <CardBody className="p-0 pt-20 pr-4 w-full">
          <div className="m-4">
            <Typography variant="h3" color="blue-gray" className="mb-7">
              Assistente Virtual
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600 mb-7"
            >
              {requestData?.mediador ? 
                `Você selecionou ${requestData.mediador.name} como seu mediador. Clique em próxima etapa para continuar.` :
                'Selecione um mediador para prosseguir com o agendamento da mediação.'
              }
            </Typography>
            <Button
              variant={"text"}
              color={'white'}
              className="flex items-center gap-4 px-4 capitalize"
              fullWidth
              style={{backgroundColor: '#11afe4', placeContent: 'center'}}
              onClick={() => navigateToStep('step4')}
              disabled={!requestData?.mediador}
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
          onClick={() => navigateToStep('step4')}
          disabled={!requestData?.mediador}
        >
          <Typography color="inherit" className="font-medium capitalize">
            Próxima etapa
          </Typography>
        </Button>
      </div>
    </Card>
  );
}

export default Step3Cliente;
