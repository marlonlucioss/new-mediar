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
  Dialog, DialogHeader, DialogBody, DialogFooter,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import {platformSettingsData, conversationsData, projectsData, ordersOverviewData, authorsTableData} from "@/data";
import {StarIcon} from "@heroicons/react/24/solid/index.js";
import React, {useEffect, useState} from "react";
import {ComputerDesktopIcon, PlusIcon, EyeIcon} from "@heroicons/react/24/outline/index.js";
import Pagination from "@/components/pagination.jsx";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import axios from "axios";
import {API_URL} from "@/config.js";
import { Step1Cliente } from "@/pages/dashboard/form-finalizar-mediacao/step1.jsx";
import {Step2Cliente} from "@/pages/dashboard/form-finalizar-mediacao/step2.jsx";
import Step3Cliente from "@/pages/dashboard/form-finalizar-mediacao/step3.jsx";
import Step4Cliente from "@/pages/dashboard/form-finalizar-mediacao/step4.jsx";
import SuccessSchedulingCliente from "@/pages/dashboard/successSchedulingCliente.jsx";
import {Sidenav} from "@/widgets/layout/index.js";
import routes from "@/routes.jsx";
import { useMediacaoData } from "@/hooks/useMediacaoData";

function ProximasMediacoes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [loading, setLoading] = useState(true);
  const { data: requestData, updateData, clearData, navigateToStep } = useMediacaoData();
  const [conciliationList, setConciliationList] = useState([]);
  const [page, setPage] = useState(null);
  const [activeTab, setActiveTab] = useState("aguardando");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedConciliation, setSelectedConciliation] = useState(null);
  const scrollContainerRef = React.useRef(null);

  // Reset sort config when switching to tabs with automatic date sorting
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    // Reset sorting for tabs that have automatic date sorting
    if (["agendada", "cancelada", "concluida"].includes(newTab)) {
      setSortConfig({ key: null, direction: 'ascending' });
    }
    // Scroll to top when changing tabs
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // Filter mediations by status based on active tab
  const getFilteredMediations = () => {
    let filtered = [];
    switch (activeTab) {
      case "aguardando":
        filtered = conciliationList.filter(item => item.status === "aguardando");
        break;
      case "agendada":
        filtered = conciliationList.filter(item => item.status === "agendada");
        // Sort by date (most recent first) for agendada
        filtered.sort((a, b) => new Date(b.dataMediacao) - new Date(a.dataMediacao));
        break;
      case "cancelada":
        filtered = conciliationList.filter(item => item.status === "cancelada");
        // Sort by date (most recent first) for cancelada
        filtered.sort((a, b) => new Date(b.dataMediacao) - new Date(a.dataMediacao));
        break;
      case "concluida":
        filtered = conciliationList.filter(item => item.status === "concluida");
        // Sort by date (most recent first) for concluida
        filtered.sort((a, b) => new Date(b.dataMediacao) - new Date(a.dataMediacao));
        break;
      default:
        filtered = conciliationList;
    }
    return filtered;
  };

  const filteredMediations = getFilteredMediations();

  // Tab data with counts
  const tabsData = [
    {
      label: "aguardando",
      value: "aguardando",
      count: conciliationList.filter(item => item.status === "aguardando").length,
    },
    {
      label: "agendada", 
      value: "agendada",
      count: conciliationList.filter(item => item.status === "agendada").length,
    },
    {
      label: "cancelada",
      value: "cancelada", 
      count: conciliationList.filter(item => item.status === "cancelada").length,
    },
    {
      label: "concluída",
      value: "concluida",
      count: conciliationList.filter(item => item.status === "concluida").length,
    },
  ];

  // const  callCreateConciliation = () => {
  //   const token = JSON.parse(localStorage.getItem('mediar')).token
  //   setLoading(true)
  //   axios.put(API_URL + '/conciliations', {
  //     mediador: data.mediador,
  //     // horario: '12:00 - 12:30',
  //     // horario: `${selectedHour[0]}${selectedHour[1]}:${selectedHour[2]}0 - 1${selectedHour[2] === '3' ? parseInt(selectedHour[1]) + 1 : selectedHour[1]}:${selectedHour[2] === '0' ? 3 : 0}0`,
  //     horario: data.horario,
  //     status: 'agendada',
  //     dataMediacao: data.date,
  //     // dataMediacao: `2024-12-12`,
  //     ...data
  //   }, {
  //     headers: {
  //       authorization: 'bearer ' + token
  //     }
  //   })
  //     .then(function (response) {
  //       // handle success
  //       setPage('step5Cliente')
  //     })
  //     .catch(function (error) {
  //       // handle error
  //     })
  //     .finally(function () {
  //       // always executed
  //     });
  // }

  const deleteConciliation = async (id) => {
    try {
      const mediarData = JSON.parse(localStorage.getItem('mediar'));
      
      if (!mediarData?.token || !id) {
        alert('Erro ao identificar a mediação.');
        return;
      }
  
      const response = await axios.put(
        `${API_URL}/conciliations/${id}/cancel`,
        {},
        {
          headers: {
            authorization: `bearer ${mediarData.token}`
          }
        }
      );
  
      if (response.status === 200) {
        alert('Mediação cancelada com sucesso!');
        fetchConciliations();
      }
    } catch (error) {
      console.error('Error canceling conciliation:', error);
      alert('Erro ao cancelar mediação. Por favor, tente novamente.');
    }
  }

  const concludeConciliation = async (id) => {
    try {
      const mediarData = JSON.parse(localStorage.getItem('mediar'));
      
      if (!mediarData?.token || !id) {
        alert('Erro ao identificar a mediação.');
        return;
      }
  
      const response = await axios.put(
        `${API_URL}/conciliations/${id}/conclude`,
        {},
        {
          headers: {
            authorization: `bearer ${mediarData.token}`
          }
        }
      );
  
      if (response.status === 200) {
        alert('Mediação concluída com sucesso!');
        fetchConciliations();
      }
    } catch (error) {
      console.error('Error concluding conciliation:', error);
      alert('Erro ao concluir mediação. Por favor, tente novamente.');
    }
  }

  // Helper functions for formatting data in modal
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

  // Helper function to render action buttons based on user role and status
  const renderActionButtons = (userRole, status, currentItem) => {
    const buttons = [];

    // Eye button - always present for all roles
    buttons.push(
      <button
        key="view"
        onClick={() => {
          setSelectedConciliation(currentItem);
          setShowDetailsModal(true);
        }}
        className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs shadow-md shadow-gray-900/10 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded bg-[#fff] text-blue-600"
        type="button">
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <EyeIcon className="h-4 w-4" />
        </span>
      </button>
    );

    // Role and status specific buttons
    if (userRole === 'cliente' && status === 'aguardando') {
      buttons.push(
        <button
          key="schedule"
          onClick={() => {
            clearData();
            console.log(currentItem);
            setTimeout(() => {
              updateData(currentItem);
              navigateToStep('step1');
            }, 1000);
          }}
          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs shadow-md shadow-gray-900/10 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded bg-[#fff] text-green-600"
          type="button">
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <i className="text-lg fa-solid fa-calendar" aria-hidden="true"></i>
          </span>
        </button>
      );
    }

    if (userRole === 'empresa' && status === 'aguardando') {
      buttons.push(
        <button
          key="delete"
          onClick={() => {
            deleteConciliation(currentItem._id);
          }}
          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs shadow-md shadow-gray-900/10 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded bg-[#fff] text-red-600"
          type="button">
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <i className="text-lg fa-solid fa-close" aria-hidden="true"></i>
          </span>
        </button>
      );
    }

    if (userRole === 'mediador' && status === 'agendada') {
      buttons.push(
        <button
          key="conclude"
          onClick={() => {
            concludeConciliation(currentItem._id);
          }}
          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs shadow-md shadow-gray-900/10 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded bg-[#fff] text-green-600"
          type="button">
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <i className="text-lg fa-solid fa-check" aria-hidden="true"></i>
          </span>
        </button>,
        <button
          key="delete"
          onClick={() => {
            deleteConciliation(currentItem._id);
          }}
          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs shadow-md shadow-gray-900/10 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded bg-[#fff] text-red-600"
          type="button">
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <i className="text-lg fa-solid fa-close" aria-hidden="true"></i>
          </span>
        </button>
      );
    }

    return buttons;
  }

  // Helper function to check if popover should be shown
  const shouldShowPopover = (userRole, status) => {
    return (userRole === 'cliente' && status === 'aguardando') ||
           (userRole === 'empresa' && status === 'aguardando') ||
           (userRole === 'mediador' && status === 'agendada');
  }

  const fetchConciliations = async () => {
    setLoading(true);
    try {
      const mediarData = localStorage.getItem('mediar');
      if (!mediarData) {
        // Don't redirect if user is on password reset page
        if (!location.pathname.includes('/auth/password-reset')) {
          navigate('/auth/sign-in');
        }
        return;
      }
      const token = JSON.parse(mediarData).token;
      axios.get(API_URL + `/conciliations${JSON.parse(localStorage.getItem('mediar')).user.role === 'empresa' ? '?empresa='+JSON.parse(localStorage.getItem('mediar')).user.cpfCnpj : ''}${JSON.parse(localStorage.getItem('mediar')).user.role === 'cliente' ? '?cliente='+JSON.parse(localStorage.getItem('mediar')).user.email : ''}${JSON.parse(localStorage.getItem('mediar')).user.role === 'mediador' ? '?mediador='+JSON.parse(localStorage.getItem('mediar')).user.email : ''}`, {
        headers: {
          authorization: 'bearer ' + token
        }
      })
      .then(function (response) {
        // handle success

        setConciliationList(response.data);
      })
      .catch(function (error) {
        // handle error
        console.error('Error fetching conciliations:', error);
      })
      .finally(function () {
        // always executed
        setLoading(false);
      });
    } catch (error) {
      console.error('Error fetching conciliations:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConciliations(); // Fetch immediately on mount
  }, []);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedConciliationList = React.useMemo(() => {
    let sortableItems = [...filteredMediations];
    
    // Only apply additional sorting if not in auto-sorted tabs or if user explicitly sorted
    const isAutoSortedTab = ["agendada", "cancelada", "concluida"].includes(activeTab);
    
    if (sortConfig.key !== null && (!isAutoSortedTab || sortConfig.key !== null)) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle nested properties like 'mediador.name'
        if (sortConfig.key === 'mediador.name') {
          aValue = a.mediador ? a.mediador.name : '';
          bValue = b.mediador ? b.mediador.name : '';
        }

        // Handle date sorting
        if (sortConfig.key === 'dataMediacao') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
          if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        }

        // Handle string sorting
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (aValue.localeCompare(bValue) < 0) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aValue.localeCompare(bValue) > 0) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredMediations, sortConfig, activeTab]);

  return (
    <>
      { page === null && (
        <Card className='w-full shadow-none'>
          <Card className='w-full shadow-none'>
            <CardHeader className='m-0 shadow-none'>
              <div>
                {/* Code block starts */}
                <div className="w-full mt-12 mb-3 mx-auto flex flex-col md:flex-row items-center justify-between pb-4">
                  <div className="mb-4 md:mb-0">
                    <h4 className="text-3xl font-normal leading-tight text-gray-800 dark:text-gray-100">Minhas Mediações</h4>
                  </div>
                  
                  {/*<div className="mt-6 md:mt-0 flex items-center">*/}
                  {/*  <Button*/}
                  {/*    variant={"filled"}*/}
                  {/*    className="flex items-center gap-4 px-4 capitalize mr-3"*/}
                  {/*    style={{backgroundColor: '#fff', borderRadius: '100%', padding: '10px'}}*/}
                  {/*  >*/}
                  {/*    <ChevronLeftIcon strokeWidth={2.5} className="h-5 w-5 text-gray-600" />*/}
                  {/*  </Button>*/}
                  {/*  <Typography*/}
                  {/*    color="inherit"*/}
                  {/*    className="font-medium mt-1 mx-4"*/}
                  {/*  >*/}
                  {/*    Nov 15, 2023*/}
                  {/*  </Typography>*/}
                  {/*  /!*<Typography*!/*/}
                  {/*  /!*  color="inherit"*!/*/}
                  {/*  /!*  className="font-light"*!/*/}
                  {/*  /!*>*!/*/}
                  {/*  /!*  Hoje*!/*/}
                  {/*  /!*</Typography>*!/*/}
                  {/*  <Button*/}
                  {/*    variant={"filled"}*/}
                  {/*    className="flex items-center gap-4 px-4 capitalize ml-3"*/}
                  {/*    style={{backgroundColor: '#fff', borderRadius: '100%', padding: '10px'}}*/}
                  {/*  >*/}
                  {/*    <ChevronRightIcon strokeWidth={2.5} className="h-5 w-5 text-gray-600" />*/}
                  {/*  </Button>*/}
                  {/*</div>*/}
                  {/* {JSON.parse(localStorage.getItem('mediar')).user.role === 'empresa' && (
                    <div className="m-8">
                      <Button
                        variant={"text"}
                        color={'white'}
                        className="flex items-center gap-4 px-4 capitalize w-56"
                        fullWidth
                        style={{backgroundColor: '#11afe4'}}
                        onClick={() => setPage('step1')}
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
                  )} */}
                  {/*<div className="mt-6 md:mt-0">*/}
                  {/*  <Button*/}
                  {/*    variant={"text"}*/}
                  {/*    color={'white'}*/}
                  {/*    className="flex items-center gap-4 px-4 capitalize"*/}
                  {/*    fullWidth*/}
                  {/*    style={{backgroundColor: '#11afe4'}}*/}
                  {/*    onClick={() => setPage('lista-mediadores')}*/}
                  {/*  >*/}
                  {/*    <PlusIcon strokeWidth={2.5} className="h-5 w-5 text-white" />*/}
                  {/*    <Typography*/}
                  {/*      color="inherit"*/}
                  {/*      className="font-medium capitalize"*/}
                  {/*    >*/}
                  {/*      Nova mediação*/}
                  {/*    </Typography>*/}
                  {/*  </Button>*/}
                  {/*</div>*/}
                  {/* Code block ends */}
                </div>
                
              </div>
            </CardHeader>
            
            {/* Tabs for filtering mediations by status */}
            <div className="px-4 pb-4">
              <Tabs value={activeTab} className="w-full">
                <TabsHeader
                  className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                  indicatorProps={{
                    className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
                  }}
                >
                  {tabsData.map(({ label, value, count }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => handleTabChange(value)}
                      className={`${
                        activeTab === value ? "text-blue-500" : "text-blue-gray-500"
                      } capitalize font-medium`}
                    >
                      <div className="flex items-center gap-2">
                        {label}
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          activeTab === value 
                            ? "bg-blue-100 text-blue-600" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {count}
                        </span>
                      </div>
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
            </div>

            <div className="flex justify-end px-4">
              <Button
                variant="text"
                size="sm"
                onClick={fetchConciliations}
                className="flex items-center justify-center gap-2"
              >
                <ArrowPathIcon className={`h-4 w-4 my-auto transition-transform ${loading ? 'animate-spin' : ''}`} /> <span className="my-auto">Atualizar</span>
              </Button>
            </div>
            <CardBody className="px-0 pt-0 pb-0">
              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <Typography
                      color="blue-gray"
                      className="font-medium"
                    >
                      Carregando mediações...
                    </Typography>
                  </div>
                </div>
              )}
              {!loading && filteredMediations.length === 0 && (
                <div className="flex justify-center items-center py-8">
                  <Typography
                    color="inherit"
                    className="font-medium"
                  >
                    {conciliationList.length === 0 
                      ? "Você não possui mediações vinculadas a você."
                      : `Nenhuma mediação com status "${activeTab}".`
                    }
                  </Typography>
                </div>
              )}
            {!loading && filteredMediations.length > 0 &&
              <>
                <div className="w-full overflow-hidden">
                  <table className="w-full min-w-[640px] table-fixed">
                    <colgroup>
                      <col style={{ width: '25%' }} />
                      <col style={{ width: '25%' }} />
                      <col style={{ width: '20%' }} />
                      <col style={{ width: '20%' }} />
                      <col style={{ width: '10%' }} />
                    </colgroup>
                    <thead style={{backgroundColor: '#DCDFE3'}}>
                      <tr>
                        {["data da mediação", "cliente", "mediador", "status", ""].map((el, index) => {
                          const isCliente = el === 'cliente';
                          const isMediador = el === 'mediador';
                          const isDataMediacao = el === 'data da mediação';
                          let sortKey = null;
                          if (isCliente) sortKey = 'mediando';
                          if (isMediador) sortKey = 'mediador.name';
                          if (isDataMediacao) sortKey = 'dataMediacao';

                          return (
                            <th key={el} className={`border-b border-blue-gray-50 py-3 px-5 ${
                              (isDataMediacao || isCliente || isMediador) ? 'text-left' : 'text-center'
                            }`}>
                              {el === 'horário' ? (
                                <div className="flex items-center gap-4">
                                  <div>
                                    <input id={`checkbox-header-${index}`} type="checkbox" className="hidden peer"/>
                                    <label htmlFor={`checkbox-header-${index}`}
                                          className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                                        <path
                                          d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-4.613 1.342-10.84-2.742-14.921a11.532 11.532 0 0 0-14.015-2.513L27.234 213.235a47.529 47.529 0 0 0 52.189 27.52z"/>
                                      </svg>
                                    </label>
                                  </div>
                                  <div>
                                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                      {el}
                                    </Typography>
                                  </div>
                                  <div>
                                    <i className="fa fa-arrows-v" aria-hidden="true"></i>
                                  </div>
                                </div>
                              ) : (isCliente || isMediador || isDataMediacao) ? (
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => requestSort(sortKey)}>
                                  <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                    {el}
                                  </Typography>
                                  <i className={`fa ${sortConfig.key === sortKey ? (sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'}`} aria-hidden="true"></i>
                                </div>
                              ) : (
                                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                  {el}
                                </Typography>
                              )}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                  </table>
                  <div 
                    ref={scrollContainerRef}
                    className="overflow-y-auto" 
                    style={{ height: 'calc(100vh - 400px)', maxHeight: 'calc(100vh - 400px)' }}
                  >
                    <table className="w-full min-w-[640px] table-fixed">
                      <colgroup>
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '10%' }} />
                      </colgroup>
                      <tbody>
                        {sortedConciliationList.map(
                          ({ _id, createdAt, criadoPor, dataMediacao, horario, mediador, mediando, status, updatedAt }, index) => {
                            const baseClassName = `py-3 px-5 ${index === sortedConciliationList.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                            return (
                              <tr key={_id || index}>
                                <td className={`${baseClassName} text-left`}>
                                  <Typography variant="small" color="blue-gray" className="font-semibold">
                                    {dataMediacao ? new Date(dataMediacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : "A definir"} - {horario}
                                  </Typography>
                                </td>
                                <td className={`${baseClassName} text-left`}>
                                  <Typography variant="small" color="blue-gray" className="font-semibold">
                                    {mediando}
                                  </Typography>
                                </td>
                              <td className={`${baseClassName} text-left`}>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {mediador.name}
                                </Typography>
                              </td>
                              <td className={`${baseClassName} text-center`}>
                                <Typography 
                                  className="text-xs font-bold"
                                  style={{
                                    color: status === 'aguardando' ? '#3c91db' :
                                           status === 'agendada' ? '#d5ab0a' :
                                           status === 'concluida' ? '#449129' :
                                           status === 'cancelada' ? '#b74c4c' : '#000',
                                  }}
                                >
                                  <i className={
                                    status === 'aguardando' ? 'fa-regular fa-clock' :
                                    status === 'agendada' ? 'fa-solid fa-check' :
                                    status === 'concluida' ? 'fa-solid fa-thumbs-up' :
                                    status === 'cancelada' ? 'fa-solid fa-xmark' : 'fa-regular fa-clock'
                                  }></i> {status}
                                </Typography>
                              </td>
                              <td className={`${baseClassName} text-center`}>
                                <div className="flex justify-center">
                                  {(() => {
                                    const userRole = JSON.parse(localStorage.getItem('mediar')).user.role;
                                    const currentItem = sortedConciliationList[index];
                                    
                                      return (
                                        <Popover placement="top-end">
                                          <PopoverHandler>
                                            <button
                                              className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 rounded-full"
                                              type="button">
                                              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <i className="fas fa-regular fa-ellipsis-vertical" aria-hidden="true"></i>
                                              </span>
                                            </button>
                                          </PopoverHandler>
                                          <PopoverContent>
                                            <div className="flex items-center gap-4">
                                              {renderActionButtons(userRole, status, currentItem)}
                                            </div>
                                          </PopoverContent>
                                        </Popover>
                                      );
                                  })()}
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                    </table>
                  </div>
                </div>
                {/*<Pagination />*/}
              </>
            }
            </CardBody>
          </Card>
        </Card>
      )}

      {/* Details Modal */}
      <Dialog open={showDetailsModal} handler={() => setShowDetailsModal(false)} size="lg">
        <DialogHeader>Detalhes da Mediação</DialogHeader>
        <DialogBody className="max-h-[70vh] overflow-y-auto">
          {selectedConciliation && (
            <div className="space-y-6">
              {/* Header Section */}
              <Card style={{boxShadow: 'none'}}>
                <CardBody className="text-center py-6">
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    {JSON.parse(localStorage.getItem('mediar')).user.role === 'empresa' ? 'Mediação Criada' : 'Mediação Agendada'}
                  </Typography>
                  <Typography variant="h6" color="gray" className="mb-4">
                    {formatDate(selectedConciliation?.dataMediacao)} {selectedConciliation?.horario && `às ${selectedConciliation?.horario}`}
                  </Typography>
                  <Typography variant="small" color="gray">
                    Status: <span className={`font-semibold ${
                      selectedConciliation?.status === 'agendada' ? 'text-green-600' :
                      selectedConciliation?.status === 'aguardando' ? 'text-yellow-600' :
                      selectedConciliation?.status === 'concluida' ? 'text-blue-600' :
                      'text-red-600'
                    }`}>
                      {selectedConciliation?.status || 'Aguardando'}
                    </span>
                  </Typography>
                </CardBody>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Company Information - only show if criadoPor exists */}
                {selectedConciliation?.criadoPor && (
                  <Card style={{boxShadow: 'none'}}>
                    <CardHeader color="white" className="relative h-16" style={{borderRadius: 0}}>
                      <Typography variant="h6" color="blue-gray" className="p-4">
                        Informações da Empresa
                      </Typography>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-3">
                        {selectedConciliation?.criadoPor?.fullname && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Nome:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.criadoPor.fullname}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.criadoPor?.email && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Email:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.criadoPor.email}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.criadoPor?.telefone && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Telefone:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.criadoPor.telefone}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.criadoPor?.cpfCnpj && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              CPF/CNPJ:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.criadoPor.cpfCnpj}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Mediator Information - only show if mediador exists and has data */}
                {selectedConciliation?.mediador && (selectedConciliation.mediador.fullname || selectedConciliation.mediador.email) && (
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
                          alt={selectedConciliation?.mediador?.fullname}
                          size="xl"
                          className="rounded-full"
                        />
                        <div>
                          {selectedConciliation?.mediador?.fullname && (
                            <Typography variant="h6" color="blue-gray">
                              {selectedConciliation.mediador.fullname}
                            </Typography>
                          )}
                          {selectedConciliation?.mediador?.email && (
                            <Typography variant="small" color="gray">
                              {selectedConciliation.mediador.email}
                            </Typography>
                          )}
                          {selectedConciliation?.mediador?.telefone && (
                            <Typography variant="small" color="gray">
                              Telefone: {selectedConciliation.mediador.telefone}
                            </Typography>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Client Information - only show if client data exists */}
                {(selectedConciliation?.nome_cliente || selectedConciliation?.mediando || selectedConciliation?.email_cliente) && (
                  <Card style={{boxShadow: 'none'}}>
                    <CardHeader color="white" className="relative h-16" style={{borderRadius: 0}}>
                      <Typography variant="h6" color="blue-gray" className="p-4">
                        Informações do Cliente
                      </Typography>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-3">
                        {(selectedConciliation?.nome_cliente || selectedConciliation?.mediando) && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Nome:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation?.nome_cliente || selectedConciliation?.mediando}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.email_cliente && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Email:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.email_cliente}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.telefone_cliente && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Telefone:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.telefone_cliente}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.cpf_cliente && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              CPF:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.cpf_cliente}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Process Information - only show if process data exists */}
                {(selectedConciliation?.numero_processo || selectedConciliation?.numeroProcesso || selectedConciliation?.objeto_disputa || selectedConciliation?.resumo_disputa) && (
                  <Card style={{boxShadow: 'none'}}>
                    <CardHeader color="white" className="relative h-16" style={{borderRadius: 0}}>
                      <Typography variant="h6" color="blue-gray" className="p-4">
                        Informações do Processo
                      </Typography>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-3">
                        {(selectedConciliation?.numero_processo || selectedConciliation?.numeroProcesso) && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Número do Processo:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation?.numero_processo || selectedConciliation?.numeroProcesso}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.objeto_disputa && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Objeto da Disputa:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.objeto_disputa}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.resumo_disputa && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Resumo da Disputa:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.resumo_disputa}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.observacao_cliente && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Observações:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.observacao_cliente}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Financial Information - only show if financial data exists */}
                {(selectedConciliation?.valor_causa || selectedConciliation?.valorCausa || selectedConciliation?.valor_proposta || selectedConciliation?.valorMediacao) && (
                  <Card style={{boxShadow: 'none'}}>
                    <CardHeader color="white" className="relative h-16" style={{borderRadius: 0}}>
                      <Typography variant="h6" color="blue-gray" className="p-4">
                        Informações Financeiras
                      </Typography>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-3">
                        {(selectedConciliation?.valor_causa || selectedConciliation?.valorCausa) && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Valor da Causa:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {formatCurrency(selectedConciliation?.valor_causa || selectedConciliation?.valorCausa)}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.valor_proposta && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Valor da Proposta:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {formatCurrency(selectedConciliation.valor_proposta)}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.valorMediacao && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Valor da Mediação:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {formatCurrency(selectedConciliation.valorMediacao)}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.validade_proposta && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Validade da Proposta:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {formatDate(selectedConciliation.validade_proposta)}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Virtual Meeting Information - only if reuniao data exists and status is agendada */}
                {selectedConciliation?.reuniao && selectedConciliation?.status === 'agendada' && (
                  <Card style={{boxShadow: 'none'}}>
                    <CardHeader color="white" className="relative h-16" style={{borderRadius: 0}}>
                      <Typography variant="h6" color="blue-gray" className="p-4">
                        Reunião Virtual
                      </Typography>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-3">
                        {selectedConciliation?.reuniao?.roomName && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Sala:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.reuniao.roomName}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.reuniao?.roomUrl && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Link da Reunião:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              <a href={selectedConciliation.reuniao.roomUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {selectedConciliation.reuniao.roomUrl}
                              </a>
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.reuniao?.meetingId && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              ID da Reunião:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {selectedConciliation.reuniao.meetingId}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.reuniao?.startDate && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Data/Hora de Início:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {formatDateTime(selectedConciliation.reuniao.startDate)}
                            </Typography>
                          </div>
                        )}
                        {selectedConciliation?.reuniao?.endDate && (
                          <div>
                            <Typography variant="small" color="gray" className="font-semibold">
                              Data/Hora de Término:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              {formatDateTime(selectedConciliation.reuniao.endDate)}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                )}
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setShowDetailsModal(false)} className="mr-1">
            <span>Fechar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default ProximasMediacoes;
