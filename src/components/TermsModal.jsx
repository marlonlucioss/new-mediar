import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const TermsModal = ({ open, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useIframe, setUseIframe] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    console.log('Tentando carregar PDF via iframe...');
    setUseIframe(true);
    setLoading(false);
    setError(null);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const handleClose = () => {
    setPageNumber(1);
    setError(null);
    setLoading(true);
    setUseIframe(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      handler={handleClose}
      size="xl"
      className="max-h-[90vh] overflow-hidden"
    >
      <DialogHeader className="flex items-center justify-between">
        <Typography variant="h4" color="blue-gray">
          Termos e Condições
        </Typography>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      
      <DialogBody className="flex flex-col items-center overflow-auto max-h-[60vh] p-4">
        {loading && (
          <div className="flex items-center justify-center h-64">
            <Typography color="blue-gray">Carregando documento...</Typography>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-64">
            <Typography color="red" className="text-center">
              {error}
              <br />
              <span className="text-sm">
                Verifique se o arquivo 'termos-e-condicoes.pdf' existe na pasta public.
              </span>
            </Typography>
          </div>
        )}
        
        {!error && !useIframe && (
          <Document
            file="/termos-e-condicoes.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
            className="flex flex-col items-center"
          >
            <Page
              pageNumber={pageNumber}
              width={Math.min(600, window.innerWidth - 100)}
              className="shadow-lg border border-gray-200"
            />
          </Document>
        )}
        
        {useIframe && (
          <div className="w-full h-96 border border-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="/termos-e-condicoes.pdf"
              width="100%"
              height="100%"
              title="Termos e Condições"
              className="border-0"
            />
          </div>
        )}
      </DialogBody>
      
      <DialogFooter className="flex items-center justify-between">
        {!useIframe && (
          <div className="flex items-center gap-2">
            <IconButton
              variant="outlined"
              size="sm"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1 || loading || error}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </IconButton>
            
            <Typography color="blue-gray" className="text-sm">
              {numPages ? `${pageNumber} de ${numPages}` : ''}
            </Typography>
            
            <IconButton
              variant="outlined"
              size="sm"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages || loading || error}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </IconButton>
          </div>
        )}
        
        {useIframe && (
          <Typography color="blue-gray" className="text-sm">
            Documento carregado via navegador
          </Typography>
        )}
        
        <Button
          variant="gradient"
          color="blue"
          onClick={handleClose}
        >
          Fechar
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default TermsModal;
