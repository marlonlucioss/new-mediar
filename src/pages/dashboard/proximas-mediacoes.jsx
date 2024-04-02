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
import React from "react";
import {ComputerDesktopIcon, PlusIcon} from "@heroicons/react/24/outline/index.js";
import Pagination from "@/components/pagination.jsx";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

export function ProximasMediacoes({ setPage }) {
  return (
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
              <div className="mt-6 md:mt-0 flex items-center">
                <Button
                  variant={"filled"}
                  className="flex items-center gap-4 px-4 capitalize mr-3"
                  style={{backgroundColor: '#fff', borderRadius: '100%', padding: '10px'}}
                >
                  <ChevronLeftIcon strokeWidth={2.5} className="h-5 w-5 text-gray-600" />
                </Button>
                <Typography
                  color="inherit"
                  className="font-medium mt-1 mx-4"
                >
                  Nov 15, 2023
                </Typography>
                {/*<Typography*/}
                {/*  color="inherit"*/}
                {/*  className="font-light"*/}
                {/*>*/}
                {/*  Hoje*/}
                {/*</Typography>*/}
                <Button
                  variant={"filled"}
                  className="flex items-center gap-4 px-4 capitalize ml-3"
                  style={{backgroundColor: '#fff', borderRadius: '100%', padding: '10px'}}
                >
                  <ChevronRightIcon strokeWidth={2.5} className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
              <div className="mt-6 md:mt-0">
                <Button
                  variant={"text"}
                  color={'white'}
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                  style={{backgroundColor: '#11afe4'}}
                  onClick={() => setPage('lista-mediadores')}
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
              {/* Code block ends */}
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead style={{ backgroundColor: '#DCDFE3' }}>
            <tr>
              {["horário", "cliente", "tipo de mediação", "mediador", "plataforma", "status", ""].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  {el === 'horário' ? (
                    <div className="flex items-center gap-4">
                      <div>
                        <input id="checkbox1" type="checkbox" className="hidden peer" />
                        <label htmlFor="checkbox1"
                               className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                            <path
                              d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                              data-name="7-Check" data-original="#000000" />
                          </svg>
                        </label>
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </div>
                      <div>
                        <i className="fa fa-arrows-v" aria-hidden="true"></i>
                      </div>
                    </div>
                  ) : (
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  )}
                </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {authorsTableData.map(
              ({ img, name, email, job, online, date }, key) => {
                const className = `py-3 px-5 ${
                  key === authorsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={name}>
                    <td className="pl-6 w-8 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <div>
                          <input id="checkbox1" type="checkbox" className="hidden peer" />
                          <label htmlFor="checkbox1"
                                 className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                              <path
                                d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                                data-name="7-Check" data-original="#000000" />
                            </svg>
                          </label>
                        </div>
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold w-24"
                          >
                            18:00 - 18:45
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar src={img} alt={name} size="sm" variant="rounded" />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        Mediação Familiar
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        Andrea Maia
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        <ComputerDesktopIcon style={{ width: '20px' }} />
                      </Typography>
                    </td>
                    {/*<td className={className}>*/}
                    {/*  <Chip*/}
                    {/*    variant="gradient"*/}
                    {/*    color={online ? "green" : "blue-gray"}*/}
                    {/*    value={online ? "online" : "offline"}*/}
                    {/*    className="py-0.5 px-2 text-[11px] font-medium w-fit"*/}
                    {/*  />*/}
                    {/*</td>*/}
                    <td className={className}>
                      <Typography className="text-xs font-light text-green-600">
                        <i className="fa-regular fa-clock"></i> Agendado
                      </Typography>
                    </td>
                    {/*<td className={className}>*/}
                    {/*  <Typography*/}
                    {/*    as="a"*/}
                    {/*    href="#"*/}
                    {/*    className="text-xs font-semibold text-blue-gray-600"*/}
                    {/*  >*/}
                    {/*    Edit*/}
                    {/*  </Typography>*/}
                    {/*</td>*/}

                    <td className={className}>
                      <Popover placement="top-end">
                        <PopoverHandler>
                          <button
                            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 rounded-full"
                            type="button">
    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><i className="fas fa-regular fa-ellipsis-vertical"
                                                                                               aria-hidden="true"></i></span>
                          </button>
                        </PopoverHandler>
                        <PopoverContent>
                          <div className="flex items-center gap-4">
                            <button
                              className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs shadow-md shadow-gray-900/10 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded bg-[#fff] text-red-600"
                              type="button">
    <span
      className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><i
      className="text-lg fa-solid fa-trash-can"
      aria-hidden="true"></i></span></button><button
                            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs shadow-md shadow-gray-900/10 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded bg-[#fff] text-gray-700"
                            type="button">
    <span
      className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><i
      className="text-lg fa-solid fa-pen-to-square" aria-hidden="true"></i></span></button><button
                            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs shadow-md shadow-gray-900/10 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded bg-[#fff] text-gray-700"
                            type="button">
    <span
      className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><i
      className="text-lg fa-solid fa-repeat" aria-hidden="true"></i></span></button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                );
              }
            )}
            </tbody>
          </table>
          <Pagination />
        </CardBody>
      </Card>
    </Card>
  );
}

export default ProximasMediacoes;
