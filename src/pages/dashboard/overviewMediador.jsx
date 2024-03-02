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
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import {StarIcon} from "@heroicons/react/24/solid/index.js";
import React from "react";
import {PlusIcon} from "@heroicons/react/24/outline/index.js";
import ResumoMediador from "@/widgets/mediar/ResumoMediador.jsx";
import ComunicacoesMediador from "@/widgets/mediar/ComunicacoesMediador.jsx";

export function OverviewMediador({ setPage }) {
  return (
    <Card className='' style={{flexFlow: 'wrap'}}>
      <Card className='w-4/6'>
        <CardBody className="p-4">
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
          <ProfileInfoCard
            title="Sobre"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce urna tellus, pretium et pulvinar vitae, gravida sed augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor gravida massa non accumsan. Mauris a diam ipsum. Nullam lorem leo, maximus ornare eleifend sed, consectetur vel tellus. Suspendisse lacinia eros at lorem bibendum mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
          />
          <section className="flex">
            <div className="w-full flex justify-between">
              <ProfileInfoCard
                title="Disponibilidade"
                description="Segunda - Sexta (08:30 - 18:30)"
                details={null}
              />
              <ComunicacoesMediador/>
            </div>
          </section>
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

export default OverviewMediador;
