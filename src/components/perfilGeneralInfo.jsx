import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import {Button, Typography, Input, Select, Option} from "@material-tailwind/react";
import FotoPerfil from "@/images-svg/perfil.jsx";
import React, {useState} from "react";
import InputMask from 'react-input-mask';

export default function PerfilGeneralInfo({data, setData}) {
  const formatCpfCnpjForDisplay = (value) => {
    const digits = String(value).replace(/\D/g, '');
    if (digits.length <= 11) {
      // CPF format: 000.000.000-00
      return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      // CNPJ format: 00.000.000/0000-00
      return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  };

    // const formatDateForDisplay = (dateString) => { // This function is no longer strictly needed as format() is used directly
  //   if (!dateString) return ''; // Handle empty or null date
  //   const parts = dateString.split('-');
  //   if (parts.length === 3) {
  //     const [year, month, day] = parts;
  //     return `${day}/${month}/${year}`;
  //   }
  //   return dateString; // Fallback if not in YYYY-MM-DD format
  // }; // This function is no longer strictly needed as format() is used directly

  const [isOnEdit, setIsOnEdit] = useState(false)
  const [cpfCnpj, setCpfCnpj] = useState(data?.cpfCnpj || '')
  const [fullname, setFullname] = useState(data?.fullname || '')
  const [name, setName] = useState(data?.name || '')
  const [rg, setRg] = useState(data?.rg || '')
  const [naturality, setNaturality] = useState(data?.naturality ? (() => {
    // Parse date string as local date to avoid timezone issues
    const dateStr = data.naturality.includes('/') 
      ? data.naturality.split('/').reverse().join('-') // Convert DD/MM/YYYY to YYYY-MM-DD
      : data.naturality; // Already in YYYY-MM-DD format
    const [year, month, day] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // Create local date
  })() : undefined);
  const [gender, setGender] = useState(data?.gender || '');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  return (
    <section className='mb-10'>
      <div className="container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <Typography variant='h4' className="font-bold leading-tight text-gray-800 dark:text-gray-100">Informação gerais</Typography>
        </div>
      </div>
      {!isOnEdit && (
        <div className="container px-6 mx-auto flex flex-col md:flex-row items-end md:items-center justify-end">
          <div>
            <Button className='border-0' variant='outlined' onClick={() => setIsOnEdit(true)}>Editar</Button>
          </div>
        </div>
      )}
      <div className="w-full flex" style={{borderRadius: '11px', padding: '30px', backgroundColor: '#F9F9F9'}}>
        <form action="#" className='flex flex-auto'>
          <div className="container px-6 mx-auto flex flex-col items-start md:items-center justify-between">
            <div className="flex w-full justify-between mb-[15px]">
              <div className="flex">
                <Typography className='inline' variant='h6'>CPF/CNPJ</Typography>
              </div>
              <div className="flex">
                <span>{formatCpfCnpjForDisplay(cpfCnpj)}</span>
                {/* {isOnEdit && (
                  <InputMask
                    mask={cpfCnpj.replace(/\D/g, '').length > 11 ? '99.999.999/9999-99' : '999.999.999-9999'}
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    maskChar={null}
                  >
                    {(inputProps) => <Input {...inputProps} label="CPF/CNPJ" type="text" className="bg-white" />}
                  </InputMask>
                )} */}
              </div>
            </div>
            <div className="flex w-full justify-between mb-[15px]">
              <div className="flex">
                <Typography className='inline' variant='h6'>Nome completo</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{fullname}</span>
                )}
                {isOnEdit && (
                  <Input label="Nome completo" value={fullname} onChange={(e) => setFullname(e.target.value)} className="bg-white" />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between mb-[15px]">
              <div className="flex">
                <Typography className='inline' variant='h6'>Nome social</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{name}</span>
                )}
                {isOnEdit && (
                  <Input label="Nome social" value={name} onChange={(e) => setName(e.target.value)} className="bg-white" />
                )}
              </div>
            </div>
          </div>
          <div className="container px-6 mx-auto flex flex-col items-end md:items-center justify-end">
            <div className="flex w-full justify-between mb-[15px]">
              <div className="flex">
                <Typography className='inline' variant='h6'>RG</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{rg}</span>
                )}
                {isOnEdit && (
                  <Input label="RG" value={rg} onChange={(e) => setRg(e.target.value.replace(/\D/g, ''))} className="bg-white" />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between mb-[15px]">
              <div className="flex">
                <Typography className='inline' variant='h6'>Nascimento</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{naturality ? format(naturality, "dd/MM/yyyy", { locale: ptBR }) : ''}</span>
                )}
                {isOnEdit && (
                  <Popover open={isDatePickerOpen} handler={setIsDatePickerOpen} placement="bottom">
                    <PopoverHandler>
                      <Input
                        label="Nascimento"
                        onChange={() => null} // onChange is handled by DayPicker's onSelect
                        value={naturality ? format(naturality, "dd/MM/yyyy", { locale: ptBR }) : ""}
                        required
                        className='py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white' // Removed appearance-none, border, rounded, w-full as Popover/Input handles it
                        style={{width: '199px'}}
                      />
                    </PopoverHandler>
                    <PopoverContent>
                      <DayPicker
                        mode="single"
                        selected={naturality}
                        defaultMonth={naturality || new Date()}
                        onSelect={(date) => { setNaturality(date); setIsDatePickerOpen(false); }}
                        locale={ptBR}
                        captionLayout="dropdown"
                        hideNavigation
                        fromYear={new Date().getFullYear() - 100}
                        toYear={new Date().getFullYear()}
                        className="border-0"
                        classNames={{
                          caption: "flex justify-center py-2 mb-4 relative items-center",
                          caption_label: "text-sm font-medium text-gray-900 hidden", // Hide default caption text
                          dropdown: "border-0 focus:ring-0",
                          nav: "flex items-center",
                          nav_button: "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                          nav_button_previous: "absolute left-1.5",
                          nav_button_next: "absolute right-1.5",
                          table: "w-full border-collapse",
                          head_row: "flex font-medium text-gray-900",
                          head_cell: "m-0.5 w-9 font-normal text-sm",
                          row: "flex w-full mt-2",
                          cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          day: "h-9 w-9 p-0 font-normal",
                          day_selected: "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                          day_today: "rounded-md bg-gray-200 text-gray-900",
                          day_outside: "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                          day_disabled: "text-gray-500 opacity-50",
                          day_hidden: "invisible",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
            <div className="flex w-full justify-between mb-[15px]">
              <div className="flex">
                <Typography className='inline' variant='h6'>Gênero</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{gender}</span>
                )}
                {isOnEdit && (
                  <Select label="Gênero" value={gender} onChange={(val) => setGender(val)} className="bg-white">
                    <Option value="" disabled>Selecione...</Option>
                    <Option value="Masculino">Masculino</Option>
                    <Option value="Feminino">Feminino</Option>
                    <Option value="Outro">Outro</Option>
                    <Option value="Prefiro não informar">Prefiro não informar</Option>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      {isOnEdit && (
        <div className="container px-6 mx-auto flex flex-col md:flex-row items-end md:items-center justify-end">
          <div>
            <Button className='border-0' variant='outlined' onClick={() => {
              setIsOnEdit(false)
              setData({...data, cpfCnpj: cpfCnpj.replace(/\D/g, ''), fullname, name, rg, naturality: naturality ? format(naturality, 'yyyy-MM-dd') : '', gender})
            }}>Salvar</Button>
          </div>
        </div>
      )}
    </section>
  )
}
