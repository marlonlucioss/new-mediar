import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Button, Typography, Input, Select, Option} from "@material-tailwind/react";
import InputMask from 'react-input-mask';
import FotoPerfil from "@/images-svg/perfil.jsx";
import React, {useState, useEffect} from "react";
import axios from 'axios';

export default function PerfilEndereco({data, setData}) {
  const [isOnEdit, setIsOnEdit] = useState(false)
  const [postalcode, setPostalcode] = useState(data?.postalcode || '')
  const [city, setCity] = useState(data?.city || '')
  const [estado, setEstado] = useState(data?.state ? data.state.trim().toUpperCase() : '')
  const [address, setAddress] = useState(data?.address || '')
  const [homenumber, setHomenumber] = useState(data?.homenumber || '')
  const [neighborhood, setNeighborhood] = useState(data?.neighborhood || '')
  const [addressreference, setAddressreference] = useState(data?.addressreference || '');

  useEffect(() => {
    setEstado(data?.state ? data.state.trim().toUpperCase() : '');
  }, [data?.state]);

  const brazilianStates = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

  useEffect(() => {
    const fetchAddress = async () => {
      const cleanedCep = postalcode.replace(/\D/g, ''); // Remove non-digit characters
      if (cleanedCep.length === 8) { // Check if CEP has 8 digits
        try {

          const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);
          const addressData = response.data;


          if (!addressData.erro) {
            setNeighborhood(addressData.bairro || '');
            setCity(addressData.localidade || '');
            setEstado(addressData.uf ? addressData.uf.trim().toUpperCase() : ''); // Estado will be autocompleted by CEP
            setAddress(addressData.logradouro || '');

          } else {
            console.error("CEP não encontrado ou inválido.");
            // Optionally, clear fields or show an error to the user
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
          // Handle error (e.g., show a notification to the user)
        }
      }
    };

    if (isOnEdit) { // Only fetch if in edit mode
      fetchAddress();
    }
  }, [postalcode, isOnEdit, setNeighborhood, setCity, setEstado, setAddress]); // Added setAddress to dependencies for optional street update
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
            <div className="flex w-full justify-between mb-[10px]">
              <div className="flex items-center">
                <Typography className='inline' variant='h6'>CEP</Typography>
              </div>
              <div className="flex items-center">
                {!isOnEdit && (
                  <span>{postalcode}</span>
                )}
                {isOnEdit && (
                  <InputMask mask="99999-999" value={postalcode} onChange={(e) => setPostalcode(e.target.value)} maskChar={null}>
                    {(inputProps) => <Input {...inputProps} label="CEP" type="text" className="bg-white" autoComplete="off" />}
                  </InputMask>
                )}
              </div>
            </div>
            <div className="flex w-full justify-between mb-[10px]">
              <div className="flex items-center">
                <Typography className='inline' variant='h6'>Logradouro</Typography>
              </div>
              <div className="flex items-center">
                {!isOnEdit && (
                  <span>{address}</span>
                )}
                {isOnEdit && (
                  <Input label="Logradouro" value={address} type='text' onChange={(e) => setAddress(e.target.value)} className="bg-white" autoComplete="off" />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between mb-[10px]">
              <div className="flex items-center">
                <Typography className='inline' variant='h6'>Bairro</Typography>
              </div>
              <div className="flex items-center">
                {!isOnEdit && (
                  <span>{neighborhood}</span>
                )}
                {isOnEdit && (
                  <Input label="Bairro" value={neighborhood} type='text' onChange={(e) => setNeighborhood(e.target.value)} className="bg-white" autoComplete="off" />
                )}
              </div>
            </div>
          </div>
          <div className="container px-6 mx-auto flex flex-col items-end md:items-center justify-end">
            <div className="flex w-full justify-between mb-[10px]">
              <div className="flex items-center">
                <Typography className='inline' variant='h6'>Cidade</Typography>
              </div>
              <div className="flex items-center">
                {!isOnEdit && (
                  <span>{city}</span>
                )}
                {isOnEdit && (
                  <Input label="Cidade" value={city} type='text' onChange={(e) => setCity(e.target.value)} className="bg-white" autoComplete="off" />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between mb-[10px]">
              <div className="flex items-center">
                <Typography className='inline' variant='h6'>Estado</Typography>
              </div>
              <div className="flex items-center">
                {!isOnEdit && (
                  <span>{brazilianStates.find(s => s.value === estado)?.label || estado}</span>
                )}
                {isOnEdit && (
                  <Select label="Estado" value={estado} onChange={(val) => setEstado(val ? val.trim().toUpperCase() : '')} className="bg-white">
                    <Option value="">Selecione um estado</Option>
                    <Option key="AC" value="AC">Acre</Option>
                    <Option key="AL" value="AL">Alagoas</Option>
                    <Option key="AP" value="AP">Amapá</Option>
                    <Option key="AM" value="AM">Amazonas</Option>
                    <Option key="BA" value="BA">Bahia</Option>
                    <Option key="CE" value="CE">Ceará</Option>
                    <Option key="DF" value="DF">Distrito Federal</Option>
                    <Option key="ES" value="ES">Espírito Santo</Option>
                    <Option key="GO" value="GO">Goiás</Option>
                    <Option key="MA" value="MA">Maranhão</Option>
                    <Option key="MT" value="MT">Mato Grosso</Option>
                    <Option key="MS" value="MS">Mato Grosso do Sul</Option>
                    <Option key="MG" value="MG">Minas Gerais</Option>
                    <Option key="PA" value="PA">Pará</Option>
                    <Option key="PB" value="PB">Paraíba</Option>
                    <Option key="PR" value="PR">Paraná</Option>
                    <Option key="PE" value="PE">Pernambuco</Option>
                    <Option key="PI" value="PI">Piauí</Option>
                    <Option key="RJ" value="RJ">Rio de Janeiro</Option>
                    <Option key="RN" value="RN">Rio Grande do Norte</Option>
                    <Option key="RS" value="RS">Rio Grande do Sul</Option>
                    <Option key="RO" value="RO">Rondônia</Option>
                    <Option key="RR" value="RR">Roraima</Option>
                    <Option key="SC" value="SC">Santa Catarina</Option>
                    <Option key="SP" value="SP">São Paulo</Option>
                    <Option key="SE" value="SE">Sergipe</Option>
                    <Option key="TO" value="TO">Tocantins</Option>
                  </Select>
                )}
              </div>
            </div>
            <div className="flex w-full justify-between mb-[10px]">
              <div className="flex items-center">
                <Typography className='inline' variant='h6'>Número</Typography>
              </div>
              <div className="flex items-center">
                {!isOnEdit && (
                  <span>{homenumber}</span>
                )}
                {isOnEdit && (
                  <Input label="Número" value={homenumber} type='text' onChange={(e) => setHomenumber(e.target.value)} className="bg-white" autoComplete="off" />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between mb-[10px]">
              <div className="flex items-center">
                <Typography className='inline' variant='h6'>Referência</Typography>
              </div>
              <div className="flex items-center">
                {!isOnEdit && (
                  <span>{addressreference}</span>
                )}
                {isOnEdit && (
                  <Input label="Referência" value={addressreference} type='text' onChange={(e) => setAddressreference(e.target.value)} className="bg-white" autoComplete="off" />
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
              setData({...data, neighborhood, estado, city, address, addressreference, postalcode, homenumber})
            }}>Salvar</Button>
          </div>
        </div>
      )}
    </section>
  )
}
