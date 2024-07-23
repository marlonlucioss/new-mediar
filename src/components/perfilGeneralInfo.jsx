import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Button, Typography} from "@material-tailwind/react";
import FotoPerfil from "@/images-svg/perfil.jsx";
import React from "react";

export default function PerfilGeneralInfo() {
  return (
    <section className='mb-10'>
      <div className="container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <Typography variant='h4' className="font-bold leading-tight text-gray-800 dark:text-gray-100">Informação gerais</Typography>
        </div>
      </div>
      <div className="container px-6 mx-auto flex flex-col md:flex-row items-end md:items-center justify-end">
        <div>
          <Button className='border-0' variant='outlined'>Editar</Button>
        </div>
      </div>
      <div className="w-full flex" style={{borderRadius: '11px', padding: '30px', backgroundColor: '#E2E5F3'}}>
        <form action="#" className='flex flex-auto'>
          <div className="container px-6 mx-auto flex flex-col items-start md:items-center justify-between">
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>CPF</Typography>
              </div>
              <div className="flex">
                <span>012.345.567-89</span>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Nome completo</Typography>
              </div>
              <div className="flex">
                <span>Guilherme Souza Cruz</span>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Nome social</Typography>
              </div>
              <div className="flex">
                <span>Guilherme</span>
              </div>
            </div>
          </div>
          <div className="container px-6 mx-auto flex flex-col items-end md:items-center justify-end">
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>RG</Typography>
              </div>
              <div className="flex">
                <span>01234/SP</span>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Nascimento</Typography>
              </div>
              <div className="flex">
                <span>Santo André</span>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Gênero</Typography>
              </div>
              <div className="flex">
                <span>Masculino</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
