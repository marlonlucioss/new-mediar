import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Button, Typography} from "@material-tailwind/react";
import FotoPerfil from "@/images-svg/perfil.jsx";
import React, {useState} from "react";

export default function PerfilGeneralInfo({data, setData}) {
  const [isOnEdit, setIsOnEdit] = useState(false)
  const [cpfCnpj, setCpfCnpj] = useState(data?.cpfCnpj || '')
  const [fullname, setFullname] = useState(data?.fullname || '')
  const [name, setName] = useState(data?.name || '')
  const [rg, setRg] = useState(data?.rg || '')
  const [naturality, setNaturality] = useState(data?.naturality || '')
  const [gender, setGender] = useState(data?.gender || '')
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
      <div className="w-full flex" style={{borderRadius: '11px', padding: '30px', backgroundColor: '#E2E5F3'}}>
        <form action="#" className='flex flex-auto'>
          <div className="container px-6 mx-auto flex flex-col items-start md:items-center justify-between">
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>CPF/CNPJ</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{cpfCnpj}</span>
                )}
                {isOnEdit && (
                  <input value={cpfCnpj} type='text' onChange={(e) => setCpfCnpj(e.target.value)} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Nome completo</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{fullname}</span>
                )}
                {isOnEdit && (
                  <input value={fullname} type='text' onChange={(e) => setFullname(e.target.value)} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Nome social</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{name}</span>
                )}
                {isOnEdit && (
                  <input value={name} type='text' onChange={(e) => setName(e.target.value)} />
                )}
              </div>
            </div>
          </div>
          <div className="container px-6 mx-auto flex flex-col items-end md:items-center justify-end">
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>RG</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{rg}</span>
                )}
                {isOnEdit && (
                  <input value={rg} type='text' onChange={(e) => setRg(e.target.value)} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Nascimento</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{naturality}</span>
                )}
                {isOnEdit && (
                  <input value={naturality} type='text' onChange={(e) => setNaturality(e.target.value)} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Gênero</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{gender}</span>
                )}
                {isOnEdit && (
                  <input value={gender} type='text' onChange={(e) => setGender(e.target.value)} />
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
              setData({...data, cpfCnpj, fullname, name, rg, naturality, gender})
            }}>Salvar</Button>
          </div>
        </div>
      )}
    </section>
  )
}
