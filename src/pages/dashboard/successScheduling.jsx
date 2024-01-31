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

export function SuccessSchedule({ setPage }) {
  return (
    <Card className='' style={{flexFlow: 'flex'}}>
      <Card>
        <CardBody className="p-4" style={{ alignSelf: 'center', textAlign: 'center'}}>
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6" style={{    placeContent: 'center'}}>
            <div className="flex items-center gap-6">
              <SuccessIcon />
            </div>
          </div>
          <ProfileInfoCard
            title="Parabéns!"
            description="Sua mediação foi agendada para:"
          />
          12:30 - 14 de fevereiro - Terça-feira
        </CardBody>
      </Card>
    </Card>
  );
}

export default SuccessSchedule;
