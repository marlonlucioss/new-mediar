import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Button, Typography} from "@material-tailwind/react";
import FotoPerfil from "@/images-svg/perfil.jsx";
import React from "react";
import {PlusIcon} from "@heroicons/react/24/outline/index.js";

export default function PerfilSenha() {
  return (
    <section className='mb-10'>
      <div className="container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <Typography variant='h4' className="font-bold leading-tight text-gray-800 dark:text-gray-100">Alterar senha</Typography>
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
            <div className="flex w-full justify-between mb-3">
              <div className="flex items-center">
                <Typography className='inline' variant='h6'>Senha atual</Typography>
              </div>
              <div className="flex">
                <input type='password' />
              </div>
            </div>
            <div className="flex w-full justify-between mb-3">
              <div className="flex items-center">
                <Typography className='inline' variant='h6'>Nova senha</Typography>
              </div>
              <div className="flex">
                <input type='password' />
              </div>
            </div>
            <div className="flex w-full justify-between mb-3">
              <div className="flex items-center">
                <Typography className='inline' variant='h6'>Repetir nova senha</Typography>
              </div>
              <div className="flex">
                <input type='password' />
              </div>
            </div>
            <div className="flex w-full justify-between mt-4">
              <div className="flex">
              </div>
              <div className="flex">
                <Typography className='inline font-light' style={{color: '#0D631B', fontSize: '12px'}} variant='h6'>*A senha deve conter pelo menos 8 numeros e  letras (maiúsculas e minúsculas).</Typography>
              </div>
              <div className="flex">
                <Button
                  variant={"text"}
                  color={'white'}
                  className="px-4 capitalize w-44 h-12"
                  fullWidth
                  style={{backgroundColor: '#11afe4'}}
                >
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Mudar senha
                  </Typography>
                </Button>
              </div>
            </div>

          </div>
          <div className="container px-6 mx-auto flex flex-col items-end md:items-center justify-end">
          </div>
        </form>
      </div>
    </section>
  )
}
