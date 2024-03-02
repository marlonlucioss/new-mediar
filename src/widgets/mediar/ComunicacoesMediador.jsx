import {Typography} from "@material-tailwind/react";

export function ComunicacoesMediador() {
  return (
    <section>
      <Typography variant="h6" color="blue-gray" className="w-full block mb-5">
        Comunicações
      </Typography>
      <div className="w-full">
        <div className="flex p-1 pt-0 pb-0 box-content mb-2">
          <img className="mb-2 mr-2" src="/img/MediadorComunicacaoMensagem.svg" alt=""/>
          <div>
            <Typography>Mensagem</Typography>
            <Typography>Comunicação rápida</Typography>
          </div>
        </div>
        <div className="flex p-1 pt-0 pb-0 box-content mb-2">
          <img className="mb-2 mr-2" src="/img/MediadorComunicacaoLigacao.svg" alt=""/>
          <div>
            <Typography>Ligação</Typography>
            <Typography>Ligue para seu mediador</Typography>
          </div>
        </div>
        <div className="flex p-1 pt-0 pb-0 box-content mb-2">
          <img className="mb-2 mr-2" src="/img/MediadorComunicacaoVideoConferencia.svg" alt=""/>
          <div>
            <Typography>Vídeo conferência</Typography>
            <Typography>Dominua a distância</Typography>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComunicacoesMediador;
