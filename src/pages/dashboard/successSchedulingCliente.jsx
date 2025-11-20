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
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import { useMediacaoData } from "@/hooks/useMediacaoData";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import {platformSettingsData, conversationsData, projectsData, ordersOverviewData} from "@/data";
import {StarIcon} from "@heroicons/react/24/solid/index.js";
import React, {useEffect, useState} from "react";
import SuccessIcon from "@/images-svg/success-mediation.jsx";
import ResumoMediador from "@/widgets/mediar/ResumoMediador.jsx";
import axios from "axios";

export function SuccessSchedulingCliente() {
  const { data: requestData } = useMediacaoData();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have the complete data from the PUT response
    if (requestData && Object.keys(requestData).length > 0) {
      setIsLoading(false);
    } else {
      // If no data, redirect to home after a short delay
      const timer = setTimeout(() => {
        navigate("/dashboard/home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestData, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "Data não especificada";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    });
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return "Data não especificada";
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const formatCurrency = (value) => {
    if (!value) return "Não informado";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }


  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="text-center">
          <Spinner className="h-12 w-12 mb-4" />
          <Typography variant="h6" color="blue-gray">
            Carregando dados da mediação...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <Card className="mb-6" style={{boxShadow: 'none'}}>
        <CardBody className="text-center py-8">
          <div className="mb-6 flex justify-center">
            <SuccessIcon />
          </div>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Mediação Agendada com Sucesso!
          </Typography>
          <Typography variant="h6" color="gray" className="mb-4">
            {formatDate(requestData?.dataMediacao)} às {requestData?.horario}
          </Typography>
          <Typography variant="small" color="gray">
            Status: <span className="font-semibold text-green-600">{requestData?.status || 'Agendada'}</span>
          </Typography>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mediator Information */}
        <Card style={{boxShadow: 'none'}}>
          <CardHeader color="white" className="relative h-16" style={{borderRadius: 0}}>
            <Typography variant="h6" color="blue-gray" className="p-4">
              Mediador Escolhido
            </Typography>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="/img/andrea-lista.png"
                alt={requestData?.mediador?.fullname}
                size="xl"
                className="rounded-full"
              />
              <div>
                <Typography variant="h6" color="blue-gray">
                  {requestData?.mediador?.fullname || "Nome do Mediador"}
                </Typography>
                <Typography variant="small" color="gray">
                  {requestData?.mediador?.email}
                </Typography>
                <Typography variant="small" color="gray">
                  Telefone: {requestData?.mediador?.telefone}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Client Information */}
        <Card style={{boxShadow: 'none'}}>
          <CardHeader color="white" className="relative h-16" style={{borderRadius: 0}}>
            <Typography variant="h6" color="blue-gray" className="p-4">
              Informações do Cliente
            </Typography>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Nome:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {requestData?.nome_cliente || requestData?.mediando}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Email:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {requestData?.email_cliente}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Telefone:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {requestData?.telefone_cliente}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  CPF:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {requestData?.cpf_cliente}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Case Information */}
        <Card style={{boxShadow: 'none'}}>
          <CardHeader color="white" className="relative h-16" style={{borderRadius: 0}}>
            <Typography variant="h6" color="blue-gray" className="p-4">
              Informações do Processo
            </Typography>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Número do Processo:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {requestData?.numero_processo}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Objeto da Disputa:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {requestData?.objeto_disputa}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Resumo da Disputa:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {requestData?.resumo_disputa}
                </Typography>
              </div>
              {requestData?.observacao_cliente && (
                <div>
                  <Typography variant="small" color="gray" className="font-semibold">
                    Observações do Cliente:
                  </Typography>
                  <Typography variant="small" color="blue-gray">
                    {requestData?.observacao_cliente}
                  </Typography>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Financial Information */}
        <Card style={{boxShadow: 'none'}}>
          <CardHeader color="white" className="relative h-16" style={{borderRadius: 0}}>
            <Typography variant="h6" color="blue-gray" className="p-4">
              Informações Financeiras
            </Typography>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Valor da Causa:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {formatCurrency(requestData?.valor_causa)}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Valor da Proposta:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {formatCurrency(requestData?.valor_proposta)}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Validade da Proposta:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {formatDate(requestData?.validade_proposta)}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Meeting Information */}
      {requestData?.reuniao && (
        <Card className="mt-6" style={{boxShadow: 'none'}}>
          <CardHeader color="blue" className="relative h-16" style={{borderRadius: 0}}>
            <Typography variant="h6" color="white" className="p-4">
              Informações da Reunião Virtual
            </Typography>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Data de Início:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {formatDateTime(requestData?.reuniao?.startDate)}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Data de Término:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {formatDateTime(requestData?.reuniao?.endDate)}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Link da Reunião:
                </Typography>
                <Typography variant="small" color="blue" className="break-all">
                  <a href={requestData?.reuniao?.roomUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {requestData?.reuniao?.roomUrl}
                  </a>
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  ID da Reunião:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {requestData?.reuniao?.meetingId}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6 justify-center">
        <Button
          variant="outlined"
          color="blue-gray"
          onClick={() => navigate("/dashboard/proximas-mediacoes")}
        >
          Ver Minhas Mediações
        </Button>
        <Button
          variant="filled"
          color="blue"
          onClick={() => navigate("/dashboard/home")}
        >
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
}

export default SuccessSchedulingCliente;
