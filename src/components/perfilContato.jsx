import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Button, Input, Typography} from "@material-tailwind/react";
import FotoPerfil from "@/images-svg/perfil.jsx";
import React, {useState} from "react";
import TelefoneBrasileiroInput from "react-telefone-brasileiro";

export default function PerfilContato({data, setData}) {
  const [isOnEdit, setIsOnEdit] = useState(false)
  const [phone, setPhone] = useState(data?.phone || '')
  const [email, setEmail] = useState(data?.email || '')
  const [linkedin, setLinkedin] = useState(data?.linkedin || '')
  return (
    <section className='mb-10'>
      <div className="container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <Typography variant='h4' className="font-bold leading-tight text-gray-800 dark:text-gray-100">Contato</Typography>
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
                <Typography className='inline' variant='h6'>Telefone</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{phone}</span>
                )}
                {isOnEdit && (
                  <TelefoneBrasileiroInput
                    value={phone}
                    temDDD
                    separaDDD
                    onChange={(event) => setPhone(event.target.value)}
                  />
                  // <input value={phone} type='text' onChange={(e) => setPhone(e.target.value)} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>E-mail</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{email}</span>
                )}
                {isOnEdit && (
                  <input value={email} type='text' onChange={(e) => setEmail(e.target.value)} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Linkedin</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{linkedin}</span>
                )}
                {isOnEdit && (
                  <input value={linkedin} type='text' onChange={(e) => setLinkedin(e.target.value)} />
                )}
              </div>
            </div>
          </div>
          <div className="container px-6 mx-auto flex flex-col items-end md:items-center justify-end">
            {/*<div className="flex w-full justify-between">*/}
            {/*  <div className="flex">*/}
            {/*    <Typography className='inline' variant='h6'>RG</Typography>*/}
            {/*  </div>*/}
            {/*  <div className="flex">*/}
            {/*    <span>034.972.525-06</span>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="flex w-full justify-between">*/}
            {/*  <div className="flex">*/}
            {/*    <Typography className='inline' variant='h6'>Nascimento</Typography>*/}
            {/*  </div>*/}
            {/*  <div className="flex">*/}
            {/*    <span>034.972.525-06</span>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="flex w-full justify-between">*/}
            {/*  <div className="flex">*/}
            {/*    <Typography className='inline' variant='h6'>Gênero</Typography>*/}
            {/*  </div>*/}
            {/*  <div className="flex">*/}
            {/*    <span>034.972.525-06</span>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </form>
      </div>
      {isOnEdit && (
        <div className="container px-6 mx-auto flex flex-col md:flex-row items-end md:items-center justify-end">
          <div>
            <Button className='border-0' variant='outlined' onClick={() => {
              setIsOnEdit(false)
              setData({...data, email, phone, linkedin})
            }}>Salvar</Button>
          </div>
        </div>
      )}
    </section>
  )
}
