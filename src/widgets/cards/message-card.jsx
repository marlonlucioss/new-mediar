import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";
import {formatDate} from "@fullcalendar/core";

export function MessageCard({ nome_cliente, horario, dataMediacao, status }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b-blue-gray-50 border-2 p-2">
      <div className="flex items-center gap-4">
        {/*<Avatar*/}
        {/*  src={'/img/team-1.jpeg'}*/}
        {/*  alt={mediador.nome}*/}
        {/*  variant="rounded"*/}
        {/*  className="shadow-lg shadow-blue-gray-500/25"*/}
        {/*/>*/}
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-semibold"
          >
            {nome_cliente}
          </Typography>
          {/*<Typography className="text-xs font-normal text-blue-gray-400">*/}
          {/*  {message}*/}
          {/*</Typography>*/}
        </div>
      </div>
      { horario && (
        <Typography className="text-xs font-bold text-blue-gray-800 p-3" style={{backgroundColor: '#e9f7fd', borderRadius: '12px'}}>
          {horario} - {new Date(dataMediacao).toISOString().slice(0, 10).split('-').reverse().join('/')}
        </Typography>
      )}
      { !horario && (
        <Typography className="text-xs font-bold text-blue-gray-800 p-3" style={{backgroundColor: '#e9f7fd', borderRadius: '12px'}}>
          {status}
        </Typography>
      )}
      {/*{action}*/}
    </div>
  );
}

MessageCard.defaultProps = {
  action: null,
};

MessageCard.propTypes = {
  nome_cliente: PropTypes.string.isRequired,
  horario: PropTypes.string,
  dataMediacao: PropTypes.string,
  status: PropTypes.string,
  action: PropTypes.node,
};

MessageCard.displayName = "/src/widgets/cards/message-card.jsx";

export default MessageCard;
