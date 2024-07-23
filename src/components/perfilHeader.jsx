import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Typography} from "@material-tailwind/react";
import FotoPerfil from "@/images-svg/perfil.jsx";

const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

export default function PerfilHeader() {
  return (
    <section className="flex mb-10">
      <div className="w-full flex justify-between">
        <div className="justify-center text-center p-1 pt-0 pb-0 box-content mr-4" style={{
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <img className="inline mb-2" src="/img/fotoperfil.svg" alt=""/>
        </div>
        <div className="justify-center text-center p-1 pt-0 pb-0 box-content mr-4" style={{
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <Typography variant='h2' className="mb-3" >{JSON.parse(localStorage.getItem('mediar')).user.name}</Typography>
        </div>
        <div className="justify-center text-center p-1 pt-0 pb-0 box-content mr-4" style={{
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <Typography variant={'h5'} className="mb-3">Mediações</Typography>
          <Typography variant={'h1'}>467</Typography>
        </div>
        <div className="justify-center text-center p-1 pt-0 pb-0 box-content mr-4" style={{
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <Typography variant={'h5'} className="mb-3">Finalizadas</Typography>
          <Typography variant={'h1'}>467</Typography>
        </div>
        <div className="justify-center text-center p-1 pt-0 pb-0 box-content" style={{
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <Typography variant={'h5'} className="mb-3">Termômetro</Typography>
          <img className="inline mb-2" src="/img/termometroBom.svg" alt=""/>
        </div>
      </div>
    </section>
  )
}
