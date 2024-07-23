import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Button, Typography} from "@material-tailwind/react";
import FotoPerfil from "@/images-svg/perfil.jsx";
import React, {useState} from "react";

export default function PerfilAbout({data, setData}) {
  const [isOnEdit, setIsOnEdit] = useState(false)
  const [about, setAbout] = useState(data.about)

  const handleChange = (event) => {
    setAbout(event.target.value);
  };

  return (
    <section className='mb-10'>
      <div className="container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <Typography variant='h4' className="font-bold leading-tight text-gray-800 dark:text-gray-100">Sobre</Typography>
        </div>
      </div>
      {!isOnEdit && (
        <div className="container px-6 mx-auto flex flex-col md:flex-row items-end md:items-center justify-end">
          <div>
            <Button className='border-0' variant='outlined' onClick={() => setIsOnEdit(true)}>Editar</Button>
          </div>
        </div>
      )}
      {!isOnEdit && (
        <div className="w-full flex" style={{borderRadius: '11px', padding: '30px', backgroundColor: '#E2E5F3'}}>
          {data.about}
        </div>
      )}
      {isOnEdit && (
        <div className="w-full flex" style={{borderRadius: '11px', padding: '30px', backgroundColor: '#E2E5F3'}}>
          <textarea name="" id="" cols="30" rows="10" onChange={handleChange} style={{
            width: '100%',
            borderRadius: '10px',
            border: 'none',
            resize: 'none'
          }}>
            {data.about}
          </textarea>
        </div>
      )}
      {isOnEdit && (
        <div className="container px-6 mx-auto flex flex-col md:flex-row items-end md:items-center justify-end">
          <div>
            <Button className='border-0' variant='outlined' onClick={() => {
              setIsOnEdit(false)
              setData({...data, about})
            }}>Salvar</Button>
          </div>
        </div>
      )}
    </section>
  )
}
