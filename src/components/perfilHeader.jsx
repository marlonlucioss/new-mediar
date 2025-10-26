import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";
import ProfileImageUpload from './ProfileImageUpload';
import axios from "axios";
import { API_URL } from "@/config.js";



export default function PerfilHeader({ profileImage, userNameFromParent, onImageUploadFromParent }) {
  const defaultProfileImage = "/img/image.png";
  const defaultUserName = 'Nome do Usuário';
  const [mediationStatistics, setMediationStatistics] = useState({
    total: 0,
    finished: 0
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('mediar'))?.token;
    if (!token) return;

    const userRole = JSON.parse(localStorage.getItem('mediar')).user.role;
    const userIdentifier = userRole === 'empresa' 
      ? JSON.parse(localStorage.getItem('mediar')).user.cpfCnpj
      : JSON.parse(localStorage.getItem('mediar')).user.email;
    
    const queryParam = userRole === 'empresa' 
      ? `?empresa=${userIdentifier}`
      : userRole === 'cliente' 
        ? `?cliente=${userIdentifier}`
        : `?mediador=${userIdentifier}`;

    axios.get(API_URL + `/conciliations/statistics${queryParam}`, {
      headers: {
        authorization: 'bearer ' + token
      }
    })
    .then(function (response) {
      const stats = response.data;
      // Calculate total mediations (all statuses)
      const total = (stats.waiting || 0) + (stats.scheduled || 0) + (stats.finished || 0) + (stats.canceled || 0);
      setMediationStatistics({
        total: total,
        finished: stats.finished || 0
      });
    })
    .catch(function (error) {
      console.error('Erro ao carregar estatísticas de mediações:', error);
    });
  }, []);

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
          <Typography variant={'h1'}>{mediationStatistics.total}</Typography>
        </div>
        
        <div className="justify-center text-center p-1 pt-0 pb-0 box-content mr-4" style={{
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <Typography variant={'h5'} className="mb-3">Finalizadas</Typography>
          <Typography variant={'h1'}>{mediationStatistics.finished}</Typography>
        </div>
        
        {/* <div className="justify-center text-center p-1 pt-0 pb-0 box-content" style={{
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <Typography variant={'h5'} className="mb-3">Termômetro</Typography>
          <img className="inline mb-2" src="/img/termometroBom.svg" alt="Termômetro"/>
        </div> */}
      </div>
    </section>
  );
}
