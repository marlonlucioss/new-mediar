import React from 'react'; // useState and useEffect are no longer needed here
import { Typography } from "@material-tailwind/react";
import ProfileImageUpload from './ProfileImageUpload';



export default function PerfilHeader({ profileImage, userNameFromParent, onImageUploadFromParent }) {
  const defaultProfileImage = "/img/image.png";
  const defaultUserName = 'Nome do Usuário';

  return (
    <section className="flex mb-10">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center p-2 box-content mr-4" style={{
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <img 
            className="inline-block"
            src={profileImage || defaultProfileImage} 
            alt="Perfil do usuário"
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }}
          />
          <ProfileImageUpload onImageUpload={onImageUploadFromParent} />
        </div>
        
        <div className="justify-center text-center p-1 pt-0 pb-0 box-content mr-4" style={{
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <Typography variant='h2' className="mb-3">{userNameFromParent || defaultUserName}</Typography>
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
          <img className="inline mb-2" src="/img/termometroBom.svg" alt="Termômetro"/>
        </div>
      </div>
    </section>
  );
}
