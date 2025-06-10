import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Button, Input, Typography} from "@material-tailwind/react";
import FotoPerfil from "@/images-svg/perfil.jsx";
import React, {useState} from "react";
import InputMask from 'react-input-mask';

export default function PerfilContato({data, setData}) {
  const [isOnEdit, setIsOnEdit] = useState(false)
  const [phone, setPhone] = useState(data?.phone || '')
  const [email, setEmail] = useState(data?.email || '')
  const [linkedin, setLinkedin] = useState(data?.linkedin || '');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
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
            <div className="flex w-full justify-between items-center mb-[10px]">
              <div className="flex">
                <Typography className='inline' variant='h6'>Telefone</Typography>
              </div>
              <div className="flex flex-col items-end">
                {!isOnEdit && (
                  <span>{phone}</span>
                )}
                {isOnEdit && (
                  <>
                    <InputMask
                      mask="(99)99999-9999"
                      value={phone}
                      onChange={(event) => { setPhone(event.target.value); if (phoneError) setPhoneError(''); }}
                    >
                      {(inputProps) => (
                        <Input
                          {...inputProps}
                          type="tel"
                          label="Telefone"
                          containerProps={{ className: "w-[200px]" }}
                          className="bg-white"
                          error={!!phoneError}
                        />
                      )}
                    </InputMask>
                    {phoneError && (
                      <Typography color="red" variant="small" className="mt-1 text-xs text-left self-start">
                        {phoneError}
                      </Typography>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex w-full justify-between items-center mb-[10px]">
              <div className="flex">
                <Typography className='inline' variant='h6'>E-mail</Typography>
              </div>
              <div className="flex flex-col">
                {!isOnEdit && (
                  <span>{email}</span>
                )}
                {isOnEdit && (
                  <>
                    <Input
                      type="email"
                      label="E-mail"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                      containerProps={{ className: "w-[200px]" }}
                      className="bg-white"
                      error={!!emailError}
                    />
                    {emailError && (
                      <Typography color="red" variant="small" className="mt-1 text-xs text-left self-start">
                        {emailError}
                      </Typography>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="flex">
                <Typography className='inline' variant='h6'>Linkedin</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{linkedin}</span>
                )}
                {isOnEdit && (
                  <Input type="text" label="Linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} containerProps={{ className: "w-[200px]" }} className="bg-white" />
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
              // Email validation
              const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
              if (!email || !emailRegex.test(email)) {
                setEmailError('Formato de e-mail inválido.');
                return;
              } else {
                setEmailError(''); // Clear error if email is valid
              }

              // Phone validation
              const phoneDigits = phone.replace(/\D/g, '');
              if (phoneDigits.length < 11) {
                setPhoneError('Por favor, preencha o telefone completo (11 dígitos).');
                return;
              } else {
                setPhoneError(''); // Clear error if phone is valid
              }
              
              setIsOnEdit(false);
              setData({...data, email, phone, linkedin});
            }}>Salvar</Button>
          </div>
        </div>
      )}
    </section>
  )
}
