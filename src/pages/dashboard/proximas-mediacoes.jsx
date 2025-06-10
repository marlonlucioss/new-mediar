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
import React, {useEffect, useState} from "react";
import {ComputerDesktopIcon, PlusIcon} from "@heroicons/react/24/outline/index.js";
import Pagination from "@/components/pagination.jsx";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import axios from "axios";
import {API_URL} from "@/config.js";
import {Step1Cliente} from "@/pages/dashboard/form-finalizar-mediacao/step1.jsx";
import {Step2Cliente} from "@/pages/dashboard/form-finalizar-mediacao/step2.jsx";
import Step3Cliente from "@/pages/dashboard/form-finalizar-mediacao/step3.jsx";
import Step4Cliente from "@/pages/dashboard/form-finalizar-mediacao/step4.jsx";
import SuccessSchedulingCliente from "@/pages/dashboard/successSchedulingCliente.jsx";
import {Sidenav} from "@/widgets/layout/index.js";
import routes from "@/routes.jsx";

export function ProximasMediacoes() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [conciliationList, setConciliationList] = useState([])

  const [data, setData] = useState({});

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
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(function () {
  //       // always executed
  //     });
  // }

  useEffect(() => {
    const fetchConciliations = () => {
      const token = JSON.parse(localStorage.getItem('mediar')).token;
      axios.get(API_URL + `/conciliations${JSON.parse(localStorage.getItem('mediar')).user.role === 'empresa' ? '?empresa='+JSON.parse(localStorage.getItem('mediar')).user.cpfCnpj : ''}${JSON.parse(localStorage.getItem('mediar')).user.role === 'cliente' ? '?cliente='+JSON.parse(localStorage.getItem('mediar')).user.email : ''}${JSON.parse(localStorage.getItem('mediar')).user.role === 'mediador' ? '?mediador='+JSON.parse(localStorage.getItem('mediar')).user.email : ''}`, {
        headers: {
          authorization: 'bearer ' + token
        }
      })
      .then(function (response) {
        // handle success
        console.log('Fetched conciliations:', response.data);
        setConciliationList(response.data);
      })
      .catch(function (error) {
        // handle error
        console.error('Error fetching conciliations:', error);
      })
      .finally(function () {
        // always executed
      });
    };

    fetchConciliations(); // Fetch immediately on mount
    const intervalId = setInterval(fetchConciliations, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedConciliationList = React.useMemo(() => {
    let sortableItems = [...conciliationList];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle nested properties like 'mediador.name'
        if (sortConfig.key === 'mediador.name') {
          aValue = a.mediador ? a.mediador.name : '';
          bValue = b.mediador ? b.mediador.name : '';
        }
        
        // Ensure values are strings for localeCompare, handle null/undefined
        aValue = aValue === null || aValue === undefined ? '' : String(aValue);
        bValue = bValue === null || bValue === undefined ? '' : String(bValue);

        if (aValue.localeCompare(bValue) < 0) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue.localeCompare(bValue) > 0) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [conciliationList, sortConfig]);

  return (
    <>
      { page === null && (
        <Card className='w-full shadow-none'>
          <Card className='w-full shadow-none'>
            <CardHeader className='m-0 shadow-none'>
              <div>
                {/* Code block starts */}
                <div className="w-full mt-12 mb-3 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4">
                  <div>
                    <h4 className="text-3xl font-normal leading-tight text-gray-800 dark:text-gray-100">Minhas Mediações</h4>
                  </div>
                  <div className='w-5/12'></div>
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
                  {JSON.parse(localStorage.getItem('mediar')).user.role === 'empresa' && (
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
                  )}
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
            <CardBody className="px-0 pt-0 pb-0">
              {conciliationList.length === 0 &&
                <Typography
                  color="inherit"
                  className="font-medium"
                >
                  Sem mediações na data selecionada.
                </Typography>
              }
              {conciliationList.length > 0 &&
                <>
                  <table className="w-full min-w-[640px] table-auto">
                    <thead style={{backgroundColor: '#DCDFE3'}}>
                      <tr>
                        {["data da mediação", "cliente", "tipo de mediação", "mediador", "plataforma", "status", ""].map((el, index) => {
                          const isCliente = el === 'cliente';
                          const isMediador = el === 'mediador';
                          let sortKey = null;
                          if (isCliente) sortKey = 'mediando';
                          if (isMediador) sortKey = 'mediador.name';

                          return (
                            <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                              {el === 'horário' ? (
                                <div className="flex items-center gap-4">
                                  <div>
                                    <input id={`checkbox-header-${index}`} type="checkbox" className="hidden peer"/>
                                    <label htmlFor={`checkbox-header-${index}`}
                                          className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                                        <path
                                          d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                                          data-name="7-Check" data-original="#000000"/>
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
                              ) : (isCliente || isMediador) ? (
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
                    <tbody>
                      {sortedConciliationList.map(
                        ({ _id, createdAt, criadoPor, dataMediacao, horario, mediador, mediando, plataforma, status, tipoMediacao, updatedAt }, key) => {
                          const className = `py-3 px-5 ${key === sortedConciliationList.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                          return (
                            <tr key={_id || key}>
                              <td className={className}>
                                <Typography variant="small" color="blue-gray" className="font-semibold">
                                  {dataMediacao ? new Date(dataMediacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : "A definir"}
                                </Typography>
                              </td>
                              <td className={className}>
                                <div className="flex items-center gap-4">
                                  <div>
                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                      {mediando}
                                    </Typography>
                                  </div>
                                </div>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {tipoMediacao}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {mediador.name}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  <ComputerDesktopIcon style={{width: '20px'}}/>
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-light text-green-600">
                                  <i className="fa-regular fa-clock"></i> {status}
                                </Typography>
                              </td>
                              <td className={className}>
                                {JSON.parse(localStorage.getItem('mediar')).user.role === 'cliente' && (
                                  <Popover placement="top-end">
                                    <PopoverHandler>
                                      <button
                                        className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 rounded-full"
                                        type="button">
                                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><i
                                          className="fas fa-regular fa-ellipsis-vertical"
                                          aria-hidden="true"></i></span>
                                      </button>
                                    </PopoverHandler>
                                    <PopoverContent>
                                      <div className="flex items-center gap-4">
                                        <button
                                          onClick={() => {
                                            const currentItem = sortedConciliationList[key]; // Use sorted list
                                            console.log(currentItem)
                                            setData(currentItem)
                                            setPage('step1Cliente')
                                          }}
                                          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs shadow-md shadow-gray-900/10 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded bg-[#fff] text-blue-600"
                                          type="button">
                                          <span
                                            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><i
                                            className="text-lg fa-solid fa-calendar"
                                            aria-hidden="true"></i></span></button>
                                        {/* Other buttons from original code can be added here if needed */}
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                  {/*<Pagination />*/}
                </>
              }
            </CardBody>
          </Card>
        </Card>
      )}
      <Card className='w-full shadow-none'>
        <Card className='w-full shadow-none'>
          { page === 'step1Cliente' && (
            <Step1Cliente setPage={setPage} setData={setData} requestData={data} />
          )}
          { page === 'step2Cliente' && (
            <Step2Cliente setPage={setPage} setData={setData} requestData={data} />
          )}
          { page === 'step3Cliente' && (
            <Step3Cliente setPage={setPage} setData={setData} requestData={data} />
          )}
          { page === 'step4Cliente' && (
            <Step4Cliente setPage={setPage} setData={setData} requestData={data} />
          )}
          { page === 'step5Cliente' && (
            <SuccessSchedulingCliente setPage={setPage} setData={setData} requestData={data} />
          )}
        </Card>
      </Card>
    </>
  )
}

export default ProximasMediacoes;
