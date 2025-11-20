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
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import {platformSettingsData, conversationsData, projectsData, ordersOverviewData} from "@/data";
import {StarIcon} from "@heroicons/react/24/solid/index.js";
import React, {useEffect, useState} from "react";
import SuccessIcon from "@/images-svg/success-mediation.jsx";
import ResumoMediador from "@/widgets/mediar/ResumoMediador.jsx";
import axios from "axios";

export function SuccessSchedule({ setPage, setData, requestData, loading }) {
  console.log('SuccessSchedule component is rendering!');
  const navigate = useNavigate();

  // Helper function to get data from either _doc or root level
  const getData = (field) => {
    if (!requestData) return null;
    // Try _doc first (Mongoose document), then root level
    return requestData._doc?.[field] || requestData[field];
  };

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

  if (loading) {
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
            Mediação Criada com Sucesso!
          </Typography>
          <Typography variant="h6" color="gray" className="mb-4">
            {getData('dataMediacao') ? formatDate(getData('dataMediacao')) : 'Data a ser definida'} {getData('horario') && `às ${getData('horario')}`}
          </Typography>
          <Typography variant="small" color="gray">
            Status: <span className="font-semibold text-orange-600">{getData('status') || 'Aguardando'}</span>
          </Typography>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card style={{boxShadow: 'none'}}>
          <CardHeader color="white" className="relative h-16" style={{borderRadius: 0}}>
            <Typography variant="h6" color="blue-gray" className="p-4">
              Empresa Solicitante
            </Typography>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Nome:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {getData('criadoPor')?.fullname || getData('criadoPor')?.name || "Nome da Empresa"}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Email:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {getData('criadoPor')?.email}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Telefone:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {getData('criadoPor')?.telefone || getData('criadoPor')?.phone}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  CPF/CNPJ:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {getData('criadoPor')?.cpfCnpj}
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
                  {getData('nome_cliente') || getData('mediando')}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Email:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {getData('email_cliente')}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Telefone:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {getData('telefone_cliente')}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  CPF:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {getData('cpf_cliente')}
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
                  {getData('numero_processo')}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Objeto da Disputa:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {getData('objeto_disputa')}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Resumo da Disputa:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {getData('resumo_disputa')}
                </Typography>
              </div>
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
                  {formatCurrency(getData('valor_causa'))}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Valor da Proposta:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {formatCurrency(getData('valor_proposta'))}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray" className="font-semibold">
                  Validade da Proposta:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {formatDate(getData('validade_proposta'))}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Next Steps Information */}
      <Card className="mt-6" style={{boxShadow: 'none'}}>
        <CardHeader color="blue" className="relative h-16" style={{borderRadius: 0}}>
          <Typography variant="h6" color="white" className="p-4">
            Próximos Passos
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <Typography variant="small" color="blue-gray">
              Sua mediação foi criada com sucesso! O cliente receberá um convite por email para participar do processo de mediação.
            </Typography>
            <Typography variant="small" color="blue-gray">
              <strong>Data de Criação:</strong> {formatDateTime(getData('createdAt'))}
            </Typography>
            <Typography variant="small" color="blue-gray">
              <strong>ID da Mediação:</strong> {getData('_id')}
            </Typography>
            {getData('mensagem')?.data && (
              <Typography variant="small" color="blue-gray">
                <strong>Email enviado para:</strong> {getData('email_cliente')}
              </Typography>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6 justify-center">
        <Button
          variant="outlined"
          color="blue-gray"
          onClick={() => {
            setPage(null);
            navigate("/dashboard/proximas-mediacoes");
          }}
        >
          Ver Minhas Mediações
        </Button>
        <Button
          variant="filled"
          color="blue"
          onClick={() => {
            setPage(null);
            navigate("/dashboard/home");
          }}
        >
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
}

export default SuccessSchedule;
