import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Button, Typography} from "@material-tailwind/react";
import FotoPerfil from "@/images-svg/perfil.jsx";
import React, {useState} from "react";

export default function PerfilEndereco({data, setData}) {
  const [isOnEdit, setIsOnEdit] = useState(false)
  const [postalcode, setPostalcode] = useState(data?.postalcode || '')
  const [city, setCity] = useState(data?.city || '')
  const [state, setState] = useState(data?.state || '')
  const [address, setAddress] = useState(data?.address || '')
  const [homenumber, setHomenumber] = useState(data?.homenumber || '')
  const [neighborhood, setNeighborhood] = useState(data?.neighborhood || '')
  const [addressreference, setAddressreference] = useState(data?.addressreference || '')
  return (
    <section className='mb-10'>
      <div className="container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <Typography variant='h4' className="font-bold leading-tight text-gray-800 dark:text-gray-100">Endereço</Typography>
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
                <Typography className='inline' variant='h6'>CEP</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{postalcode}</span>
                )}
                {isOnEdit && (
                  <input value={postalcode} type='text' onChange={(e) => setPostalcode(e.target.value)} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Logradouro</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{address}</span>
                )}
                {isOnEdit && (
                  <input value={address} type='text' onChange={(e) => setAddress(e.target.value)} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Bairro</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{neighborhood}</span>
                )}
                {isOnEdit && (
                  <input value={neighborhood} type='text' onChange={(e) => setNeighborhood(e.target.value)} />
                )}
              </div>
            </div>
          </div>
          <div className="container px-6 mx-auto flex flex-col items-end md:items-center justify-end">
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Cidade</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{city}</span>
                )}
                {isOnEdit && (
                  <input value={city} type='text' onChange={(e) => setCity(e.target.value)} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Estado</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{state}</span>
                )}
                {isOnEdit && (
                  <input value={state} type='text' onChange={(e) => setState(e.target.value)} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Número</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{homenumber}</span>
                )}
                {isOnEdit && (
                  <input value={homenumber} type='text' onChange={(e) => setHomenumber(e.target.value)} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Typography className='inline' variant='h6'>Referência</Typography>
              </div>
              <div className="flex">
                {!isOnEdit && (
                  <span>{addressreference}</span>
                )}
                {isOnEdit && (
                  <input value={addressreference} type='text' onChange={(e) => setAddressreference(e.target.value)} />
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
              setData({...data, neighborhood, state, city, address, addressreference, postalcode, homenumber})
            }}>Salvar</Button>
          </div>
        </div>
      )}
    </section>
  )
}
