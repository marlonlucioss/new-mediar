import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMediacaoData } from "@/hooks/useMediacaoData";
import axios from "axios";
import { API_URL } from "@/config.js";

export function Step4Cliente() {
  const { data: requestData, updateData, navigateToStep } = useMediacaoData();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ success: [], error: [] });
  const { register, handleSubmit, data } = useForm();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isValid = file.type.startsWith('image/') || file.type === 'application/pdf';
      return isValid;
    });

    if (validFiles.length !== files.length) {
      alert('Somente arquivos PDF e imagens são permitidos.');
    }

    setSelectedFiles(validFiles);
  };

  const handleBack = () => {
    navigateToStep('step3')
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Por favor, selecione pelo menos um arquivo.');
      return;
    }

    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('mediar')).token;
    const formData = new FormData();

    // Add each file to the FormData
    selectedFiles.forEach((file, index) => {
      formData.append(`files`, file);
    });

    // Add conciliation ID if available
    if (requestData?.id) {
      formData.append('conciliationId', requestData.id);
    }

    try {
      const response = await axios.post(API_URL + '/documentUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': 'bearer ' + token
        }
      });

      setUploadStatus({
        success: response.data.filePaths || [],
        error: response.data.error || []
      });

      if (response.data.filePaths?.length > 0) {
        // Store the uploaded document URLs and proceed to next step
        const documentUrls = response.data.filePaths || [];
        updateData(prevData => ({
          ...prevData,
          documents: [...(requestData.documents || []), ...documentUrls]
        }));
        // Clear selected files after successful upload
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error('Error uploading documents:', error);
      alert('Erro ao fazer upload dos documentos. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

  }, [requestData]);

  return (
    <Card className='w-full' style={{flexFlow: 'wrap', boxShadow: 'none'}}>
      <Card className='w-4/6' style={{boxShadow: 'none'}}>
        <CardBody className="p-0 pt-20 pr-4 w-full">

          <div className="mb-10">
            <Typography variant="h4" color="blue-gray" className="mb-3">
              Upload de Documentos
            </Typography>
            <Typography variant="paragraph" className="mb-8">
              Por favor, faça o upload dos documentos necessários para a mediação.
              Somente arquivos PDF e imagens são aceitos.
            </Typography>

            {requestData?.documents?.length > 0 && (
              <div className="mb-6">
                <Typography variant="h6" className="mb-2">
                  Documentos já anexados:
                </Typography>
                <ul className="list-disc pl-5 mb-6">
                  {requestData.documents.map((doc, index) => {

                    const displayName = typeof doc === 'string' ? doc.split('/').pop() : (doc.name || 'Documento ' + (index + 1));
                    const docUrl = typeof doc === 'string' ? doc : doc.url;
                    return (
                      <li key={index} className="text-gray-700">
                        <a 
                          href={docUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 underline"
                        >
                          {displayName}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="mb-6">
              <Input
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileChange}
                className="bg-white"
                containerProps={{ className: "min-w-[100px]" }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>

            {selectedFiles.length > 0 && (
              <div className="mb-6">
                <Typography variant="h6" className="mb-2">
                  Arquivos selecionados:
                </Typography>
                <ul className="list-disc pl-5">
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="text-gray-700">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {uploadStatus?.filePaths?.length > 0 && (
              <div className="mb-4 text-green-500">
                <Typography variant="h6">Uploads bem-sucedidos:</Typography>
                <ul className="list-disc pl-5">
                  {uploadStatus.filePaths.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
              </div>
            )}

            {uploadStatus?.error?.length > 0 && (
              <div className="mb-4 text-red-500">
                <Typography variant="h6">Falhas no upload:</Typography>
                <ul className="list-disc pl-5">
                  {uploadStatus.error.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-between gap-4">
              <Button
                variant="text"
                color="blue-gray"
                onClick={() => navigateToStep('step3Cliente')}
              >
                Voltar
              </Button>
              <Button
                variant="filled"
                style={{ backgroundColor: '#11afe4' }}
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar Documentos'}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      {/* <Card className='w-2/6'>
        <CardBody className="p-4">
          <div className="m-4">
            <Typography variant="h3" color="blue-gray" className="mb-7">
              Assistente Virtual
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600 mb-7"
            >
              Agora que você já escolheu o seu mediador, basta prosseguir para o agendamento da mediação.
            </Typography>
            <Button
              variant={"text"}
              color={'white'}
              className="flex items-center gap-4 px-4 capitalize"
              fullWidth
              style={{backgroundColor: '#11afe4', placeContent: 'center'}}
              onClick={handleSubmit(async () => {
                navigateToStep('step5');
              })}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full animate-spin" />
                </div>
              ) : (
                <Typography
                  color="inherit"
                  className="font-medium capitalize"
                >
                  Próxima etapa
                </Typography>
              )}
            </Button>
          </div>
        </CardBody>
      </Card> */}
      <div className="w-full mt-6 flex justify-between gap-4">
        <Button
          variant="outlined"
          className="flex items-center gap-4 px-4 capitalize w-1/4"
          style={{placeContent: 'center', borderColor: '#11afe4', color: '#11afe4'}}
          onClick={handleBack}
        >
          <Typography color="inherit" className="font-medium capitalize">
            Voltar
          </Typography>
        </Button>
        <Button
          variant="text"
          color="white"
          className="flex items-center gap-4 px-4 capitalize w-1/4"
          style={{backgroundColor: '#11afe4', placeContent: 'center'}}
          onClick={() => navigateToStep('step5')}
        >
          <Typography color="inherit" className="font-medium capitalize">
            Próxima etapa
          </Typography>
        </Button>
      </div>
    </Card>
  );
}

export default Step4Cliente;
