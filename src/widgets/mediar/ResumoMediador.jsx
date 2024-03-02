import {Typography} from "@material-tailwind/react";

export function ResumoMediador() {
  return (
    <section className="flex">
      <div className="w-full flex">
        <div className="justify-center text-center w-28 p-1 pt-0 pb-0 box-content mr-4" style={{
          borderRadius: '8px',
          border: '1px solid #DCDFE3'
        }}>
          <img className="inline mb-2" src="/img/ResumoMediadorMediacoes.svg" alt=""/>
          <Typography>467</Typography>
          <Typography className="mb-3">Mediações</Typography>
        </div>
        <div className="justify-center text-center w-28 p-1 pt-0 pb-0 box-content mr-4" style={{
          borderRadius: '8px',
          border: '1px solid #DCDFE3'
        }}>
          <img className="inline mb-2" src="/img/ResumoMediadorExperiencia.svg" alt=""/>
          <Typography>467</Typography>
          <Typography className="mb-3">Mediações</Typography>
        </div>
        <div className="justify-center text-center w-28 p-1 pt-0 pb-0 box-content" style={{
          borderRadius: '8px',
          border: '1px solid #DCDFE3'
        }}>
          <img className="inline mb-2" src="/img/ResumoMediadorAvaliacoes.svg" alt=""/>
          <Typography>467</Typography>
          <Typography className="mb-3">Mediações</Typography>
        </div>
      </div>
    </section>
  );
}

export default ResumoMediador;
