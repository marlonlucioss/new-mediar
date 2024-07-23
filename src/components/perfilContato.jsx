import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Button, Typography} from "@material-tailwind/react";
import FotoPerfil from "@/images-svg/perfil.jsx";
import React from "react";

export default function PerfilContato() {
  return (
    <section className='mb-10'>
      <div className="container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <Typography variant='h4' className="font-bold leading-tight text-gray-800 dark:text-gray-100">Contato</Typography>
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
                <Typography className='inline' variant='h6'>Telefone</Typography>
              </div>
              <div className="flex">
                <span>+55 (11) 99999-9999</span>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>E-mail</Typography>
              </div>
              <div className="flex">
                <span>mediando@mediando.com.br</span>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Linkedin</Typography>
              </div>
              <div className="flex">
                <span>linkedin.com/br/g.cruz</span>
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
    </section>
  )
}
